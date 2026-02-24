<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::ordered()
            ->paginate(20)
            ->through(fn($p) => [
                'id' => $p->id,
                'title' => $p->title,
                'category' => $p->category,
                'featured' => $p->featured,
                'is_active' => $p->is_active,
                'image_url' => $p->image_url,
                'completed_at' => $p->completed_at?->format('d/m/Y'),
            ]);

        return Inertia::render('Admin/Projects/Index', [
            'projects' => $projects,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Projects/Form', [
            'project' => null,
            'categories' => ['web', 'ecommerce', 'elearning', 'landing', 'app'],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'        => 'required|string|max:200',
            'slug'         => 'nullable|string|max:200',
            'description'  => 'required|string',
            'client_name'  => 'nullable|string|max:100',
            'category'     => 'required|string|in:web,ecommerce,elearning,landing,app',
            'image'        => 'nullable|image|max:5120',
            'gallery.*'    => 'nullable|image|max:5120',
            'url'          => 'nullable|url|max:255',
            'technologies' => 'nullable|array',
            'featured'     => 'boolean',
            'is_active'    => 'boolean',
            'sort_order'   => 'integer',
            'completed_at' => 'nullable|date',
        ]);

        $base = Str::slug($validated['slug'] ?? $validated['title']);
        if (empty($base)) $base = Str::slug($validated['title']);
        $slug  = $base;
        $count = 1;
        while (Project::where('slug', $slug)->exists()) {
            $slug = $base . '-' . (++$count);
        }
        $validated['slug'] = $slug;

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('projects', 'public');
        }

        if ($request->hasFile('gallery')) {
            $galleryPaths = [];
            foreach ($request->file('gallery') as $file) {
                $galleryPaths[] = $file->store('projects/gallery', 'public');
            }
            $validated['gallery'] = $galleryPaths;
        }

        Project::create($validated);

        return redirect()->route('admin.proyectos.index')
            ->with('success', 'Proyecto creado exitosamente.');
    }

    public function edit(Project $project)
    {
        return Inertia::render('Admin/Projects/Form', [
            'project' => $project,
            'categories' => ['web', 'ecommerce', 'elearning', 'landing', 'app'],
        ]);
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title'        => 'required|string|max:200',
            'slug'         => 'nullable|string|max:200',
            'description'  => 'required|string',
            'client_name'  => 'nullable|string|max:100',
            'category'     => 'required|string|in:web,ecommerce,elearning,landing,app',
            'image'        => 'nullable|image|max:5120',
            'gallery.*'    => 'nullable|image|max:5120',
            'gallery_keep' => 'nullable|array',
            'url'          => 'nullable|url|max:255',
            'technologies' => 'nullable|array',
            'featured'     => 'boolean',
            'is_active'    => 'boolean',
            'sort_order'   => 'integer',
            'completed_at' => 'nullable|date',
        ]);

        $base = Str::slug($validated['slug'] ?? $validated['title']);
        if (empty($base)) $base = Str::slug($validated['title']);
        $slug  = $base;
        $count = 1;
        while (Project::where('slug', $slug)->where('id', '!=', $project->id)->exists()) {
            $slug = $base . '-' . (++$count);
        }
        $validated['slug'] = $slug;

        if ($request->hasFile('image')) {
            if ($project->image) {
                Storage::disk('public')->delete($project->image);
            }
            $validated['image'] = $request->file('image')->store('projects', 'public');
        } elseif ($request->input('remove_image')) {
            // User explicitly removed the image
            if ($project->image) {
                Storage::disk('public')->delete($project->image);
            }
            $validated['image'] = null;
        } else {
            // No change — preserve the existing image
            unset($validated['image']);
        }

        // Gallery: keep existing paths that were not removed, add new uploads
        $keepPaths = $request->input('gallery_keep', []);
        $existingGallery = $project->gallery ?? [];

        // Delete removed images
        foreach ($existingGallery as $path) {
            if (!in_array($path, $keepPaths)) {
                Storage::disk('public')->delete($path);
            }
        }

        $newGallery = array_values(array_filter($keepPaths));

        if ($request->hasFile('gallery')) {
            foreach ($request->file('gallery') as $file) {
                $newGallery[] = $file->store('projects/gallery', 'public');
            }
        }

        $validated['gallery'] = count($newGallery) > 0 ? $newGallery : null;
        unset($validated['gallery_keep']);

        $project->update($validated);

        return redirect()->route('admin.proyectos.index')
            ->with('success', 'Proyecto actualizado.');
    }

    public function destroy(Project $project)
    {
        if ($project->image) {
            Storage::disk('public')->delete($project->image);
        }
        if ($project->gallery) {
            foreach ($project->gallery as $path) {
                Storage::disk('public')->delete($path);
            }
        }
        $project->delete();

        return redirect()->route('admin.proyectos.index')
            ->with('success', 'Proyecto eliminado.');
    }
}
