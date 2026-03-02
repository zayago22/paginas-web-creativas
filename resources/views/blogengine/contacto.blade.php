@extends('blogengine.layout')

@section('title', 'Contacto | Páginas Web Creativas')
@section('meta_description', 'Cotiza tu proyecto web. Desarrollo de páginas web, tiendas online, aplicaciones y escuelas virtuales en Laravel y React. Respuesta en menos de 24 horas.')
@section('canonical', 'https://paginaswebcreativas.com/contacto')
@section('og_type', 'website')

@section('schema_ld')
<script type="application/ld+json">
{
    "@@context": "https://schema.org",
    "@@type": "ContactPage",
    "name": "Contacto — Páginas Web Creativas",
    "description": "Formulario de contacto para cotizar tu proyecto web.",
    "url": "https://paginaswebcreativas.com/contacto",
    "mainEntity": {
        "@@type": "Organization",
        "name": "Páginas Web Creativas",
        "url": "https://paginaswebcreativas.com",
        "email": "contacto@paginaswebcreativas.com",
        "contactPoint": {
            "@@type": "ContactPoint",
            "contactType": "sales",
            "availableLanguage": ["Spanish", "English"]
        }
    }
}
</script>
@endsection

@section('content')
<div style="max-width: 1200px; margin: 0 auto; padding: 4rem 1.25rem 5rem;">

    {{-- Hero --}}
    <div id="contact-grid" style="
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 3rem;
        align-items: start;
    ">

        {{-- Columna izquierda: info --}}
        <div style="padding-top: 1rem;">
            <p style="
                display: inline-flex;
                align-items: center;
                gap: 0.4rem;
                font-size: 0.75rem;
                font-weight: 600;
                letter-spacing: 0.1em;
                text-transform: uppercase;
                color: var(--blue);
                background: rgba(0,144,255,.12);
                padding: 0.3rem 0.75rem;
                border-radius: 999px;
                margin-bottom: 1.25rem;
            ">Contacto</p>

            <h1 style="
                font-size: clamp(2rem, 4vw, 2.75rem);
                font-weight: 800;
                line-height: 1.15;
                color: var(--text);
                margin: 0 0 1.25rem;
            ">Hagamos realidad tu proyecto</h1>

            <p style="
                font-size: 1.1rem;
                color: var(--text-muted);
                line-height: 1.7;
                margin: 0 0 2.5rem;
            ">Cuéntanos qué necesitas y te responderemos en menos de 24 horas con una propuesta personalizada.</p>

            {{-- Datos de contacto --}}
            <div style="display: flex; flex-direction: column; gap: 1.5rem;">

                <div style="display: flex; align-items: center; gap: 1rem;">
                    <div style="
                        width: 44px; height: 44px;
                        background: rgba(0,144,255,.1);
                        border-radius: 12px;
                        display: flex; align-items: center; justify-content: center;
                        flex-shrink: 0;
                    ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="var(--blue)" stroke-width="2"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                    </div>
                    <div>
                        <p style="font-size: 0.8rem; color: var(--text-dim); margin: 0 0 0.15rem;">Email</p>
                        <a href="mailto:contacto@paginaswebcreativas.com" style="color: var(--text); text-decoration: none; font-weight: 500; font-size: 0.95rem;">contacto@paginaswebcreativas.com</a>
                    </div>
                </div>

                <div style="display: flex; align-items: center; gap: 1rem;">
                    <div style="
                        width: 44px; height: 44px;
                        background: rgba(0,144,255,.1);
                        border-radius: 12px;
                        display: flex; align-items: center; justify-content: center;
                        flex-shrink: 0;
                    ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="var(--blue)" stroke-width="2"><path d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                    </div>
                    <div>
                        <p style="font-size: 0.8rem; color: var(--text-dim); margin: 0 0 0.15rem;">Ubicación</p>
                        <p style="color: var(--text); margin: 0; font-weight: 500; font-size: 0.95rem;">México · Canadá · Remoto</p>
                    </div>
                </div>

                <div style="display: flex; align-items: center; gap: 1rem;">
                    <div style="
                        width: 44px; height: 44px;
                        background: rgba(0,144,255,.1);
                        border-radius: 12px;
                        display: flex; align-items: center; justify-content: center;
                        flex-shrink: 0;
                    ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="var(--blue)" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                    </div>
                    <div>
                        <p style="font-size: 0.8rem; color: var(--text-dim); margin: 0 0 0.15rem;">Respuesta</p>
                        <p style="color: var(--text); margin: 0; font-weight: 500; font-size: 0.95rem;">Menos de 24 horas</p>
                    </div>
                </div>

            </div>
        </div>

        {{-- Columna derecha: formulario --}}
        <div style="
            background: var(--bg-card);
            border: 1px solid var(--border);
            border-radius: 20px;
            padding: 2.5rem;
        ">
            <h2 style="
                font-size: 1.35rem;
                font-weight: 700;
                color: var(--text);
                margin: 0 0 0.5rem;
            ">Solicita tu cotización</h2>
            <p style="
                font-size: 0.9rem;
                color: var(--text-muted);
                margin: 0 0 2rem;
                line-height: 1.5;
            ">Completa el formulario y recibirás una propuesta sin compromiso.</p>

            <form id="contactForm" style="display: flex; flex-direction: column; gap: 1.25rem;">
                @csrf

                {{-- Nombre --}}
                <div>
                    <label for="name" style="display: block; font-size: 0.8rem; font-weight: 600; color: var(--text-muted); margin-bottom: 0.4rem;">Nombre *</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        placeholder="Tu nombre completo"
                        style="
                            width: 100%;
                            padding: 0.75rem 1rem;
                            background: var(--bg);
                            border: 1px solid var(--border);
                            border-radius: 10px;
                            color: var(--text);
                            font-size: 0.95rem;
                            font-family: inherit;
                            outline: none;
                            transition: border-color .2s;
                            box-sizing: border-box;
                        "
                        onfocus="this.style.borderColor='var(--blue)'"
                        onblur="this.style.borderColor='var(--border)'"
                    >
                </div>

                {{-- Email --}}
                <div>
                    <label for="email" style="display: block; font-size: 0.8rem; font-weight: 600; color: var(--text-muted); margin-bottom: 0.4rem;">Email *</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder="tu@email.com"
                        style="
                            width: 100%;
                            padding: 0.75rem 1rem;
                            background: var(--bg);
                            border: 1px solid var(--border);
                            border-radius: 10px;
                            color: var(--text);
                            font-size: 0.95rem;
                            font-family: inherit;
                            outline: none;
                            transition: border-color .2s;
                            box-sizing: border-box;
                        "
                        onfocus="this.style.borderColor='var(--blue)'"
                        onblur="this.style.borderColor='var(--border)'"
                    >
                </div>

                {{-- Teléfono y Empresa --}}
                <div id="phone-company-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <div>
                        <label for="phone" style="display: block; font-size: 0.8rem; font-weight: 600; color: var(--text-muted); margin-bottom: 0.4rem;">Teléfono</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            placeholder="+52 33 1234 5678"
                            style="
                                width: 100%;
                                padding: 0.75rem 1rem;
                                background: var(--bg);
                                border: 1px solid var(--border);
                                border-radius: 10px;
                                color: var(--text);
                                font-size: 0.95rem;
                                font-family: inherit;
                                outline: none;
                                transition: border-color .2s;
                                box-sizing: border-box;
                            "
                            onfocus="this.style.borderColor='var(--blue)'"
                            onblur="this.style.borderColor='var(--border)'"
                        >
                    </div>
                    <div>
                        <label for="company" style="display: block; font-size: 0.8rem; font-weight: 600; color: var(--text-muted); margin-bottom: 0.4rem;">Empresa</label>
                        <input
                            type="text"
                            id="company"
                            name="company"
                            placeholder="Tu empresa"
                            style="
                                width: 100%;
                                padding: 0.75rem 1rem;
                                background: var(--bg);
                                border: 1px solid var(--border);
                                border-radius: 10px;
                                color: var(--text);
                                font-size: 0.95rem;
                                font-family: inherit;
                                outline: none;
                                transition: border-color .2s;
                                box-sizing: border-box;
                            "
                            onfocus="this.style.borderColor='var(--blue)'"
                            onblur="this.style.borderColor='var(--border)'"
                        >
                    </div>
                </div>

                {{-- Servicio de interés --}}
                <div>
                    <label for="service_interest" style="display: block; font-size: 0.8rem; font-weight: 600; color: var(--text-muted); margin-bottom: 0.4rem;">¿Qué servicio te interesa?</label>
                    <select
                        id="service_interest"
                        name="service_interest"
                        style="
                            width: 100%;
                            padding: 0.75rem 1rem;
                            background: var(--bg);
                            border: 1px solid var(--border);
                            border-radius: 10px;
                            color: var(--text);
                            font-size: 0.95rem;
                            font-family: inherit;
                            outline: none;
                            transition: border-color .2s;
                            box-sizing: border-box;
                            cursor: pointer;
                            appearance: none;
                            -webkit-appearance: none;
                            background-image: url('data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%2394a3b8%22 stroke-width=%222%22%3E%3Cpath d=%22M6 9l6 6 6-6%22/%3E%3C/svg%3E');
                            background-repeat: no-repeat;
                            background-position: right 1rem center;
                        "
                        onfocus="this.style.borderColor='var(--blue)'"
                        onblur="this.style.borderColor='var(--border)'"
                    >
                        <option value="" style="background: var(--bg-card); color: var(--text-muted);">Selecciona una opción</option>
                        <option value="presencia" style="background: var(--bg-card);">Página Web / Landing Page</option>
                        <option value="crecimiento" style="background: var(--bg-card);">Tienda Online / E-commerce</option>
                        <option value="escala" style="background: var(--bg-card);">Aplicación Web / SaaS</option>
                        <option value="otro" style="background: var(--bg-card);">Otro / No estoy seguro</option>
                    </select>
                </div>

                {{-- Mensaje --}}
                <div>
                    <label for="message" style="display: block; font-size: 0.8rem; font-weight: 600; color: var(--text-muted); margin-bottom: 0.4rem;">Cuéntanos sobre tu proyecto</label>
                    <textarea
                        id="message"
                        name="message"
                        rows="4"
                        placeholder="Describe brevemente qué necesitas: tipo de sitio, funcionalidades, plazos..."
                        style="
                            width: 100%;
                            padding: 0.75rem 1rem;
                            background: var(--bg);
                            border: 1px solid var(--border);
                            border-radius: 10px;
                            color: var(--text);
                            font-size: 0.95rem;
                            font-family: inherit;
                            outline: none;
                            transition: border-color .2s;
                            resize: vertical;
                            min-height: 100px;
                            box-sizing: border-box;
                        "
                        onfocus="this.style.borderColor='var(--blue)'"
                        onblur="this.style.borderColor='var(--border)'"
                    ></textarea>
                </div>

                {{-- Honeypot (anti-spam) --}}
                <div style="position: absolute; left: -9999px;" aria-hidden="true">
                    <input type="text" name="website" tabindex="-1" autocomplete="off">
                </div>

                {{-- UTM hidden fields --}}
                <input type="hidden" name="source" value="contacto-page">
                <input type="hidden" id="utm_source" name="utm_source">
                <input type="hidden" id="utm_medium" name="utm_medium">
                <input type="hidden" id="utm_campaign" name="utm_campaign">

                {{-- Submit --}}
                <button
                    type="submit"
                    id="submitBtn"
                    style="
                        width: 100%;
                        padding: 0.85rem 1.5rem;
                        background: var(--blue);
                        color: #fff;
                        font-size: 1rem;
                        font-weight: 700;
                        font-family: inherit;
                        border: none;
                        border-radius: 10px;
                        cursor: pointer;
                        transition: opacity .2s, transform .1s;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 0.5rem;
                    "
                    onmouseenter="this.style.opacity='.9'"
                    onmouseleave="this.style.opacity='1'"
                    onmousedown="this.style.transform='scale(.98)'"
                    onmouseup="this.style.transform='scale(1)'"
                >
                    Enviar solicitud <span aria-hidden="true">→</span>
                </button>
            </form>

            {{-- Mensajes de estado --}}
            <div id="formSuccess" style="
                display: none;
                margin-top: 1.5rem;
                padding: 1.25rem;
                background: rgba(34,197,94,.1);
                border: 1px solid rgba(34,197,94,.3);
                border-radius: 12px;
                text-align: center;
            ">
                <p style="color: #22c55e; font-weight: 700; font-size: 1.05rem; margin: 0 0 0.3rem;">¡Mensaje enviado!</p>
                <p style="color: var(--text-muted); font-size: 0.875rem; margin: 0;">Te contactaremos en menos de 24 horas.</p>
            </div>

            <div id="formError" style="
                display: none;
                margin-top: 1.5rem;
                padding: 1.25rem;
                background: rgba(239,68,68,.1);
                border: 1px solid rgba(239,68,68,.3);
                border-radius: 12px;
                text-align: center;
            ">
                <p style="color: #ef4444; font-weight: 700; font-size: 1.05rem; margin: 0 0 0.3rem;">Error al enviar</p>
                <p id="formErrorMsg" style="color: var(--text-muted); font-size: 0.875rem; margin: 0;">Intenta de nuevo o escríbenos a contacto@paginaswebcreativas.com</p>
            </div>
        </div>

    </div>

</div>

{{-- JS del formulario --}}
<script>
document.addEventListener('DOMContentLoaded', function() {
    // Capturar UTMs de la URL
    const params = new URLSearchParams(window.location.search);
    ['utm_source', 'utm_medium', 'utm_campaign'].forEach(function(key) {
        const el = document.getElementById(key);
        if (el && params.get(key)) el.value = params.get(key);
    });

    const form = document.getElementById('contactForm');
    const btn = document.getElementById('submitBtn');
    const successEl = document.getElementById('formSuccess');
    const errorEl = document.getElementById('formError');
    const errorMsg = document.getElementById('formErrorMsg');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Honeypot check
        if (form.querySelector('[name="website"]').value) return;

        // Disable button
        btn.disabled = true;
        btn.innerHTML = '<span style="display:inline-block;width:18px;height:18px;border:2px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:spin .6s linear infinite;"></span> Enviando...';
        successEl.style.display = 'none';
        errorEl.style.display = 'none';

        const data = {
            name: form.name.value,
            email: form.email.value,
            phone: form.phone.value || null,
            company: form.company.value || null,
            service_interest: form.service_interest.value || null,
            message: form.message.value || null,
            source: 'contacto-page',
            utm_source: form.utm_source.value || null,
            utm_medium: form.utm_medium.value || null,
            utm_campaign: form.utm_campaign.value || null,
        };

        fetch('/api/leads', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRF-TOKEN': form.querySelector('[name="_token"]').value,
            },
            body: JSON.stringify(data),
        })
        .then(function(resp) { return resp.json().then(function(json) { return { ok: resp.ok, json: json }; }); })
        .then(function(result) {
            if (result.ok && result.json.success) {
                successEl.style.display = 'block';
                form.reset();
            } else {
                var msgs = result.json.errors
                    ? Object.values(result.json.errors).flat().join('. ')
                    : (result.json.message || 'Error desconocido');
                errorMsg.textContent = msgs;
                errorEl.style.display = 'block';
            }
        })
        .catch(function() {
            errorMsg.textContent = 'Error de conexión. Intenta de nuevo.';
            errorEl.style.display = 'block';
        })
        .finally(function() {
            btn.disabled = false;
            btn.innerHTML = 'Enviar solicitud <span aria-hidden="true">→</span>';
        });
    });
});
</script>

<style>
    @@keyframes spin { to { transform: rotate(360deg); } }

    @@media (max-width: 768px) {
        #contact-grid {
            display: flex !important;
            flex-direction: column !important;
        }
        #phone-company-grid {
            grid-template-columns: 1fr !important;
        }
    }
</style>
@endsection
