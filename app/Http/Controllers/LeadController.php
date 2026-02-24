<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLeadRequest;
use App\Models\Lead;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Mail;

class LeadController extends Controller
{
    /**
     * Guardar lead desde formulario de contacto.
     * Responde con JSON para que React maneje la UI.
     */
    public function store(StoreLeadRequest $request): JsonResponse
    {
        $lead = Lead::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'company' => $request->company,
            'service_interest' => $request->service_interest,
            'message' => $request->message,
            'source' => $request->source ?? 'website',
            'utm_source' => $request->utm_source,
            'utm_medium' => $request->utm_medium,
            'utm_campaign' => $request->utm_campaign,
        ]);

        // Notificación por email al admin
        $this->notifyAdmin($lead);

        return response()->json([
            'success' => true,
            'message' => '¡Gracias! Te contactaremos en menos de 24 horas.',
        ]);
    }

    /**
     * Enviar notificación al admin cuando llega un lead nuevo.
     */
    private function notifyAdmin(Lead $lead): void
    {
        try {
            Mail::raw(
                "Nuevo lead desde {$lead->source}:\n\n" .
                "Nombre: {$lead->name}\n" .
                "Email: {$lead->email}\n" .
                "Teléfono: {$lead->phone}\n" .
                "Servicio: {$lead->service_interest}\n" .
                "Mensaje: {$lead->message}\n\n" .
                "Ver en admin: " . url('/admin/leads'),
                function ($message) use ($lead) {
                    $message->to(config('mail.admin_email', 'contacto@paginaswebcreativas.com'))
                            ->subject("🔔 Nuevo Lead: {$lead->name} — {$lead->service_interest}");
                }
            );
        } catch (\Exception $e) {
            // Log pero no romper la experiencia del usuario
            \Log::error('Error enviando notificación de lead: ' . $e->getMessage());
        }
    }
}
