<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PageController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\ToolController;
use App\Http\Controllers\LeadController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ProjectController as AdminProjectController;
use App\Http\Controllers\Admin\BlogPostController as AdminBlogPostController;
use App\Http\Controllers\Admin\LeadController as AdminLeadController;

/*
|--------------------------------------------------------------------------
| Rutas Públicas
|--------------------------------------------------------------------------
*/

// Landing principal
Route::get('/', [PageController::class, 'home'])->name('home');

// Portafolio (detalle de proyecto)
Route::get('/portafolio/{slug}', [PageController::class, 'project'])->name('project.show');

// Blog
Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/{slug}', [BlogController::class, 'show'])->name('blog.show');

// Herramientas gratuitas
Route::get('/herramientas', [ToolController::class, 'index'])->name('tools.index');
Route::get('/herramientas/{slug}', [ToolController::class, 'show'])->name('tools.show');

// Formulario de contacto (API)
Route::post('/api/leads', [LeadController::class, 'store'])->name('leads.store');

// Sitemap (SEO)
Route::get('/sitemap.xml', function () {
    $posts = \App\Models\BlogPost::published()->get();
    $tools = \App\Models\Tool::active()->get();
    $projects = \App\Models\Project::active()->get();

    return response()->view('sitemap', compact('posts', 'tools', 'projects'))
        ->header('Content-Type', 'application/xml');
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
});

/*
|--------------------------------------------------------------------------
| Auth Routes (Breeze/Jetstream)
|--------------------------------------------------------------------------
*/

require __DIR__ . '/auth.php';
