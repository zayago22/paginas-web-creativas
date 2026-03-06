<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Briefing Recibido</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f4f4f5; margin: 0; padding: 20px; }
        .container { max-width: 580px; margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 20px rgba(0,0,0,0.08); }
        .header { background: #0A0A0F; color: #fff; padding: 40px 32px; text-align: center; }
        .icon { font-size: 48px; margin-bottom: 16px; }
        .header h1 { margin: 0 0 8px; font-size: 24px; font-weight: 700; }
        .header p { margin: 0; color: #8B8B9E; font-size: 14px; }
        .body { padding: 36px 32px; }
        .greeting { font-size: 18px; font-weight: 600; color: #1a1a2e; margin-bottom: 16px; }
        .text { font-size: 15px; color: #555; line-height: 1.7; margin-bottom: 16px; }
        .badge { background: #f0f0ff; border: 1px solid #ddd8ff; border-radius: 8px; padding: 16px 20px; margin: 20px 0; }
        .badge .num { font-size: 13px; color: #6C63FF; font-weight: 700; }
        .badge .empresa { font-size: 20px; font-weight: 700; color: #1a1a2e; margin: 4px 0 0; }
        .steps { margin: 24px 0; }
        .step { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 14px; }
        .step .dot { width: 28px; height: 28px; border-radius: 50%; background: #6C63FF; color: #fff; font-size: 12px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; }
        .step .info .title { font-size: 14px; font-weight: 600; color: #1a1a2e; }
        .step .info .desc { font-size: 13px; color: #8888a0; }
        .cta-wrap { text-align: center; margin: 28px 0; }
        .cta { background: #6C63FF; color: #fff; text-decoration: none; display: inline-block; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 15px; }
        .footer { background: #f9f9fb; padding: 20px 32px; text-align: center; font-size: 12px; color: #aaa; border-top: 1px solid #f0f0f5; }
    </style>
</head>
<body>
<div class="container">
    <div class="header">
        <div class="icon">✅</div>
        <h1>¡Briefing recibido!</h1>
        <p>Tu información está en buenas manos</p>
    </div>
    <div class="body">
        <div class="greeting">Hola, {{ $briefing->nombre }} 👋</div>
        <p class="text">
            Hemos recibido correctamente el briefing de diseño web para <strong>{{ $briefing->empresa }}</strong>.
            Nuestro equipo lo revisará en las próximas horas y nos pondremos en contacto contigo muy pronto.
        </p>

        <div class="badge">
            <div class="num">Briefing #{{ $briefing->id }}</div>
            <div class="empresa">{{ $briefing->empresa }}</div>
        </div>

        <div class="steps">
            <p class="text" style="font-weight:600; margin-bottom:12px;">¿Qué sigue?</p>
            <div class="step">
                <div class="dot">1</div>
                <div class="info">
                    <div class="title">Revisamos tu briefing</div>
                    <div class="desc">Analizamos toda la información que nos compartiste.</div>
                </div>
            </div>
            <div class="step">
                <div class="dot">2</div>
                <div class="info">
                    <div class="title">Te contactamos en &lt;24h</div>
                    <div class="desc">Te llamamos o escribimos por WhatsApp para agendar una reunión.</div>
                </div>
            </div>
            <div class="step">
                <div class="dot">3</div>
                <div class="info">
                    <div class="title">Propuesta personalizada</div>
                    <div class="desc">Preparamos una propuesta detallada basada en tus necesidades.</div>
                </div>
            </div>
        </div>

        <div class="cta-wrap">
            <a href="https://wa.me/5215526711438?text=Hola%21+Acabo+de+enviar+mi+briefing+para+{{ urlencode($briefing->empresa) }}" class="cta">
                Hablar por WhatsApp →
            </a>
        </div>

        <p class="text" style="font-size:13px; color:#aaa; text-align:center;">
            ¿Tienes dudas? Escríbenos a
            <a href="mailto:contacto@paginaswebcreativas.com" style="color:#6C63FF;">contacto@paginaswebcreativas.com</a>
        </p>
    </div>
    <div class="footer">
        © {{ date('Y') }} Páginas Web Creativas · paginaswebcreativas.com<br>
        55 2671 1438 · Ciudad de México
    </div>
</div>
</body>
</html>
