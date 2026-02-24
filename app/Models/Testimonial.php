<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_name', 'client_role', 'client_company', 'client_avatar',
        'content', 'rating', 'project_id', 'featured', 'is_active', 'sort_order',
    ];

    protected $casts = [
        'featured' => 'boolean',
        'is_active' => 'boolean',
        'rating' => 'integer',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeFeatured($query)
    {
        return $query->where('featured', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order')->orderByDesc('created_at');
    }

    public function getInitialsAttribute(): string
    {
        $words = explode(' ', $this->client_name);
        return collect($words)->take(2)->map(fn($w) => strtoupper($w[0]))->join('');
    }

    public function getAvatarUrlAttribute(): ?string
    {
        return $this->client_avatar ? asset('storage/' . $this->client_avatar) : null;
    }
}
