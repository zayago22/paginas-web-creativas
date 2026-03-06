<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nuevo Briefing</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f4f4f5; margin: 0; padding: 20px; }
        .container { max-width: 640px; margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 20px rgba(0,0,0,0.08); }
        .header { background: linear-gradient(135deg, #6C63FF 0%, #4C44CC 100%); color: #fff; padding: 36px 32px; }
        .header h1 { margin: 0 0 4px; font-size: 22px; font-weight: 700; }
        .header p { margin: 0; opacity: 0.85; font-size: 14px; }
        .body { padding: 32px; }
        .badge { display: inline-block; background: #f0f0ff; color: #6C63FF; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; padding: 4px 10px; border-radius: 20px; margin-bottom: 20px; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 24px; }
        .info-item { background: #f9f9fb; border-radius: 8px; padding: 14px 16px; }
        .info-item .label { font-size: 11px; color: #8888a0; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
        .info-item .value { font-size: 15px; color: #1a1a2e; font-weight: 600; }
        .section { border-top: 1px solid #f0f0f5; padding-top: 20px; margin-top: 20px; }
        .section h3 { font-size: 13px; color: #8888a0; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 12px; }
        .data-row { margin-bottom: 10px; }
        .data-row .key { font-size: 12px; color: #8888a0; margin-bottom: 2px; }
        .data-row .val { font-size: 14px; color: #1a1a2e; }
        .color-swatch { display: inline-block; width: 20px; height: 20px; border-radius: 50%; border: 2px solid rgba(0,0,0,0.1); vertical-align: middle; margin-right: 6px; }
        .cta { background: #6C63FF; color: #fff; text-decoration: none; display: inline-block; padding: 12px 28px; border-radius: 8px; font-weight: 600; font-size: 14px; margin-top: 8px; }
        .footer { background: #f9f9fb; padding: 20px 32px; text-align: center; font-size: 12px; color: #aaa; }
    </style>
</head>
<body>
<div class="container">
    <div class="header">
        <h1>📋 Nuevo Briefing Recibido</h1>
        <p>{{ now()->format('d \d\e F \d\e Y, H:i') }} hrs</p>
    </div>
    <div class="body">
        <div class="badge">Briefing #{{ $briefing->id }}</div>

        <div class="info-grid">
            <div class="info-item">
                <div class="label">Nombre</div>
                <div class="value">{{ $briefing->nombre }}</div>
            </div>
            <div class="info-item">
                <div class="label">Empresa</div>
                <div class="value">{{ $briefing->empresa }}</div>
            </div>
            <div class="info-item">
                <div class="label">Email</div>
                <div class="value">{{ $briefing->email }}</div>
            </div>
            <div class="info-item">
                <div class="label">Teléfono</div>
                <div class="value">{{ $briefing->telefono }}</div>
            </div>
        </div>

        @php $data = $briefing->data; @endphp

        @if(!empty($data['negocio']['industria']))
        <div class="section">
            <h3>Negocio</h3>
            <div class="data-row">
                <div class="key">Industria</div>
                <div class="val">{{ $data['negocio']['industria'] }}</div>
            </div>
            @if(!empty($data['negocio']['descripcion']))
            <div class="data-row">
                <div class="key">¿Qué hace?</div>
                <div class="val">{{ $data['negocio']['descripcion'] }}</div>
            </div>
            @endif
            @if(!empty($data['negocio']['diferenciador']))
            <div class="data-row">
                <div class="key">Diferenciador</div>
                <div class="val">{{ $data['negocio']['diferenciador'] }}</div>
            </div>
            @endif
        </div>
        @endif

        @if(!empty($data['servicios']))
        <div class="section">
            <h3>Servicios ({{ count($data['servicios']) }})</h3>
            @foreach($data['servicios'] as $svc)
            <div class="data-row">
                <div class="key">• {{ $svc['nombre'] ?? '' }}</div>
                @if(!empty($svc['descripcion']))<div class="val">{{ $svc['descripcion'] }}</div>@endif
            </div>
            @endforeach
        </div>
        @endif

        @if(!empty($data['colores']))
        <div class="section">
            <h3>Colores</h3>
            @foreach($data['colores'] as $c)
                <span class="color-swatch" style="background:{{ $c }};"></span>{{ $c }}&nbsp;&nbsp;
            @endforeach
        </div>
        @endif

        @if(!empty($data['webNueva']['tipo']))
        <div class="section">
            <h3>Nueva Web</h3>
            <div class="data-row">
                <div class="key">Tipo</div>
                <div class="val">{{ $data['webNueva']['tipo'] }}</div>
            </div>
            @if(!empty($data['webNueva']['paginas']))
            <div class="data-row">
                <div class="key">Páginas</div>
                <div class="val">{{ implode(', ', $data['webNueva']['paginas']) }}</div>
            </div>
            @endif
        </div>
        @endif

        <div class="section">
            <a href="{{ url('/admin') }}" class="cta">Ver en el Admin →</a>
        </div>

        @if($briefing->pdf_path)
        <p style="font-size:13px; color:#8888a0; margin-top:16px;">📎 PDF del briefing adjunto en este email.</p>
        @endif
    </div>
    <div class="footer">
        Páginas Web Creativas · paginaswebcreativas.com
    </div>
</div>
</body>
</html>
