<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class BlogPost extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'slug', 'excerpt', 'content', 'featured_image',
        'category', 'tags', 'meta_title', 'meta_description',
        'reading_time', 'user_id', 'status', 'published_at', 'views',
    ];

    protected $casts = [
        'tags' => 'array',
        'published_at' => 'datetime',
        'views' => 'integer',
    ];

    // === Relationships ===

    public function author()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // === Scopes ===

    public function scopePublished($query)
    {
        return $query->where('status', 'published')
                     ->where('published_at', '<=', now());
    }

    public function scopeByCategory($query, string $category)
    {
        return $query->where('category', $category);
    }

    public function scopeRecent($query, int $limit = 3)
    {
        return $query->published()->orderByDesc('published_at')->limit($limit);
    }

    // === Mutators ===

    protected static function booted()
    {
        static::creating(function ($post) {
            if (empty($post->slug)) {
                $post->slug = Str::slug($post->title);
            }
            if (empty($post->reading_time)) {
                $wordCount = str_word_count(strip_tags($post->content ?? ''));
                $minutes = max(1, ceil($wordCount / 200));
                $post->reading_time = $minutes . ' min';
            }
        });
    }

    // === Helpers ===

    public function getImageUrlAttribute(): ?string
    {
        return $this->featured_image ? asset('storage/' . $this->featured_image) : null;
    }

    public function getMetaTitleComputedAttribute(): string
    {
        return $this->meta_title ?: $this->title . ' — Páginas Web Creativas';
    }

    public function getMetaDescriptionComputedAttribute(): string
    {
        return $this->meta_description ?: Str::limit($this->excerpt, 160);
    }

    public function incrementViews(): void
    {
        $this->increment('views');
    }
}
