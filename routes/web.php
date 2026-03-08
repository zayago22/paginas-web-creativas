<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PageController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\BlogEngineController;
use App\Http\Controllers\ToolController;
use App\Http\Controllers\ServiciosController;
use App\Http\Controllers\LeadController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ProjectController as AdminProjectController;
use App\Http\Controllers\Admin\BlogPostController as AdminBlogPostController;
use App\Http\Controllers\Admin\LeadController as AdminLeadController;
use App\Http\Controllers\Admin\BriefingController as AdminBriefingController;
use App\Http\Controllers\BriefingController;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;

// =============================================
// REDIRECCIONES 301 — URLs viejas de WordPress
// =============================================
Route::permanentRedirect('/nuestros-servicios-web/desarrollo-de-aplicaciones-web', '/servicios/aplicaciones-web');
Route::permanentRedirect('/nuestros-servicios-web/diseno-de-paginas-web', '/servicios/paginas-web');
Route::permanentRedirect('/nuestros-servicios-web/diseno-web-profesional', '/servicios/paginas-web');
Route::permanentRedirect('/nuestros-servicios-web/tienda-virtual', '/servicios/tiendas-online');
Route::permanentRedirect('/nuestros-servicios-web/tiendas-en-linea', '/servicios/tiendas-online');
Route::permanentRedirect('/nuestros-servicios-web/posicionamiento-seo', '/servicios/paginas-web');
Route::permanentRedirect('/nuestros-servicios-web/marketing-digital', '/servicios');
Route::permanentRedirect('/nuestros-servicios-web', '/servicios');
Route::permanentRedirect('/portafolio-web', '/portafolio');
Route::permanentRedirect('/contacto-paginas-web-creativas', '/contacto');
Route::permanentRedirect('/blog-paginas-web-creativas', '/blog');
Route::permanentRedirect('/nosotros', '/');
Route::permanentRedirect('/quienes-somos', '/');

// Bloquear URLs de WordPress que ya no existen (410 Gone)
Route::get('/wp-content/{any}', fn () => abort(410))->where('any', '.*');
Route::get('/wp-admin/{any?}', fn () => abort(410));
Route::get('/wp-login.php', fn () => abort(410));
Route::get('/wp-includes/{any}', fn () => abort(410))->where('any', '.*');
Route::get('/xmlrpc.php', fn () => abort(410));
Route::get('/wp-json/{any?}', fn () => abort(410))->where('any', '.*');

// Paginación vieja de WordPress
Route::get('/page/{any}', fn () => redirect('/', 301))->where('any', '.*');

/*
|--------------------------------------------------------------------------
| Rutas Públicas
|--------------------------------------------------------------------------
*/

// Landing principal
Route::get('/', [PageController::class, 'home'])->name('home');

// Portafolio (detalle de proyecto)
Route::get('/portafolio/{slug}', [PageController::class, 'project'])->name('project.show');

// Blog — powered by BlogEngine (server-side rendered, SEO-first)
// sitemap y rss ANTES de {slug} para evitar conflicto de parámetros
Route::get('/blog',              [BlogEngineController::class, 'index'])->name('blog.index');
Route::get('/blog/sitemap.xml',  [BlogEngineController::class, 'sitemap'])->name('blog.sitemap');
Route::get('/blog/rss.xml',      [BlogEngineController::class, 'rss'])->name('blog.rss');
Route::get('/blog/uploads/{path}', [BlogEngineController::class, 'proxyImage'])->where('path', '.*')->name('blog.proxy-image');
Route::get('/blog/{slug}',       [BlogEngineController::class, 'show'])->name('blog.show');

// Fallback proxy: /b/{client}/uploads/{path} → blogengineseo.com/uploads/{path}
Route::get('/b/{client}/uploads/{path}', function (string $client, string $path) {
    $apiUrl = rtrim(config('services.blogengine.url', 'https://blogengineseo.com'), '/');
    $remoteUrl = $apiUrl . '/uploads/' . $path;
    $cacheKey = 'blog_img_' . md5($path);
    $imageData = \Illuminate\Support\Facades\Cache::remember($cacheKey, 604800, function () use ($remoteUrl) {
        try {
            $resp = \Illuminate\Support\Facades\Http::timeout(15)->get($remoteUrl);
            if ($resp->successful()) {
                return ['body' => base64_encode($resp->body()), 'ct' => $resp->header('Content-Type') ?? 'image/webp'];
            }
        } catch (\Exception $e) {}
        return null;
    });
    if (!$imageData) abort(404);
    return response(base64_decode($imageData['body']))
        ->header('Content-Type', $imageData['ct'])
        ->header('Cache-Control', 'public, max-age=31536000, immutable');
})->where('path', '.*');

// Servicios
Route::get('/servicios', [ServiciosController::class, 'index'])->name('servicios.index');
Route::get('/servicios/paginas-web', [ServiciosController::class, 'paginasWeb'])->name('servicios.paginas-web');
Route::get('/servicios/tiendas-online', [ServiciosController::class, 'tiendasOnline'])->name('servicios.tiendas-online');
Route::get('/servicios/escuelas-virtuales', [ServiciosController::class, 'escuelasVirtuales'])->name('servicios.escuelas-virtuales');
Route::get('/servicios/aplicaciones-web', [ServiciosController::class, 'aplicacionesWeb'])->name('servicios.aplicaciones-web');

// Herramientas gratuitas
Route::get('/herramientas', [ToolController::class, 'index'])->name('tools.index');
Route::get('/herramientas/{slug}', [ToolController::class, 'show'])->name('tools.show');

// Contacto (landing page SSR con formulario)
Route::get('/contacto', [BlogEngineController::class, 'contacto'])->name('contacto');

// Formulario de contacto (API)
Route::post('/api/leads', [LeadController::class, 'store'])->name('leads.store');

// Briefing interactivo
Route::get('/briefing', [BriefingController::class, 'index'])->name('briefing');
Route::post('/api/briefings', [BriefingController::class, 'store'])->name('briefings.store');
Route::post('/api/briefings/upload', [BriefingController::class, 'upload'])->name('briefings.upload');

// Sitemap (SEO) — spatie/laravel-sitemap
Route::get('/sitemap.xml', function () {
    $sitemap = Sitemap::create()
        ->add(Url::create('/')
            ->setPriority(1.0)
            ->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY))
        ->add(Url::create('/contacto')
            ->setPriority(0.9)
            ->setChangeFrequency(Url::CHANGE_FREQUENCY_MONTHLY))
        ->add(Url::create('/servicios')
            ->setPriority(0.8)
            ->setChangeFrequency(Url::CHANGE_FREQUENCY_MONTHLY))
        ->add(Url::create('/servicios/paginas-web')
            ->setPriority(0.8)
            ->setChangeFrequency(Url::CHANGE_FREQUENCY_MONTHLY))
        ->add(Url::create('/servicios/tiendas-online')
            ->setPriority(0.8)
            ->setChangeFrequency(Url::CHANGE_FREQUENCY_MONTHLY))
        ->add(Url::create('/servicios/escuelas-virtuales')
            ->setPriority(0.8)
            ->setChangeFrequency(Url::CHANGE_FREQUENCY_MONTHLY))
        ->add(Url::create('/servicios/aplicaciones-web')
            ->setPriority(0.8)
            ->setChangeFrequency(Url::CHANGE_FREQUENCY_MONTHLY))
        ->add(Url::create('/herramientas')
            ->setPriority(0.7)
            ->setChangeFrequency(Url::CHANGE_FREQUENCY_MONTHLY))
        ->add(Url::create('/blog')
            ->setPriority(0.7)
            ->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY));

    // Herramientas individuales
    \App\Models\Tool::where('status', 'active')->get()->each(function ($tool) use ($sitemap) {
        $sitemap->add(Url::create("/herramientas/{$tool->slug}")
            ->setLastModificationDate($tool->updated_at)
            ->setPriority(0.6)
            ->setChangeFrequency(Url::CHANGE_FREQUENCY_MONTHLY));
    });

    // Posts del blog — obtenidos desde BlogEngine API
    try {
        $blogApiUrl = env('BLOGENGINE_API_URL', 'https://blogengineseo.com');
        $blogSlug   = env('BLOGENGINE_SLUG', 'paginaswebcreativas');
        $blogPosts  = \Illuminate\Support\Facades\Cache::remember(
            'sitemap_blogengine_posts',
            3600,
            fn () => \Illuminate\Support\Facades\Http::timeout(8)
                ->acceptJson()
                ->get("{$blogApiUrl}/api/public/{$blogSlug}/posts?limit=200")
                ->json()
        );

        if (is_array($blogPosts)) {
            foreach ($blogPosts as $post) {
                if (empty($post['slug'])) continue;
                $lastmod = isset($post['fecha_publicado'])
                    ? \Carbon\Carbon::parse($post['fecha_publicado'])
                    : now();
                $sitemap->add(Url::create("/blog/{$post['slug']}")
                    ->setLastModificationDate($lastmod)
                    ->setPriority(0.8)
                    ->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY));
            }
        }
    } catch (\Exception $e) {
        // Si la API falla, el sitemap se genera sin posts del blog (no rompemos el sitemap)
        report($e);
    }

    // Proyectos del portafolio
    \App\Models\Project::all()->each(function ($project) use ($sitemap) {
        $sitemap->add(Url::create("/portafolio/{$project->slug}")
            ->setPriority(0.7)
            ->setChangeFrequency(Url::CHANGE_FREQUENCY_MONTHLY));
    });

    return $sitemap->toResponse(request());
})->name('sitemap');

/*
|--------------------------------------------------------------------------
| Rutas Admin (requiere autenticación)
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {

    // Dashboard
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    // Proyectos (Portafolio)
    Route::resource('proyectos', AdminProjectController::class)->parameters([
        'proyectos' => 'project',
    ]);

    // Blog (CRUD artículos)
    Route::resource('blog', AdminBlogPostController::class)->parameters([
        'blog' => 'blogPost',
    ]);

    // Leads (Contactos)
    Route::get('leads', [AdminLeadController::class, 'index'])->name('leads.index');
    Route::put('leads/{lead}', [AdminLeadController::class, 'update'])->name('leads.update');
    Route::delete('leads/{lead}', [AdminLeadController::class, 'destroy'])->name('leads.destroy');

    // Briefings
    Route::get('briefings', [AdminBriefingController::class, 'index'])->name('briefings.index');
    Route::get('briefings/{briefing}', [AdminBriefingController::class, 'show'])->name('briefings.show');
    Route::put('briefings/{briefing}', [AdminBriefingController::class, 'update'])->name('briefings.update');
    Route::delete('briefings/{briefing}', [AdminBriefingController::class, 'destroy'])->name('briefings.destroy');
});

/*
|--------------------------------------------------------------------------
| Auth Routes (Breeze/Jetstream)
|--------------------------------------------------------------------------
*/

require __DIR__ . '/auth.php';
