@extends('blogengine.layout')

{{-- ===== SEO ===== --}}
@section('title', $meta['title'])
@section('meta_description', $meta['description'])
@section('canonical', $meta['canonical'])
@section('og_type', $meta['og_type'])
@section('og_image', $meta['og_image'])
@section('og_image_alt', $meta['og_image_alt'] ?? ($post['titulo'] ?? ''))

@if(!empty($meta['keywords']))
@section('meta_keywords')
<meta name="keywords" content="{{ $meta['keywords'] }}">
@endsection
@endif

@if(!empty($meta['date']))
@section('article_published', $meta['date'])
@endif

@section('schema_ld')
<script type="application/ld+json">
{!! json_encode($schema, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) !!}
</script>
@endsection

{{-- ===== CONTENIDO ===== --}}
@section('content')
<article style="max-width: 800px; margin: 0 auto; padding: 3.5rem 1.25rem 5rem;">

    {{-- Breadcrumb --}}
    <nav style="margin-bottom: 2rem; font-size: 0.8rem; color: var(--text-dim);">
        <a href="/" style="color: var(--text-dim); text-decoration: none;">Inicio</a>
        <span style="margin: 0 0.4rem;">›</span>
        <a href="/blog" style="color: var(--text-dim); text-decoration: none;">Blog</a>
        <span style="margin: 0 0.4rem;">›</span>
        <span style="color: var(--text-muted);">{{ Str::limit($post['titulo'] ?? '', 50) }}</span>
    </nav>

    {{-- Keyword badge --}}
    @if(!empty($post['keyword']))
    <span style="
        font-size: 0.7rem;
        font-weight: 600;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--blue);
        background: rgba(0,144,255,.12);
        padding: 0.25rem 0.65rem;
        border-radius: 999px;
        display: inline-block;
        margin-bottom: 1.25rem;
    ">{{ $post['keyword'] }}</span>
    @endif

    {{-- Título --}}
    <h1 style="
        font-size: clamp(1.75rem, 4vw, 2.5rem);
        font-weight: 800;
        line-height: 1.2;
        color: var(--text);
        margin: 0 0 1.25rem;
    ">{{ $post['titulo'] ?? '' }}</h1>

    {{-- Meta: fecha + tags --}}
    <div style="
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 1rem;
        margin-bottom: 2.5rem;
        padding-bottom: 2rem;
        border-bottom: 1px solid var(--border);
    ">
        @if(!empty($meta['date']))
        <time
            datetime="{{ $meta['date'] }}"
            style="font-size: 0.875rem; color: var(--text-dim); display:flex; align-items:center; gap:.4rem;"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
            {{ \Carbon\Carbon::parse($meta['date'])->locale('es')->isoFormat('D [de] MMMM [de] YYYY') }}
        </time>
        @endif

        @if(!empty($post['tags']) && is_array($post['tags']))
            @foreach($post['tags'] as $tag)
            <span style="
                font-size: 0.7rem;
                color: var(--text-muted);
                background: rgba(255,255,255,.06);
                padding: 0.2rem 0.6rem;
                border-radius: 999px;
                border: 1px solid var(--border);
            ">#{{ $tag }}</span>
            @endforeach
        @endif
    </div>

    {{-- Imagen destacada --}}
    @if(!empty($post['imagen_destacada_url']))
    <figure style="margin: 0 0 2.5rem;">
        <img
            src="{{ $post['imagen_destacada_url'] }}"
            alt="{{ $post['imagen_destacada_alt'] ?? ($post['titulo'] ?? '') }}"
            style="
                width: 100%;
                height: auto;
                max-height: 480px;
                object-fit: cover;
                border-radius: 14px;
                display: block;
            "
        >
        @if(!empty($post['imagen_destacada_alt']))
        <figcaption style="text-align:center; font-size:0.8rem; color:var(--text-dim); margin-top:0.5rem;">
            {{ $post['imagen_destacada_alt'] }}
        </figcaption>
        @endif
    </figure>
    @endif

    {{-- Extracto destacado --}}
    @if(!empty($post['extracto']))
    <p style="
        font-size: 1.125rem;
        font-weight: 500;
        color: var(--text-muted);
        line-height: 1.75;
        border-left: 3px solid var(--blue);
        padding-left: 1.25rem;
        margin: 0 0 2.5rem;
    ">{{ $post['extracto'] }}</p>
    @endif

    {{-- Cuerpo del artículo --}}
    <div class="be-article-content">
        {!! $post['contenido_html'] ?? '<p>Contenido no disponible.</p>' !!}
    </div>

    {{-- Autor / CTA --}}
    <div style="
        margin-top: 3.5rem;
        padding: 2rem;
        background: var(--bg-card);
        border: 1px solid var(--border);
        border-radius: 14px;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    ">
        <p style="font-size: 0.9rem; color: var(--text-muted); margin: 0; line-height: 1.6;">
            Escrito por <strong style="color: var(--text);">Páginas Web Creativas</strong> —
            agencia de desarrollo web especializada en Laravel, React y SEO en México.
        </p>
        <a href="/contacto" style="
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: var(--blue);
            color: #fff;
            font-weight: 600;
            font-size: 0.9rem;
            padding: 0.6rem 1.25rem;
            border-radius: 8px;
            text-decoration: none;
            align-self: flex-start;
            transition: opacity .2s;
        "
        onmouseenter="this.style.opacity='.85'"
        onmouseleave="this.style.opacity='1'"
        >Cotizar proyecto →</a>
    </div>

    {{-- Volver al blog --}}
    <div style="margin-top: 2.5rem;">
        <a href="/blog" style="
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            font-size: 0.875rem;
            color: var(--text-muted);
            text-decoration: none;
            transition: color .2s;
        "
        onmouseenter="this.style.color='var(--blue)'"
        onmouseleave="this.style.color='var(--text-muted)'"
        >← Volver al blog</a>
    </div>

</article>
@endsection
