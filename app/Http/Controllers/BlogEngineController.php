<?php
/**
 * BlogEngine Connector para Páginas Web Creativas.
 *
 * Blog slug : paginaswebcreativas
 * API       : https://blogengineseo.com
 * Ruta      : /blog  (server-side rendering, Google indexa paginaswebcreativas.com/blog/...)
 *
 * VARIABLES .ENV requeridas:
 *   BLOGENGINE_SLUG=paginaswebcreativas
 *   BLOGENGINE_API_URL=https://blogengineseo.com
 *   BLOGENGINE_CACHE_TTL=3600
 */

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class BlogEngineController extends Controller
{
    private string $apiUrl;
    private string $blogSlug;
    private int    $cacheTtl;

    public function __construct()
    {
        $this->apiUrl    = config('services.blogengine.url',       'https://blogengineseo.com');
        $this->blogSlug  = config('services.blogengine.slug',      'paginaswebcreativas');
        $this->cacheTtl  = (int) config('services.blogengine.cache_ttl', 3600);
    }

    // ---------------------------------------------------------------
    // GET /blog  →  listado de artículos
    // ---------------------------------------------------------------
    public function index()
    {
        $posts = $this->fetch("/api/public/{$this->blogSlug}/posts?limit=20");

        if ($posts === null) {
            $posts = [];
        }

        // Rewrite image URLs to serve from this domain
        $posts = array_map(fn($p) => $this->rewritePostImages($p), $posts);

        $meta = [
            'title'       => 'Blog de Desarrollo Web | Laravel, React y SEO | Páginas Web Creativas',
            'description' => 'Artículos sobre desarrollo web, Laravel, React, Inertia.js, SEO y marketing digital. Aprende a crear sitios web profesionales con Páginas Web Creativas.',
            'canonical'   => 'https://paginaswebcreativas.com/blog',
            'og_type'     => 'website',
            'og_image'    => asset('images/og-paginaswebcreativas.jpg'),
        ];

        return view('blogengine.index', compact('posts', 'meta'));
    }

    // ---------------------------------------------------------------
    // GET /blog/{slug}  →  artículo individual
    // ---------------------------------------------------------------
    public function show(string $slug)
    {
        $post = $this->fetch("/api/public/{$this->blogSlug}/posts/{$slug}");

        if (empty($post)) {
            abort(404);
        }

        // If the API returned a different slug (301 redirect from old slug),
        // redirect the user to the canonical URL
        if (!empty($post['slug']) && $post['slug'] !== $slug) {
            return redirect('/blog/' . $post['slug'], 301);
        }

        // Rewrite image URLs to serve from this domain
        $post = $this->rewritePostImages($post);

        $canonical = 'https://paginaswebcreativas.com/blog/' . $slug;

        // Build title: strip pipe from AI title, then apply 50-char threshold
        $rawTitle = $post['titulo'] ?? 'Artículo';
        $siteName = 'Páginas Web Creativas';
        if (($pipePos = mb_strpos($rawTitle, ' | ')) !== false) {
            $rawTitle = mb_substr($rawTitle, 0, $pipePos);
        }
        $rawTitle = trim($rawTitle);
        if (mb_strlen($rawTitle) <= 50) {
            $fullTitle = $rawTitle . ' | ' . $siteName;
        } else {
            $words = explode(' ', $rawTitle);
            $truncated = '';
            foreach ($words as $w) {
                $test = $truncated === '' ? $w : $truncated . ' ' . $w;
                if (mb_strlen($test) > 47) break;
                $truncated = $test;
            }
            $fullTitle = ($truncated ?: mb_substr($rawTitle, 0, 47)) . '... | ' . $siteName;
        }

        $meta = [
            'title'        => $fullTitle,
            'description'  => $post['meta_description'] ?? $post['extracto'] ?? '',
            'canonical'    => $canonical,
            'og_type'      => 'article',
            'og_image'     => !empty($post['imagen_destacada_url'])
                ? url($post['imagen_destacada_url'])
                : asset('images/og-paginaswebcreativas.jpg'),
            'og_image_alt' => $post['imagen_destacada_alt'] ?? ($post['titulo'] ?? ''),
            'keywords'     => $post['keyword'] ?? '',
            'date'         => $post['fecha_publicado'] ?? '',
        ];

        // Schema.org Article JSON-LD
        $schema = [
            '@context'      => 'https://schema.org',
            '@type'         => 'Article',
            'headline'      => $post['titulo'] ?? '',
            'description'   => $meta['description'],
            'url'           => $canonical,
            'image'         => $meta['og_image'],
            'datePublished' => $post['fecha_publicado'] ?? '',
            'keywords'      => $post['keyword'] ?? '',
            'author'        => [
                '@type' => 'Organization',
                'name'  => 'Páginas Web Creativas',
                'url'   => 'https://paginaswebcreativas.com',
            ],
            'publisher' => [
                '@type' => 'Organization',
                'name'  => 'Páginas Web Creativas',
                'url'   => 'https://paginaswebcreativas.com',
                'logo'  => [
                    '@type' => 'ImageObject',
                    'url'   => 'https://paginaswebcreativas.com/images/logo.svg',
                ],
            ],
        ];

        return view('blogengine.show', compact('post', 'meta', 'schema'));
    }

    // ---------------------------------------------------------------
    // GET /blog/sitemap.xml
    // ---------------------------------------------------------------
    public function sitemap()
    {
        $posts = $this->fetch("/api/public/{$this->blogSlug}/posts?limit=200");

        $xml  = '<?xml version="1.0" encoding="UTF-8"?>';
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
        $xml .= '<url><loc>https://paginaswebcreativas.com/blog</loc>'
              . '<changefreq>daily</changefreq><priority>0.7</priority></url>';

        if (is_array($posts)) {
            foreach ($posts as $post) {
                $loc  = 'https://paginaswebcreativas.com/blog/' . ($post['slug'] ?? '');
                $date = isset($post['fecha_publicado'])
                    ? date('Y-m-d', strtotime($post['fecha_publicado']))
                    : '';
                $xml .= "<url><loc>{$loc}</loc>"
                      . ($date ? "<lastmod>{$date}</lastmod>" : '')
                      . '<priority>0.8</priority></url>';
            }
        }

        $xml .= '</urlset>';

        return response($xml, 200)->header('Content-Type', 'application/xml');
    }

    // ---------------------------------------------------------------
    // GET /blog/rss.xml
    // ---------------------------------------------------------------
    public function rss()
    {
        $posts = $this->fetch("/api/public/{$this->blogSlug}/posts?limit=20");

        $siteUrl = 'https://paginaswebcreativas.com';

        $xml  = '<?xml version="1.0" encoding="UTF-8"?>';
        $xml .= '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">';
        $xml .= '<channel>';
        $xml .= "<title>Blog | Páginas Web Creativas</title>";
        $xml .= "<link>{$siteUrl}/blog</link>";
        $xml .= "<description>Artículos sobre desarrollo web, Laravel, React y SEO.</description>";
        $xml .= "<language>es-mx</language>";
        $xml .= "<atom:link href=\"{$siteUrl}/blog/rss.xml\" rel=\"self\" type=\"application/rss+xml\"/>";

        if (is_array($posts)) {
            foreach ($posts as $post) {
                $loc   = "{$siteUrl}/blog/" . ($post['slug'] ?? '');
                $title = htmlspecialchars($post['titulo'] ?? '', ENT_XML1, 'UTF-8');
                $desc  = htmlspecialchars($post['extracto'] ?? '', ENT_XML1, 'UTF-8');
                $date  = isset($post['fecha_publicado'])
                    ? date(DATE_RSS, strtotime($post['fecha_publicado']))
                    : '';

                $xml .= "<item>";
                $xml .= "<title>{$title}</title>";
                $xml .= "<link>{$loc}</link>";
                $xml .= "<guid isPermaLink=\"true\">{$loc}</guid>";
                $xml .= "<description>{$desc}</description>";
                if ($date) {
                    $xml .= "<pubDate>{$date}</pubDate>";
                }
                $xml .= "</item>";
            }
        }

        $xml .= '</channel></rss>';

        return response($xml, 200)->header('Content-Type', 'application/rss+xml');
    }

    // ---------------------------------------------------------------
    // GET /contacto  →  formulario de contacto (SSR)
    // ---------------------------------------------------------------
    public function contacto()
    {
        return view('blogengine.contacto');
    }

    // ---------------------------------------------------------------
    // Proxy images from BlogEngine so they appear served from this domain
    // /blog/uploads/xxx.webp → fetches from blogengineseo.com/uploads/xxx.webp
    // ---------------------------------------------------------------
    public function proxyImage(string $path)
    {
        $remoteUrl = rtrim($this->apiUrl, '/') . '/uploads/' . $path;

        $cacheKey = 'blog_img_' . md5($path);
        $cacheDuration = 60 * 60 * 24 * 7; // 7 days

        $imageData = Cache::remember($cacheKey, $cacheDuration, function () use ($remoteUrl) {
            try {
                $response = Http::timeout(15)->get($remoteUrl);
                if ($response->successful()) {
                    return [
                        'body' => base64_encode($response->body()),
                        'content_type' => $response->header('Content-Type') ?? 'image/webp',
                    ];
                }
            } catch (\Exception $e) {
                Log::warning("Blog image proxy failed: {$e->getMessage()}");
            }
            return null;
        });

        if (!$imageData) {
            abort(404);
        }

        return response(base64_decode($imageData['body']))
            ->header('Content-Type', $imageData['content_type'])
            ->header('Cache-Control', 'public, max-age=31536000, immutable');
    }

    // ---------------------------------------------------------------
    // Rewrite image URLs in a post to serve from this domain
    // ---------------------------------------------------------------
    private function rewritePostImages(array $post): array
    {
        // Rewrite featured image
        if (!empty($post['imagen_destacada_url'])) {
            $post['imagen_destacada_url'] = $this->rewriteImageUrl($post['imagen_destacada_url']);
        }

        // Rewrite images in HTML content
        if (!empty($post['contenido_html'])) {
            $post['contenido_html'] = $this->rewriteContentImages($post['contenido_html']);
        }

        return $post;
    }

    /**
     * Rewrite a single image URL:
     * blogengineseo.com/uploads/xxx.webp → /blog/uploads/xxx.webp
     * /b/slug/uploads/xxx.webp            → /blog/uploads/xxx.webp
     */
    private function rewriteImageUrl(string $url): string
    {
        if (empty($url)) return $url;

        // Absolute URL from blogengineseo.com
        if (preg_match('#https?://[^/]*blogengineseo\.com/uploads/(.+)#i', $url, $m)) {
            return '/blog/uploads/' . $m[1];
        }

        // Relative path: /b/{slug}/uploads/xxx
        if (preg_match('#^/b/[^/]+/uploads/(.+)#', $url, $m)) {
            return '/blog/uploads/' . $m[1];
        }

        return $url;
    }

    /**
     * Rewrite all image URLs inside HTML content.
     */
    private function rewriteContentImages(string $html): string
    {
        if (empty($html)) return $html;

        // Rewrite src="https://blogengineseo.com/uploads/..."
        $html = preg_replace(
            '#(src=["\'])https?://[^/]*blogengineseo\.com/uploads/([^"\'>]+)#i',
            '$1/blog/uploads/$2',
            $html
        );

        // Rewrite src="/b/{slug}/uploads/..."
        $html = preg_replace(
            '#(src=["\'])/b/[^/]+/uploads/([^"\'>]+)#',
            '$1/blog/uploads/$2',
            $html
        );

        return $html;
    }

    // ---------------------------------------------------------------
    // Fetch con cache — nunca cachea respuestas vacías / null
    // ---------------------------------------------------------------
    private function fetch(string $endpoint): ?array
    {
        // v2: bump version to invalidate old cached data with external image URLs
        $cacheKey = 'blogengine_v2_' . md5($endpoint);

        try {
            // Intentamos leer de caché primero
            $cached = Cache::get($cacheKey);
            if ($cached !== null) {
                return $cached;
            }
        } catch (\Exception $e) {
            // Si la caché falla (ej: BD caída) continuamos sin caché
        }

        try {
            $response = Http::timeout(10)
                ->acceptJson()
                ->get($this->apiUrl . $endpoint);

            if ($response->successful()) {
                $data = $response->json();

                // Solo cachear si hay datos (no array vacío, no null)
                if (!empty($data)) {
                    try {
                        Cache::put($cacheKey, $data, $this->cacheTtl);
                    } catch (\Exception $e) {
                        // Fallo de caché no es fatal
                    }
                }

                return $data;
            }
        } catch (\Exception $e) {
            report($e);
        }

        return null;
    }
}
