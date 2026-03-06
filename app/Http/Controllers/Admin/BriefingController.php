<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Briefing;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BriefingController extends Controller
{
    public function index()
    {
        $briefings = Briefing::ordenado()->paginate(20)->through(fn($b) => [
            'id'         => $b->id,
            'nombre'     => $b->nombre,
            'empresa'    => $b->empresa,
            'email'      => $b->email,
            'telefono'   => $b->telefono,
            'status'     => $b->status,
            'status_label' => $b->status_label,
            'pdf_url'    => $b->pdf_url,
            'created_at' => $b->created_at->format('d/m/Y H:i'),
        ]);

        return Inertia::render('Admin/Briefings/Index', compact('briefings'));
    }

    public function show(Briefing $briefing)
    {
        return Inertia::render('Admin/Briefings/Show', [
            'briefing' => [
                'id'         => $briefing->id,
                'nombre'     => $briefing->nombre,
                'empresa'    => $briefing->empresa,
                'email'      => $briefing->email,
                'telefono'   => $briefing->telefono,
                'data'       => $briefing->data,
                'status'     => $briefing->status,
                'pdf_url'    => $briefing->pdf_url,
                'created_at' => $briefing->created_at->format('d/m/Y H:i'),
            ],
        ]);
    }

    public function update(Request $request, Briefing $briefing)
    {
        $request->validate(['status' => 'required|in:nuevo,revisado,en_proceso']);
        $briefing->update(['status' => $request->status]);
        return back();
    }

    public function destroy(Briefing $briefing)
    {
        $briefing->delete();
        return redirect()->route('admin.briefings.index');
    }
}
