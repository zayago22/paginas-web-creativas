<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Tool extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'slug', 'description', 'short_description', 'icon',
        'icon_bg_color', 'category', 'component_file', 'meta_title',
        'meta_description', 'keywords', 'status', 'is_featured',
        'sort_order', 'usage_count',
    ];

    protected $casts = [
        'keywords' => 'array',
        'is_featured' => 'boolean',
        'usage_count' => 'integer',
    ];

    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function scopeComingSoon($query)
    {
        return $query->where('status', 'coming_soon');
    }

    public function scopeByCategory($query, string $category)
    {
        return $query->where('category', $category);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order')->orderBy('name');
    }

    protected static function booted()
    {
        static::creating(function ($tool) {
            if (empty($tool->slug)) {
                $tool->slug = Str::slug($tool->name);
            }
        });
    }

    public function incrementUsage(): void
    {
        $this->increment('usage_count');
    }

    public function getUrlAttribute(): string
    {
        return route('tools.show', $this->slug);
    }

    public function getMetaTitleComputedAttribute(): string
    {
        return $this->meta_title ?: $this->name . ' Gratis Online — Páginas Web Creativas';
    }
}
