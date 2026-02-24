<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'slug', 'description', 'short_description', 'icon',
        'price', 'price_label', 'price_period', 'features',
        'featured', 'is_active', 'sort_order', 'cta_text', 'cta_url', 'badge',
    ];

    protected $casts = [
        'features' => 'array',
        'price' => 'decimal:2',
        'featured' => 'boolean',
        'is_active' => 'boolean',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order')->orderBy('price');
    }

    protected static function booted()
    {
        static::creating(function ($service) {
            if (empty($service->slug)) {
                $service->slug = Str::slug($service->name);
            }
        });
    }

    public function getFormattedPriceAttribute(): string
    {
        return '$' . number_format($this->price, 0) . ' ' . $this->price_label;
    }

    public function getWhatsAppUrlAttribute(): string
    {
        $msg = urlencode("Hola! Me interesa el plan {$this->name} ({$this->formatted_price})");
        return "https://wa.me/5215526711438?text={$msg}";
    }
}
