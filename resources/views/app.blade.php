<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="description" content="Diseñamos páginas web que generan clientes. +100 proyectos entregados en México.">
    <!-- Preconnects for analytics only (fonts are now local) -->
    <link rel="preconnect" href="https://www.facebook.com">
    <link rel="dns-prefetch" href="https://connect.facebook.net">
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
    @inertiaHead
    <!-- Facebook Pixel — deferred until idle to avoid render-blocking -->
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
</body>
</html>
