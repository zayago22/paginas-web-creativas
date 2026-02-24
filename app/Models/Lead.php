<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lead extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'email', 'phone', 'company', 'service_interest',
        'message', 'source', 'utm_source', 'utm_medium', 'utm_campaign',
        'status', 'notes', 'budget', 'contacted_at',
    ];

    protected $casts = [
        'budget' => 'decimal:2',
        'contacted_at' => 'datetime',
    ];

    // === Scopes ===

    public function scopeNew($query)
    {
        return $query->where('status', 'new');
    }

    public function scopeByStatus($query, string $status)
    {
        return $query->where('status', $status);
    }

    public function scopeRecent($query)
    {
        return $query->orderByDesc('created_at');
    }

    public function scopeThisMonth($query)
    {
        return $query->whereMonth('created_at', now()->month)
                     ->whereYear('created_at', now()->year);
    }

    // === Helpers ===

    public function markAsContacted(): void
    {
        $this->update([
            'status' => 'contacted',
            'contacted_at' => now(),
        ]);
    }

    public function getStatusLabelAttribute(): string
    {
        return match($this->status) {
            'new' => 'Nuevo',
            'contacted' => 'Contactado',
            'quoted' => 'Cotizado',
            'won' => 'Ganado',
            'lost' => 'Perdido',
            default => $this->status,
        };
    }

    public function getStatusColorAttribute(): string
    {
        return match($this->status) {
            'new' => 'blue',
            'contacted' => 'yellow',
            'quoted' => 'purple',
            'won' => 'green',
            'lost' => 'red',
            default => 'gray',
        };
    }
}
