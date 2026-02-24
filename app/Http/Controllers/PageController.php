<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use App\Models\Project;
use App\Models\Service;
use App\Models\Testimonial;
use App\Models\Tool;
use Inertia\Inertia;

class PageController extends Controller
{
    /**
     * Landing page principal — carga todos los datos de todas las secciones.
     */
    public function home()
    {
        return Inertia::render('Home', [
            'services' => Service::active()->ordered()->get(),
            'projects' => Project::active()->featured()->ordered()->limit(6)->get()->map(fn($p) => [
                'id' => $p->id,
                'title' => $p->title,
                'slug' => $p->slug,
                'category' => $p->category,
                'image_url' => $p->image_url,
                'thumbnail_url' => $p->thumbnail_url,
                'technologies' => $p->technologies,
                'url' => $p->url,
            ]),
            'testimonials' => Testimonial::active()->featured()->ordered()->limit(3)->get()->map(fn($t) => [
                'id' => $t->id,
                'client_name' => $t->client_name,
                'client_role' => $t->client_role,
                'content' => $t->content,
                'rating' => $t->rating,
                'initials' => $t->initials,
                'avatar_url' => $t->avatar_url,
            ]),
            'tools' => Tool::ordered()->limit(8)->get()->map(fn($t) => [
                'id' => $t->id,
                'name' => $t->name,
                'slug' => $t->slug,
                'short_description' => $t->short_description,
                'icon' => $t->icon,
                'icon_bg_color' => $t->icon_bg_color,
                'status' => $t->status,
                'url' => $t->status === 'active' ? $t->url : null,
            ]),
            'blogPosts' => BlogPost::recent(3)->get()->map(fn($p) => [
                'id' => $p->id,
                'title' => $p->title,
                'slug' => $p->slug,
                'excerpt' => $p->excerpt,
                'category' => $p->category,
                'reading_time' => $p->reading_time,
                'published_at' => $p->published_at->format('M Y'),
                'image_url' => $p->image_url,
            ]),
            'stats' => [
                'projects' => Project::active()->count(),
                'years' => 5,
                'satisfaction' => 98,
                'response_time' => '24h',
            ],
        ]);
    }

    /**
     * Página "Acerca de" (opcional)
     */
    public function about()
    {
        return Inertia::render('About');
    }

    /**
     * Detalle público de un proyecto del portafolio.
     */
    public function project(string $slug)
    {
        $project = Project::active()
            ->where('slug', $slug)
            ->firstOrFail();

        $galleryUrls = collect($project->gallery ?? [])
            ->map(fn($path) => asset('storage/' . $path))
            ->values();

        $related = Project::active()
            ->where('id', '!=', $project->id)
            ->where('category', $project->category)
            ->ordered()
            ->limit(3)
            ->get()
            ->map(fn($p) => [
                'id'        => $p->id,
                'title'     => $p->title,
                'slug'      => $p->slug,
                'category'  => $p->category,
                'image_url' => $p->image_url,
            ]);

        return Inertia::render('Portafolio/Show', [
            'project' => [
                'id'           => $project->id,
                'title'        => $project->title,
                'slug'         => $project->slug,
                'description'  => $project->description,
                'client_name'  => $project->client_name,
                'category'     => $project->category,
                'image_url'    => $project->image_url,
                'gallery_urls' => $galleryUrls,
                'technologies' => $project->technologies ?? [],
                'url'          => $project->url,
                'completed_at' => $project->completed_at?->format('F Y'),
            ],
            'related' => $related,
        ]);
    }}