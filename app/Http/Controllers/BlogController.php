<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use Inertia\Inertia;

class BlogController extends Controller
{
    /**
     * Listado de artículos del blog con paginación.
     */
    public function index()
    {
        $posts = BlogPost::published()
            ->orderByDesc('published_at')
            ->paginate(9)
            ->through(fn($post) => [
                'id' => $post->id,
                'title' => $post->title,
                'slug' => $post->slug,
                'excerpt' => $post->excerpt,
                'category' => $post->category,
                'reading_time' => $post->reading_time,
                'published_at' => $post->published_at->format('d M, Y'),
                'image_url' => $post->image_url,
                'tags' => $post->tags,
            ]);

        $categories = BlogPost::published()
            ->select('category')
            ->distinct()
            ->pluck('category');

        return Inertia::render('Blog/Index', [
            'posts' => $posts,
            'categories' => $categories,
            'filters' => request()->only('category', 'search'),
        ]);
    }

    /**
     * Artículo individual del blog — SEO optimizado.
     */
    public function show(string $slug)
    {
        $post = BlogPost::published()->where('slug', $slug)->firstOrFail();
        $post->incrementViews();

        $related = BlogPost::published()
            ->where('id', '!=', $post->id)
            ->where('category', $post->category)
            ->limit(3)
            ->get()
            ->map(fn($p) => [
                'id' => $p->id,
                'title' => $p->title,
                'slug' => $p->slug,
                'excerpt' => $p->excerpt,
                'reading_time' => $p->reading_time,
                'image_url' => $p->image_url,
            ]);

        return Inertia::render('Blog/Show', [
            'post' => [
                'id' => $post->id,
                'title' => $post->title,
                'slug' => $post->slug,
                'excerpt' => $post->excerpt,
                'content' => $post->content,
                'category' => $post->category,
                'tags' => $post->tags,
                'reading_time' => $post->reading_time,
                'published_at' => $post->published_at->format('d M, Y'),
                'views' => $post->views,
                'image_url' => $post->image_url,
                'meta_title' => $post->meta_title_computed,
                'meta_description' => $post->meta_description_computed,
            ],
            'relatedPosts' => $related,
        ]);
    }
}
