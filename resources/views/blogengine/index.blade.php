@extends('blogengine.layout')

{{-- ===== SEO ===== --}}
@section('title', $meta['title'])
@section('meta_description', $meta['description'])
@section('canonical', $meta['canonical'])
@section('og_type', $meta['og_type'])
@section('og_image', $meta['og_image'])
@section('og_image_alt', 'Blog de Páginas Web Creativas')

@section('schema_ld')
<script type="application/ld+json">
{
    "@@context": "https://schema.org",
    "@@type": "Blog",
    "name": "Blog | Páginas Web Creativas",
    "description": "{{ $meta['description'] }}",
    "url": "{{ $meta['canonical'] }}",
    "publisher": {
        "@type": "Organization",
        "name": "Páginas Web Creativas",
        "url": "https://paginaswebcreativas.com",
        "logo": {
            "@type": "ImageObject",
            "url": "https://paginaswebcreativas.com/images/logo.svg"
        }
    }
}
</script>
@endsection

{{-- ===== CONTENIDO ===== --}}
@section('content')
<div style="
    max-width: 1200px;
    margin: 0 auto;
    padding: 4rem 1.25rem 5rem;
">

    {{-- Encabezado --}}
    <div style="margin-bottom: 3rem; max-width: 640px;">
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
        ">Contenido</p>
        <h1 style="
            font-size: clamp(2rem, 4vw, 2.75rem);
            font-weight: 800;
            line-height: 1.15;
            color: var(--text);
            margin: 0 0 1rem;
        ">Blog de Desarrollo Web</h1>
        <p style="
            font-size: 1.1rem;
            color: var(--text-muted);
            line-height: 1.7;
            margin: 0;
        ">Artículos sobre Laravel, React, Inertia.js, SEO y marketing digital para crecer tu negocio online.</p>
    </div>

    {{-- Grid de artículos --}}
    <div style="
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
        gap: 1.75rem;
    ">
    @forelse($posts as $post)
    <article style="
        display: flex;
        flex-direction: column;
        background: var(--bg-card);
        border: 1px solid var(--border);
        border-radius: 16px;
        overflow: hidden;
        transition: border-color .2s, box-shadow .2s;
    "
    onmouseenter="this.style.borderColor='rgba(0,144,255,.35)'; this.style.boxShadow='0 8px 30px rgba(0,144,255,.08)';"
    onmouseleave="this.style.borderColor='var(--border)'; this.style.boxShadow='none';"
    >
        @if(!empty($post['imagen_destacada_url']))
        <a href="/blog/{{ $post['slug'] }}" style="display:block; overflow:hidden; aspect-ratio: 16/9;">
            <img
                src="{{ $post['imagen_destacada_url'] }}"
                alt="{{ $post['imagen_destacada_alt'] ?? $post['titulo'] }}"
                loading="lazy"
                style="width:100%; height:100%; object-fit:cover; transition: transform .4s ease; display:block;"
                onmouseenter="this.style.transform='scale(1.03)'"
                onmouseleave="this.style.transform='scale(1)'"
            >
        </a>
        @endif

        <div style="padding: 1.5rem; display:flex; flex-direction:column; flex:1;">
            @if(!empty($post['keyword']))
            <span style="
                font-size: 0.7rem;
                font-weight: 600;
                letter-spacing: 0.08em;
                text-transform: uppercase;
                color: var(--blue);
                background: rgba(0,144,255,.1);
                padding: 0.2rem 0.6rem;
                border-radius: 999px;
                display: inline-block;
                margin-bottom: 0.9rem;
            ">{{ $post['keyword'] }}</span>
            @endif

            <h2 style="
                font-size: 1.15rem;
                font-weight: 700;
                line-height: 1.3;
                margin: 0 0 0.75rem;
            ">
                <a href="/blog/{{ $post['slug'] }}" style="
                    color: var(--text);
                    text-decoration: none;
                    transition: color .2s;
                "
                onmouseenter="this.style.color='var(--blue)'"
                onmouseleave="this.style.color='var(--text)'"
                >{{ $post['titulo'] }}</a>
            </h2>

            @if(!empty($post['extracto']))
            <p style="
                color: var(--text-muted);
                font-size: 0.95rem;
                line-height: 1.7;
                margin: 0 0 1.25rem;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                overflow: hidden;
            ">{{ $post['extracto'] }}</p>
            @endif

            <div style="
                display: flex;
                align-items: center;
                justify-content: space-between;
                flex-wrap: wrap;
                gap: 0.75rem;
                margin-top: auto;
            ">
                @if(!empty($post['fecha_publicado']))
                <time
                    datetime="{{ $post['fecha_publicado'] }}"
                    style="font-size: 0.8rem; color: var(--text-dim);"
                >
                    {{ \Carbon\Carbon::parse($post['fecha_publicado'])->locale('es')->isoFormat('D [de] MMMM, YYYY') }}
                </time>
                @endif

                <a href="/blog/{{ $post['slug'] }}" style="
                    font-size: 0.875rem;
                    font-weight: 600;
                    color: var(--blue);
                    text-decoration: none;
                    display: inline-flex;
                    align-items: center;
                    gap: 0.3rem;
                    transition: gap .2s;
                "
                onmouseenter="this.style.gap='0.6rem'"
                onmouseleave="this.style.gap='0.3rem'"
                >Leer artículo <span aria-hidden="true">→</span></a>
            </div>
        </div>
    </article>
    @empty
    <div style="
        text-align: center;
        padding: 6rem 1rem;
        color: var(--text-dim);
        grid-column: 1 / -1;
    ">
        <p style="font-size: 1.1rem;">Próximamente publicaremos contenido aquí.</p>
        <a href="/" style="color: var(--blue); font-size: 0.9rem;">← Volver al inicio</a>
    </div>
    @endforelse
    </div>

</div>
@endsection
