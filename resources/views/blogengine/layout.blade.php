<!DOCTYPE html>
<html lang="es-MX" dir="ltr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="theme-color" content="#0090ff">

    {{-- ===== SEO ===== --}}
    <title>@yield('title', 'Blog | Páginas Web Creativas')</title>
    <meta name="description" content="@yield('meta_description', 'Artículos sobre desarrollo web, Laravel, React y SEO.')">
    <link rel="canonical" href="@yield('canonical', url()->current())">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <meta name="author" content="Páginas Web Creativas">
    <meta name="language" content="es-MX">
    @yield('meta_keywords')

    {{-- ===== OPEN GRAPH ===== --}}
    <meta property="og:locale"    content="es_MX">
    <meta property="og:site_name" content="Páginas Web Creativas">
    <meta property="og:type"      content="@yield('og_type', 'website')">
    <meta property="og:title"     content="@yield('title', 'Blog | Páginas Web Creativas')">
    <meta property="og:description" content="@yield('meta_description', 'Artículos sobre desarrollo web, Laravel, React y SEO.')">
    <meta property="og:url"       content="@yield('canonical', url()->current())">
    <meta property="og:image"     content="@yield('og_image', asset('images/og-paginaswebcreativas.jpg'))">
    <meta property="og:image:width"  content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt"    content="@yield('og_image_alt', 'Páginas Web Creativas')">

    {{-- ===== TWITTER CARD ===== --}}
    <meta name="twitter:card"        content="summary_large_image">
    <meta name="twitter:title"       content="@yield('title', 'Blog | Páginas Web Creativas')">
    <meta name="twitter:description" content="@yield('meta_description', 'Artículos sobre desarrollo web, Laravel, React y SEO.')">
    <meta name="twitter:image"       content="@yield('og_image', asset('images/og-paginaswebcreativas.jpg'))">

    {{-- ===== ARTICLE DATES (solo artículos) ===== --}}
    @hasSection('article_published')
    <meta property="article:published_time" content="@yield('article_published')">
    @endif

    {{-- ===== SCHEMA JSON-LD ===== --}}
    @yield('schema_ld')

    {{-- ===== FAVICONS ===== --}}
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="manifest" href="/site.webmanifest">

    {{-- ===== RSS ===== --}}
    <link rel="alternate" type="application/rss+xml" title="Blog | Páginas Web Creativas" href="https://paginaswebcreativas.com/blog/rss.xml">

    {{-- ===== PRELOAD FONT ===== --}}
    <link rel="preload" href="/fonts/Outfit-Variable.woff2" as="font" type="font/woff2" crossorigin>

    {{-- ===== CSS (Vite — solo CSS, sin JS de React/Inertia) ===== --}}
    @vite('resources/css/app.css')

    {{-- ===== ESTILOS TIPOGRAFÍA ARTÍCULO ===== --}}
    <style>
        :root {
            --blue: #0090ff;
            --bg: #0c1222;
            --bg-card: #141d2f;
            --bg-card-hover: #1a2540;
            --text: #e8edf4;
            --text-muted: #94a3b8;
            --text-dim: #64748b;
            --border: rgba(255, 255, 255, 0.08);
        }

        /* NAV */
        .be-nav {
            position: sticky;
            top: 0;
            z-index: 50;
            background: rgba(12, 18, 34, 0.85);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border-bottom: 1px solid var(--border);
        }
        .be-nav-inner {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1.25rem;
            height: 64px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
        }
        .be-nav-logo {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            text-decoration: none;
            font-weight: 700;
            font-size: 1.05rem;
            color: var(--text);
        }
        .be-nav-logo img { height: 32px; width: auto; }
        .be-nav-links {
            display: flex;
            align-items: center;
            gap: 0.25rem;
            list-style: none;
            margin: 0;
            padding: 0;
        }
        .be-nav-links a {
            color: var(--text-muted);
            text-decoration: none;
            font-size: 0.9rem;
            font-weight: 500;
            padding: 0.4rem 0.85rem;
            border-radius: 8px;
            transition: color 0.2s, background 0.2s;
        }
        .be-nav-links a:hover,
        .be-nav-links a.active { color: var(--text); background: rgba(255,255,255,.06); }
        .be-nav-cta {
            background: var(--blue);
            color: #fff !important;
            border-radius: 8px;
            padding: 0.4rem 1rem !important;
            transition: opacity 0.2s !important;
        }
        .be-nav-cta:hover { opacity: 0.85; background: var(--blue) !important; }
        @media(max-width:768px){
            .be-nav-links { display: none; }
        }

        /* LAYOUT SHELL */
        .be-body {
            background: var(--bg);
            color: var(--text);
            font-family: 'Outfit Variable', 'Outfit', system-ui, sans-serif;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }
        .be-main { flex: 1; }

        /* FOOTER */
        .be-footer {
            border-top: 1px solid var(--border);
            padding: 2.5rem 1.25rem;
            text-align: center;
            color: var(--text-dim);
            font-size: 0.875rem;
        }
        .be-footer a { color: var(--text-muted); text-decoration: none; }
        .be-footer a:hover { color: var(--blue); }

        /* CONTENIDO DEL ARTÍCULO (tipografía) */
        .be-article-content h1,
        .be-article-content h2,
        .be-article-content h3,
        .be-article-content h4 {
            color: var(--text);
            font-weight: 700;
            line-height: 1.3;
            margin: 2rem 0 1rem;
        }
        .be-article-content h2 { font-size: 1.5rem; }
        .be-article-content h3 { font-size: 1.25rem; }
        .be-article-content h4 { font-size: 1.1rem; }
        .be-article-content p  { margin: 0 0 1.25rem; color: var(--text-muted); line-height: 1.8; }
        .be-article-content ul,
        .be-article-content ol {
            padding-left: 1.5rem;
            margin: 0 0 1.25rem;
            color: var(--text-muted);
            line-height: 1.8;
        }
        .be-article-content li  { margin-bottom: 0.4rem; }
        .be-article-content a   { color: var(--blue); text-decoration: underline; }
        .be-article-content a:hover { opacity: 0.8; }
        .be-article-content strong { color: var(--text); font-weight: 700; }
        .be-article-content em { font-style: italic; }
        .be-article-content blockquote {
            border-left: 3px solid var(--blue);
            background: var(--bg-card);
            margin: 1.5rem 0;
            padding: 1rem 1.25rem;
            border-radius: 0 8px 8px 0;
            color: var(--text-muted);
        }
        .be-article-content pre,
        .be-article-content code {
            background: rgba(0,0,0,.4);
            border-radius: 6px;
            font-family: 'Fira Code', 'Consolas', monospace;
            font-size: 0.875rem;
        }
        .be-article-content pre  { padding: 1.25rem; overflow-x: auto; margin: 1.5rem 0; }
        .be-article-content code { padding: 0.1rem 0.35rem; }
        .be-article-content img {
            max-width: 100%;
            height: auto;
            border-radius: 10px;
            margin: 1.5rem 0;
        }
        .be-article-content table {
            width: 100%;
            border-collapse: collapse;
            margin: 1.5rem 0;
            font-size: 0.9rem;
            color: var(--text-muted);
        }
        .be-article-content th {
            background: var(--bg-card);
            color: var(--text);
            padding: 0.6rem 1rem;
            text-align: left;
            border: 1px solid var(--border);
        }
        .be-article-content td {
            padding: 0.55rem 1rem;
            border: 1px solid var(--border);
        }
        .be-article-content tr:nth-child(even) td {
            background: rgba(255,255,255,.02);
        }
        .be-article-content hr {
            border: none;
            border-top: 1px solid var(--border);
            margin: 2rem 0;
        }
    </style>
</head>
<body class="be-body">

    {{-- NAV --}}
    <header class="be-nav">
        <nav class="be-nav-inner">
            <a href="/" class="be-nav-logo">
                <img src="/images/logo.svg" alt="Páginas Web Creativas" onerror="this.style.display='none'">
                <span>Páginas Web Creativas</span>
            </a>
            <ul class="be-nav-links">
                <li><a href="/servicios">Servicios</a></li>
                <li><a href="/portafolio">Portafolio</a></li>
                <li><a href="/blog" class="{{ request()->is('blog*') ? 'active' : '' }}">Blog</a></li>
                <li><a href="/herramientas">Herramientas</a></li>
                <li><a href="/precios">Precios</a></li>
                <li><a href="/contacto" class="be-nav-cta">Cotizar <span aria-hidden="true">→</span></a></li>
            </ul>
        </nav>
    </header>

    {{-- CONTENIDO PRINCIPAL --}}
    <main class="be-main">
        @yield('content')
    </main>

    {{-- FOOTER --}}
    <footer class="be-footer">
        <p>
            © {{ date('Y') }} <a href="/">Páginas Web Creativas</a> · 
            <a href="/blog">Blog</a> · 
            <a href="/blog/sitemap.xml">Sitemap</a> · 
            <a href="/blog/rss.xml">RSS</a> · 
            <a href="/privacidad">Privacidad</a>
        </p>
    </footer>

</body>
</html>
