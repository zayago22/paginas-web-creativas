<?php

namespace App\Http\Controllers;

use App\Mail\BriefingReceived;
use App\Models\Briefing;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class BriefingController extends Controller
{
    /**
     * Página pública del formulario de briefing.
     */
    public function index()
    {
        return Inertia::render('Briefing/Index', [
            'meta' => [
                'title'       => 'Briefing de Diseño Web — Páginas Web Creativas',
                'description' => 'Completa tu briefing de diseño web para que podamos crear la página perfecta para tu negocio.',
                'noindex'     => true,
            ],
        ]);
    }

    /**
     * Guarda el briefing en base de datos y envía email con PDF.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre'   => 'required|string|max:255',
            'empresa'  => 'required|string|max:255',
            'email'    => 'required|email|max:255',
            'telefono' => 'required|string|max:50',
            'data'     => 'required|array',
            'pdf'      => 'nullable|string',  // base64 del PDF generado en frontend
        ]);

        // Guardar PDF si viene en base64
        $pdfPath = null;
        if (!empty($validated['pdf'])) {
            $pdfData    = base64_decode(preg_replace('/^data:application\/pdf;base64,/', '', $validated['pdf']));
            $filename   = 'briefing_' . Str::slug($validated['empresa']) . '_' . now()->format('Y-m-d') . '.pdf';
            $pdfPath    = 'briefings/' . $filename;
            Storage::disk('public')->put($pdfPath, $pdfData);
        }

        $briefing = Briefing::create([
            'nombre'   => $validated['nombre'],
            'empresa'  => $validated['empresa'],
            'email'    => $validated['email'],
            'telefono' => $validated['telefono'],
            'data'     => $validated['data'],
            'pdf_path' => $pdfPath,
        ]);

        // Enviar email a la agencia
        try {
            $agencyEmail = config('mail.from.address', 'contacto@paginaswebcreativas.com');
            Mail::to($agencyEmail)->send(new BriefingReceived($briefing));
            // Enviar confirmación también al cliente
            Mail::to($briefing->email)->send(new BriefingReceived($briefing, isConfirmation: true));
        } catch (\Exception $e) {
            report($e);
            // No falla el proceso si el email falla — el briefing ya está guardado
        }

        return response()->json([
            'success' => true,
            'message' => '¡Briefing recibido! Nos pondremos en contacto pronto.',
            'id'      => $briefing->id,
        ]);
    }

    /**
     * Upload de archivos durante el briefing (logo, archivos de referencia).
     */
    public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|file|max:5120|mimes:jpg,jpeg,png,svg,pdf,doc,docx,zip,webp',
            'type' => 'nullable|string|in:logo,archivo',
        ]);

        $type   = $request->input('type', 'archivo');
        $folder = 'briefings/uploads/' . $type;
        $path   = $request->file('file')->store($folder, 'public');

        return response()->json([
            'success' => true,
            'path'    => $path,
            'url'     => asset('storage/' . $path),
            'name'    => $request->file('file')->getClientOriginalName(),
            'size'    => $request->file('file')->getSize(),
        ]);
    }
}
