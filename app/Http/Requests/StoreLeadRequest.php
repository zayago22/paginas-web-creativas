<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreLeadRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // público
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:100',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'company' => 'nullable|string|max:100',
            'service_interest' => 'nullable|string|in:presencia,crecimiento,escala,otro',
            'message' => 'nullable|string|max:2000',
            'source' => 'nullable|string|max:50',
            'utm_source' => 'nullable|string|max:100',
            'utm_medium' => 'nullable|string|max:100',
            'utm_campaign' => 'nullable|string|max:100',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Por favor ingresa tu nombre.',
            'email.required' => 'Necesitamos tu email para contactarte.',
            'email.email' => 'Por favor ingresa un email válido.',
        ];
    }
}
