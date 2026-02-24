<?php

namespace App\Http\Controllers;

use App\Models\Tool;
use Inertia\Inertia;

class ToolController extends Controller
{
    /**
     * Hub de herramientas gratuitas.
     */
    public function index()
    {
        $tools = Tool::ordered()->get()->groupBy('category')->map(function ($group) {
            return $group->map(fn($t) => [
                'id' => $t->id,
                'name' => $t->name,
                'slug' => $t->slug,
                'short_description' => $t->short_description,
                'icon' => $t->icon,
                'icon_bg_color' => $t->icon_bg_color,
                'status' => $t->status,
                'usage_count' => $t->usage_count,
                'url' => $t->status === 'active' ? route('tools.show', $t->slug) : null,
            ]);
        });

        return Inertia::render('Tools/Index', [
            'toolsByCategory' => $tools,
        ]);
    }

    /**
     * Herramienta individual — carga el componente client-side.
     */
    public function show(string $slug)
    {
        $tool = Tool::where('slug', $slug)->where('status', 'active')->firstOrFail();
        $tool->incrementUsage();

        return Inertia::render('Tools/Show', [
            'tool' => [
                'id' => $tool->id,
                'name' => $tool->name,
                'slug' => $tool->slug,
                'description' => $tool->description,
                'icon' => $tool->icon,
                'component_file' => $tool->component_file,
                'meta_title' => $tool->meta_title_computed,
                'meta_description' => $tool->meta_description,
                'usage_count' => $tool->usage_count,
            ],
        ]);
    }
}
