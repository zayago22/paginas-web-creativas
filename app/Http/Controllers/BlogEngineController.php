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

        $canonical = 'https://paginaswebcreativas.com/blog/' . $slug;

        $meta = [
            'title'        => ($post['titulo'] ?? 'Artículo') . ' | Páginas Web Creativas',
            'description'  => $post['meta_description'] ?? $post['extracto'] ?? '',
            'canonical'    => $canonical,
            'og_type'      => 'article',
            'og_image'     => $post['imagen_destacada_url'] ?? asset('images/og-paginaswebcreativas.jpg'),
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
    // Fetch con cache — nunca cachea respuestas vacías / null
    // ---------------------------------------------------------------
    private function fetch(string $endpoint): ?array
    {
        $cacheKey = 'blogengine_pwc_' . md5($endpoint);

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
