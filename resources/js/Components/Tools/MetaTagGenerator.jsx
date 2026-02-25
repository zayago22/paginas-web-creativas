import { useState } from 'react';

function buildMetaTags({ title, desc, url, image, type, siteName, twitterHandle }) {
    const lines = [
        `<!-- Primary Meta Tags -->`,
        `<title>${title}</title>`,
        `<meta name="title" content="${title}" />`,
        `<meta name="description" content="${desc}" />`,
        url ? `<link rel="canonical" href="${url}" />` : null,
        ``,
        `<!-- Open Graph / Facebook -->`,
        `<meta property="og:type" content="${type}" />`,
        `<meta property="og:title" content="${title}" />`,
        `<meta property="og:description" content="${desc}" />`,
        url ? `<meta property="og:url" content="${url}" />` : null,
        siteName ? `<meta property="og:site_name" content="${siteName}" />` : null,
        image ? `<meta property="og:image" content="${image}" />` : null,
        image ? `<meta property="og:image:width" content="1200" />` : null,
        image ? `<meta property="og:image:height" content="630" />` : null,
        ``,
        `<!-- Twitter -->`,
        `<meta name="twitter:card" content="summary_large_image" />`,
        `<meta name="twitter:title" content="${title}" />`,
        `<meta name="twitter:description" content="${desc}" />`,
        twitterHandle ? `<meta name="twitter:site" content="@${twitterHandle.replace('@', '')}" />` : null,
        image ? `<meta name="twitter:image" content="${image}" />` : null,
    ].filter(l => l !== null);
    return lines.join('\n');
}

const TITLE_MAX = 60;
const DESC_MAX = 160;

function Counter({ val, max, warn = 0.85 }) {
    const pct = val / max;
    const color = pct > 1 ? '#ff4757' : pct > warn ? '#feca57' : '#00e4b8';
    return (
        <span className="text-xs font-semibold ml-2" style={{ color }}>
            {val}/{max}
        </span>
    );
}

export default function MetaTagGenerator() {
    const [title, setTitle]= useState('Mi Página Web | Sitio Oficial');
    const [desc, setDesc] = useState('Descripción de mi página web para SEO y redes sociales. Máximo 160 caracteres.');
    const [url, setUrl] = useState('https://ejemplo.com');
    const [image, setImage] = useState('https://ejemplo.com/og-image.jpg');
    const [type, setType] = useState('website');
    const [siteName, setSiteName] = useState('Mi Sitio Web');
    const [twitterHandle, setTwitterHandle] = useState('');
    const [copied, setCopied] = useState(false);

    const code = buildMetaTags({ title, desc, url, image, type, siteName, twitterHandle });

    const copy = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const domainDisplay = url ? (() => { try { return new URL(url).hostname; } catch { return url; } })() : 'ejemplo.com';
    const displayTitle = title || 'Título de la Página';
    const displayDesc = desc || 'Descripción de la página...';
    const displayImage = image || null;

    return (
        <div className="max-w-[900px] mx-auto px-6 py-16">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-extrabold mb-2">
                    🏷️ Generador de <span className="bg-gradient-to-r from-[#0090ff] to-[#00bfff] bg-clip-text text-transparent">Meta Tags</span>
                </h1>
                <p className="text-[#8899aa]">Genera todas las meta tags HTML para SEO y redes sociales. Preview en tiempo real.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Form */}
                <div className="space-y-4">
                    <div className="bg-[#0d1117] border border-white/[0.06] rounded-2xl p-5 space-y-4">
                        <p className="text-xs font-bold uppercase tracking-widest text-[#5a6a7a]">Información Principal</p>
                        <div>
                            <label className="text-sm text-[#8899aa] mb-1.5 flex items-center">
                                Título <Counter val={title.length} max={TITLE_MAX} />
                            </label>
                            <input
                                value={title} onChange={e => setTitle(e.target.value)}
                                maxLength={100}
                                className="w-full bg-black/30 border border-white/[0.06] rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#5a6a7a] focus:outline-none focus:border-[#0090ff]/30"
                                placeholder="Título de tu página (máx 60 chars)"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-[#8899aa] mb-1.5 flex items-center">
                                Descripción <Counter val={desc.length} max={DESC_MAX} />
                            </label>
                            <textarea
                                value={desc} onChange={e => setDesc(e.target.value)}
                                maxLength={200} rows={3}
                                className="w-full bg-black/30 border border-white/[0.06] rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#5a6a7a] focus:outline-none focus:border-[#0090ff]/30 resize-none"
                                placeholder="Descripción para SEO (máx 160 chars)"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-[#8899aa] mb-1.5 block">URL Canónica</label>
                            <input
                                value={url} onChange={e => setUrl(e.target.value)}
                                className="w-full bg-black/30 border border-white/[0.06] rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#5a6a7a] focus:outline-none focus:border-[#0090ff]/30"
                                placeholder="https://tu-sitio.com"
                            />
                        </div>
                    </div>

                    <div className="bg-[#0d1117] border border-white/[0.06] rounded-2xl p-5 space-y-4">
                        <p className="text-xs font-bold uppercase tracking-widest text-[#5a6a7a]">Open Graph & Twitter</p>
                        <div>
                            <label className="text-sm text-[#8899aa] mb-1.5 block">Imagen OG (URL)</label>
                            <input
                                value={image} onChange={e => setImage(e.target.value)}
                                className="w-full bg-black/30 border border-white/[0.06] rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#5a6a7a] focus:outline-none focus:border-[#0090ff]/30"
                                placeholder="https://tu-sitio.com/og-image.jpg"
                            />
                            <p className="text-xs text-[#5a6a7a] mt-1">Recomendado: 1200×630px</p>
                        </div>
                        <div>
                            <label className="text-sm text-[#8899aa] mb-1.5 block">Tipo</label>
                            <div className="flex gap-2">
                                {['website', 'article', 'product'].map(t => (
                                    <button
                                        key={t}
                                        onClick={() => setType(t)}
                                        className={`flex-1 py-2 rounded-lg text-xs font-semibold transition border ${type === t ? 'bg-[#0090ff]/10 border-[#0090ff]/30 text-[#0090ff]' : 'border-white/[0.06] text-[#8899aa]'}`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="text-sm text-[#8899aa] mb-1.5 block">Nombre del sitio</label>
                            <input
                                value={siteName} onChange={e => setSiteName(e.target.value)}
                                className="w-full bg-black/30 border border-white/[0.06] rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#5a6a7a] focus:outline-none focus:border-[#0090ff]/30"
                                placeholder="Mi Sitio Web"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-[#8899aa] mb-1.5 block">Twitter Handle (sin @)</label>
                            <input
                                value={twitterHandle} onChange={e => setTwitterHandle(e.target.value)}
                                className="w-full bg-black/30 border border-white/[0.06] rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#5a6a7a] focus:outline-none focus:border-[#0090ff]/30"
                                placeholder="mi_handle"
                            />
                        </div>
                    </div>
                </div>

                {/* Previews */}
                <div className="space-y-4">
                    {/* Google preview */}
                    <div className="bg-[#0d1117] border border-white/[0.06] rounded-2xl p-5">
                        <p className="text-xs font-bold uppercase tracking-widest text-[#5a6a7a] mb-3">🔍 Vista en Google</p>
                        <div className="bg-white rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-1">
                                <div className="w-4 h-4 rounded-full bg-gray-200" />
                                <span className="text-xs text-gray-600">{domainDisplay}</span>
                            </div>
                            <div className="text-blue-700 text-base font-medium leading-snug mb-1 line-clamp-2">{displayTitle}</div>
                            <div className="text-gray-600 text-sm leading-relaxed line-clamp-2">{displayDesc}</div>
                        </div>
                    </div>

                    {/* Facebook/OG preview */}
                    <div className="bg-[#0d1117] border border-white/[0.06] rounded-2xl p-5">
                        <p className="text-xs font-bold uppercase tracking-widest text-[#5a6a7a] mb-3">📘 Vista en Facebook</p>
                        <div className="rounded-xl overflow-hidden border border-gray-700">
                            <div className="w-full h-32 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                                {displayImage
                                    ? <img src={displayImage} alt="" className="w-full h-full object-cover" onError={e => { e.target.style.display='none'; }} />
                                    : <span className="text-gray-500 text-xs">Imagen OG (1200×630)</span>
                                }
                            </div>
                            <div className="bg-[#1c1e21] px-3 py-2">
                                <p className="text-xs text-[#b0b3b8] uppercase">{domainDisplay}</p>
                                <p className="text-white text-sm font-semibold line-clamp-1">{displayTitle}</p>
                                <p className="text-[#b0b3b8] text-xs line-clamp-2">{displayDesc}</p>
                            </div>
                        </div>
                    </div>

                    {/* WhatsApp preview */}
                    <div className="bg-[#0d1117] border border-white/[0.06] rounded-2xl p-5">
                        <p className="text-xs font-bold uppercase tracking-widest text-[#5a6a7a] mb-3">💬 Vista en WhatsApp</p>
                        <div className="bg-[#1f2c33] rounded-xl p-3 border-l-4 border-[#25d366]">
                            {displayImage && <div className="w-full h-24 rounded-lg overflow-hidden mb-2 bg-gray-700"><img src={displayImage} alt="" className="w-full h-full object-cover" onError={e => { e.target.style.display='none'; }} /></div>}
                            <p className="text-[#25d366] font-semibold text-sm line-clamp-1">{displayTitle}</p>
                            <p className="text-[#8696a0] text-xs line-clamp-2">{displayDesc}</p>
                            <p className="text-[#8696a0] text-xs mt-1">{domainDisplay}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Code output */}
            <div className="bg-[#0d1117] border border-white/[0.06] rounded-2xl p-5 mt-6">
                <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-bold uppercase tracking-widest text-[#5a6a7a]">HTML Generado</p>
                    <button
                        onClick={copy}
                        className={`text-xs px-4 py-1.5 rounded-lg font-semibold transition ${copied ? 'bg-[#00e4b8]/10 border border-[#00e4b8]/30 text-[#00e4b8]' : 'bg-gradient-to-r from-[#0090ff] to-[#00bfff] text-white'}`}
                    >
                        {copied ? '✓ Copiado' : '📋 Copiar HTML'}
                    </button>
                </div>
                <pre className="font-mono text-xs text-[#00e4b8] bg-black/30 rounded-xl px-4 py-3 overflow-x-auto whitespace-pre">{code}</pre>
            </div>
        </div>
    );
}
