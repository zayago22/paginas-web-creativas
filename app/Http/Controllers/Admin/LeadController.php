<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Lead;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LeadController extends Controller
{
    public function index(Request $request)
    {
        $query = Lead::query()->recent();

        if ($request->status) {
            $query->byStatus($request->status);
        }

        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', "%{$request->search}%")
                  ->orWhere('email', 'like', "%{$request->search}%")
                  ->orWhere('company', 'like', "%{$request->search}%");
            });
        }

        $leads = $query->paginate(20)->through(fn($l) => [
            'id' => $l->id,
            'name' => $l->name,
            'email' => $l->email,
            'phone' => $l->phone,
            'company' => $l->company,
            'service_interest' => $l->service_interest,
            'source' => $l->source,
            'status' => $l->status,
            'status_label' => $l->status_label,
            'status_color' => $l->status_color,
            'message' => $l->message,
            'notes' => $l->notes,
            'created_at' => $l->created_at->format('d/m/Y H:i'),
            'contacted_at' => $l->contacted_at?->format('d/m/Y H:i'),
        ]);

        $statusCounts = [
            'all' => Lead::count(),
            'new' => Lead::byStatus('new')->count(),
            'contacted' => Lead::byStatus('contacted')->count(),
            'quoted' => Lead::byStatus('quoted')->count(),
            'won' => Lead::byStatus('won')->count(),
            'lost' => Lead::byStatus('lost')->count(),
        ];

        return Inertia::render('Admin/Leads/Index', [
            'leads' => $leads,
            'statusCounts' => $statusCounts,
            'filters' => $request->only('status', 'search'),
        ]);
    }

    public function update(Request $request, Lead $lead)
    {
        $validated = $request->validate([
            'status' => 'required|in:new,contacted,quoted,won,lost',
            'notes' => 'nullable|string|max:2000',
            'budget' => 'nullable|numeric|min:0',
        ]);

        if ($validated['status'] === 'contacted' && $lead->status === 'new') {
            $validated['contacted_at'] = now();
        }

        $lead->update($validated);

        return back()->with('success', 'Lead actualizado.');
    }

    public function destroy(Lead $lead)
    {
        $lead->delete();
        return back()->with('success', 'Lead eliminado.');
    }
}
