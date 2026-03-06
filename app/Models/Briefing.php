<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Briefing extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'empresa',
        'email',
        'telefono',
        'data',
        'pdf_path',
        'status',
    ];

    protected $casts = [
        'data' => 'array',
    ];

    // Scopes
    public function scopeNuevo($query)
    {
        return $query->where('status', 'nuevo');
    }

    public function scopeOrdenado($query)
    {
        return $query->latest();
    }

    // Accessors
    public function getPdfUrlAttribute(): ?string
    {
        return $this->pdf_path ? asset('storage/' . $this->pdf_path) : null;
    }

    public function getStatusLabelAttribute(): string
    {
        return match ($this->status) {
            'nuevo'      => 'Nuevo',
            'revisado'   => 'Revisado',
            'en_proceso' => 'En proceso',
            default      => $this->status,
        };
    }
}
