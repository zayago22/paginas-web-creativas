<!DOCTYPE html>
<html lang="es-MX" dir="ltr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="theme-color" content="#0090ff">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    {{-- ===== SEO META TAGS ===== --}}
    <title>{{ $page['props']['seo']['title'] ?? 'Páginas Web Creativas | Desarrollo Web Profesional en México' }}</title>
    <meta name="description" content="{{ $page['props']['seo']['description'] ?? 'Agencia de desarrollo web en México. Diseñamos páginas web, tiendas online y escuelas virtuales con Laravel y React. +100 proyectos. Desde $8,999 MXN.' }}">
    <link rel="canonical" href="{{ $page['props']['seo']['canonical'] ?? url()->current() }}">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <meta name="author" content="Páginas Web Creativas">
    <meta name="language" content="es-MX">

    {{-- ===== OPEN GRAPH ===== --}}
    <meta property="og:type" content="website">
    <meta property="og:locale" content="es_MX">
    <meta property="og:site_name" content="Páginas Web Creativas">
    <meta property="og:title" content="{{ $page['props']['seo']['og_title'] ?? $page['props']['seo']['title'] ?? 'Páginas Web Creativas' }}">
    <meta property="og:description" content="{{ $page['props']['seo']['og_description'] ?? $page['props']['seo']['description'] ?? 'Desarrollo web profesional en México' }}">
    <meta property="og:url" content="{{ url()->current() }}">
    <meta property="og:image" content="{{ $page['props']['seo']['og_image'] ?? asset('images/og-paginaswebcreativas.jpg') }}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="Páginas Web Creativas - Agencia de desarrollo web en México">

    {{-- ===== TWITTER CARD ===== --}}
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{{ $page['props']['seo']['og_title'] ?? $page['props']['seo']['title'] ?? 'Páginas Web Creativas' }}">
    <meta name="twitter:description" content="{{ $page['props']['seo']['og_description'] ?? $page['props']['seo']['description'] ?? 'Desarrollo web profesional en México' }}">
    <meta name="twitter:image" content="{{ $page['props']['seo']['og_image'] ?? asset('images/og-paginaswebcreativas.jpg') }}">

    {{-- ===== FAVICONS ===== --}}
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="manifest" href="/site.webmanifest">

    {{-- ===== SCHEMA JSON-LD GLOBAL ===== --}}
    <script type="application/ld+json">
    {!! json_encode($page['props']['seo']['schema'] ?? [
        '@context' => 'https://schema.org',
        '@type' => 'ProfessionalService',
        'name' => 'Páginas Web Creativas',
        'url' => 'https://paginaswebcreativas.com',
        'logo' => 'https://paginaswebcreativas.com/images/logo.svg',
        'description' => 'Agencia de desarrollo web especializada en Laravel y React. Páginas web, tiendas online, escuelas virtuales y aplicaciones web a medida en México.',
        'telephone' => '+525526711438',
        'email' => 'hola@rekobit.com',
        'address' => [
            '@type' => 'PostalAddress',
            'addressLocality' => 'Ciudad de México',
            'addressRegion' => 'CDMX',
            'addressCountry' => 'MX',
        ],
        'priceRange' => '$8,999 - $19,999 MXN',
        'areaServed' => [
            '@type' => 'Country',
            'name' => 'México',
        ],
        'hasOfferCatalog' => [
            '@type' => 'OfferCatalog',
            'name' => 'Servicios de Desarrollo Web',
            'itemListElement' => [
                [
                    '@type' => 'Offer',
                    'itemOffered' => [
                        '@type' => 'Service',
                        'name' => 'Diseño de Páginas Web',
                        'description' => 'Páginas web profesionales responsive con SEO y diseño personalizado',
                    ],
                ],
                [
                    '@type' => 'Offer',
                    'itemOffered' => [
                        '@type' => 'Service',
                        'name' => 'Tiendas Online',
                        'description' => 'E-commerce con pasarelas de pago, inventario y gestión de productos',
                    ],
                ],
                [
                    '@type' => 'Offer',
                    'itemOffered' => [
                        '@type' => 'Service',
                        'name' => 'Escuelas Virtuales',
                        'description' => 'Plataformas e-learning con cursos, certificados y suscripciones',
                    ],
                ],
                [
                    '@type' => 'Offer',
                    'itemOffered' => [
                        '@type' => 'Service',
                        'name' => 'Aplicaciones Web a Medida',
                        'description' => 'Software web personalizado con Laravel: CRMs, dashboards, sistemas de gestión',
                    ],
                ],
            ],
        ],
        'sameAs' => [
            'https://rekobit.com',
            'https://rankmind.app',
        ],
    ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT) !!}
    </script>

    {{-- Schema adicional por página --}}
    @if(!empty($page['props']['seo']['extra_schema']))
    <script type="application/ld+json">
    {!! json_encode($page['props']['seo']['extra_schema'], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT) !!}
    </script>
    @endif

    {{-- ===== PRELOAD FUENTE ===== --}}
    <link rel="preload" href="/fonts/Outfit-Variable.woff2" as="font" type="font/woff2" crossorigin>

    {{-- ===== PRECONNECTS ===== --}}
    <link rel="preconnect" href="https://www.facebook.com">
    <link rel="dns-prefetch" href="https://connect.facebook.net">

    {{-- ===== VITE + INERTIA ===== --}}
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
    @inertiaHead

    {{-- ===== FACEBOOK PIXEL (deferred) ===== --}}
    <script>
    (function() {
        function loadFbPixel() {
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
            document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '661490761316894');
            fbq('track', 'PageView');
        }
        if ('requestIdleCallback' in window) {
            requestIdleCallback(loadFbPixel, { timeout: 3000 });
        } else {
            setTimeout(loadFbPixel, 3000);
        }
    })();
    </script>
    <noscript><img height="1" width="1" style="display:none"
    src="https://www.facebook.com/tr?id=661490761316894&ev=PageView&noscript=1"/></noscript>
</head>
<body class="bg-[#0c1222] text-[#e8edf4] font-outfit antialiased">
    @inertia

    {{-- ===== NOSCRIPT FALLBACK PARA CRAWLERS ===== --}}
    <noscript>
        <div style="padding:2rem;max-width:900px;margin:0 auto;font-family:system-ui,sans-serif;line-height:1.6;color:#333">
            <h1 style="color:#0090ff">Páginas Web Creativas — Desarrollo Web Profesional en México</h1>
            <p>Somos una agencia de desarrollo web especializada en crear páginas web, tiendas online, escuelas virtuales y aplicaciones web a medida con <strong>Laravel</strong> y <strong>React</strong>. Más de 100 proyectos entregados con 98% de satisfacción.</p>

            <h2>Nuestros Servicios</h2>
            <ul>
                <li><a href="/servicios/paginas-web"><strong>Diseño de Páginas Web Profesionales</strong></a> — Sitios web responsive, rápidos y optimizados para SEO. Desde $8,999 MXN.</li>
                <li><a href="/servicios/tiendas-online"><strong>Tiendas Online / E-commerce</strong></a> — Con pasarelas de pago, inventario y gestión de productos. Desde $14,999 MXN.</li>
                <li><a href="/servicios/escuelas-virtuales"><strong>Escuelas Virtuales / E-Learning</strong></a> — Plataformas con cursos, certificados, suscripciones y videoconferencia. Desde $19,999 MXN.</li>
                <li><a href="/servicios/aplicaciones-web"><strong>Aplicaciones Web a Medida</strong></a> — CRMs, dashboards, sistemas de gestión y APIs con Laravel.</li>
            </ul>

            <h2>Tecnologías que Manejamos</h2>
            <p>Laravel, React, Inertia.js, Tailwind CSS, MySQL, PostgreSQL, Redis, Node.js, Vite, Docker, Coolify, Git, REST APIs, WebSockets.</p>

            <h2>Herramientas Gratuitas</h2>
            <ul>
                <li><a href="/herramientas/compresor-imagenes">Compresor de Imágenes Online</a></li>
                <li><a href="/herramientas/generador-qr">Generador de Códigos QR</a></li>
                <li><a href="/herramientas/convertidor-webp">Convertidor a WebP</a></li>
                <li><a href="/herramientas/redimensionar-imagenes">Redimensionador de Imágenes</a></li>
                <li><a href="/herramientas/extractor-colores">Extractor de Colores</a></li>
            </ul>

            <h2>¿Por qué Elegirnos?</h2>
            <ul>
                <li>+100 proyectos entregados</li>
                <li>+5 años de experiencia</li>
                <li>98% de satisfacción</li>
                <li>Respuesta en menos de 24 horas</li>
                <li>Desarrollo con código limpio y escalable (no WordPress, no plantillas)</li>
            </ul>

            <h2>Planes y Precios</h2>
            <ul>
                <li><strong>Plan Presencia</strong> — $8,999 MXN: Web responsive, 5 secciones, SEO básico, formulario de contacto, certificado SSL.</li>
                <li><strong>Plan Crecimiento</strong> — $14,999 MXN: Todo lo anterior + tienda online, pasarelas de pago, SEO avanzado, blog integrado.</li>
                <li><strong>Plan Escala</strong> — $19,999 MXN: Todo lo anterior + e-learning, suscripciones, certificados, videoconferencia.</li>
            </ul>

            <h2>Contacto</h2>
            <p>
                <a href="https://wa.me/5215526711438">WhatsApp: +52 55 2671 1438</a><br>
                Email: <a href="mailto:hola@rekobit.com">hola@rekobit.com</a> | <a href="mailto:contacto@paginaswebcreativas.com">contacto@paginaswebcreativas.com</a>
            </p>

            <h2>Nuestro Ecosistema</h2>
            <ul>
                <li><a href="https://rekobit.com">RekoBit</a> — Soluciones digitales</li>
                <li><a href="https://rankmind.app">RankMind</a> — Herramienta de análisis SEO</li>
            </ul>

            <p><a href="/portafolio">Ver Portafolio</a> | <a href="/blog">Blog</a> | <a href="/precios">Precios</a> | <a href="/contacto">Cotizar Proyecto</a></p>
        </div>
    </noscript>
</body>
</html>
