import { useState, useRef, useCallback } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const SIZES = [
    { name: 'favicon-16x16.png', size: 16, label: '16×16' },
    { name: 'favicon-32x32.png', size: 32, label: '32×32' },
    { name: 'favicon-48x48.png', size: 48, label: '48×48' },
    { name: 'apple-touch-icon.png', size: 180, label: '180×180 (Apple)' },
    { name: 'android-chrome-192x192.png', size: 192, label: '192×192 (Android)' },
    { name: 'android-chrome-512x512.png', size: 512, label: '512×512 (Android)' },
];

async function resizeImage(imgEl, size) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(imgEl, 0, 0, size, size);
    return new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
}

async function generateICO(imgEl) {
    // Build a simple ICO with 16x16, 32x32, 48x48 PNG frames
    // ICO format: ICONDIR + ICONDIRENTRY * n + PNG data * n
    const sizes = [16, 32, 48];
    const blobs = await Promise.all(sizes.map(s => resizeImage(imgEl, s)));
    const bufs = await Promise.all(blobs.map(b => b.arrayBuffer()));

    const ICONDIR_SIZE = 6;
    const ICONDIRENTRY_SIZE = 16;
    const headerSize = ICONDIR_SIZE + ICONDIRENTRY_SIZE * sizes.length;
    const totalSize = headerSize + bufs.reduce((a, b) => a + b.byteLength, 0);
    const ico = new DataView(new ArrayBuffer(totalSize));

    // ICONDIR
    ico.setUint16(0, 0, true);      // reserved
    ico.setUint16(2, 1, true);      // type: ICO
    ico.setUint16(4, sizes.length, true); // count

    let offset = headerSize;
    bufs.forEach((buf, i) => {
        const s = sizes[i];
        ico.setUint8(ICONDIR_SIZE + i * ICONDIRENTRY_SIZE + 0, s === 256 ? 0 : s); // width
        ico.setUint8(ICONDIR_SIZE + i * ICONDIRENTRY_SIZE + 1, s === 256 ? 0 : s); // height
        ico.setUint8(ICONDIR_SIZE + i * ICONDIRENTRY_SIZE + 2, 0); // color count
        ico.setUint8(ICONDIR_SIZE + i * ICONDIRENTRY_SIZE + 3, 0); // reserved
        ico.setUint16(ICONDIR_SIZE + i * ICONDIRENTRY_SIZE + 4, 1, true); // planes
        ico.setUint16(ICONDIR_SIZE + i * ICONDIRENTRY_SIZE + 6, 32, true); // bit count
        ico.setUint32(ICONDIR_SIZE + i * ICONDIRENTRY_SIZE + 8, buf.byteLength, true); // size
        ico.setUint32(ICONDIR_SIZE + i * ICONDIRENTRY_SIZE + 12, offset, true); // offset
        new Uint8Array(ico.buffer).set(new Uint8Array(buf), offset);
        offset += buf.byteLength;
    });

    return new Blob([ico.buffer], { type: 'image/x-icon' });
}

function generateManifest(name) {
    return JSON.stringify({
        name: name || 'My App',
        short_name: name || 'App',
        icons: [
            { src: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
            { src: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
        ],
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
    }, null, 2);
}

function generateHTMLSnippet() {
    return `<link rel="icon" type="image/x-icon" href="/favicon.ico" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />`;
}

export default function FaviconGenerator() {
    const [imgEl, setImgEl] = useState(null);
    const [preview, setPreview] = useState(null);
    const [appName, setAppName] = useState('Mi App');
    const [generating, setGenerating] = useState(false);
    const [done, setDone] = useState(false);
    const [copied, setCopied] = useState(false);
    const inputRef = useRef(null);
    const dropRef = useRef(null);

    const handleFile = useCallback((file) => {
        if (!file || !file.type.startsWith('image/')) return;
        const reader = new FileReader();
        reader.onload = e => {
            const img = new Image();
            img.onload = () => {
                setImgEl(img);
                setPreview(e.target.result);
                setDone(false);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }, []);

    const generate = async () => {
        if (!imgEl) return;
        setGenerating(true);
        try {
            const zip = new JSZip();
            // PNG sizes
            for (const { name, size } of SIZES) {
                const blob = await resizeImage(imgEl, size);
                zip.file(name, blob);
            }
            // ICO
            const icoBlob = await generateICO(imgEl);
            zip.file('favicon.ico', icoBlob);
            // manifest
            zip.file('site.webmanifest', generateManifest(appName));

            const zipBlob = await zip.generateAsync({ type: 'blob' });
            saveAs(zipBlob, 'favicons.zip');
            setDone(true);
        } finally {
            setGenerating(false);
        }
    };

    const copyHTML = async () => {
        await navigator.clipboard.writeText(generateHTMLSnippet());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-[800px] mx-auto px-6 py-16">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-extrabold mb-2">
                    ⭐ Generador de <span className="bg-gradient-to-r from-[#feca57] to-[#ff6b6b] bg-clip-text text-transparent">Favicon</span>
                </h1>
                <p className="text-[#8899aa]">Genera todos los favicons para tu web desde una sola imagen. ZIP listo para usar.</p>
            </div>

            {!preview ? (
                <div
                    ref={dropRef}
                    onClick={() => inputRef.current?.click()}
                    onDragOver={e => { e.preventDefault(); dropRef.current?.classList.add('border-[#feca57]', 'bg-[#feca57]/5'); }}
                    onDragLeave={() => dropRef.current?.classList.remove('border-[#feca57]', 'bg-[#feca57]/5')}
                    onDrop={e => { e.preventDefault(); dropRef.current?.classList.remove('border-[#feca57]', 'bg-[#feca57]/5'); handleFile(e.dataTransfer.files[0]); }}
                    className="border-2 border-dashed border-[#feca57]/20 rounded-2xl p-20 text-center cursor-pointer hover:border-[#feca57]/40 hover:bg-[#feca57]/3 transition-all"
                >
                    <div className="text-5xl mb-4 opacity-50">⭐</div>
                    <h3 className="text-lg font-bold mb-2">Arrastra tu imagen aquí</h3>
                    <p className="text-[#8899aa] text-sm mb-6">Idealmente cuadrada. JPG, PNG, SVG, WebP.</p>
                    <button className="px-8 py-3 rounded-full bg-gradient-to-r from-[#feca57] to-[#ff6b6b] text-[#0d1117] font-semibold text-sm hover:shadow-[0_6px_25px_rgba(254,202,87,.3)] transition-all">
                        Seleccionar Imagen
                    </button>
                    <input ref={inputRef} type="file" accept="image/*" hidden onChange={e => handleFile(e.target.files[0])} />
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Image name input */}
                    <div className="bg-[#0d1117] border border-white/[0.06] rounded-2xl p-5">
                        <label className="text-sm text-[#8899aa] mb-2 block">Nombre de la app (para site.webmanifest)</label>
                        <input
                            value={appName} onChange={e => setAppName(e.target.value)}
                            className="w-full bg-black/30 border border-white/[0.06] rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#5a6a7a] focus:outline-none focus:border-[#feca57]/30"
                            placeholder="Mi App"
                        />
                    </div>

                    {/* Preview sizes */}
                    <div className="bg-[#0d1117] border border-white/[0.06] rounded-2xl p-5">
                        <p className="text-xs font-bold uppercase tracking-widest text-[#5a6a7a] mb-4">Preview de tamaños</p>
                        <div className="flex items-end gap-4 flex-wrap">
                            {[16, 32, 48, 64, 128].map(size => (
                                <div key={size} className="flex flex-col items-center gap-2">
                                    <div className="rounded border border-white/10 overflow-hidden flex-shrink-0" style={{ width: size < 48 ? 48 : size, height: size < 48 ? 48 : size }}>
                                        <img src={preview} alt="" className="w-full h-full object-contain" />
                                    </div>
                                    <span className="text-xs text-[#5a6a7a]">{size}px</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Files that will be generated */}
                    <div className="bg-[#0d1117] border border-white/[0.06] rounded-2xl p-5">
                        <p className="text-xs font-bold uppercase tracking-widest text-[#5a6a7a] mb-4">Archivos generados</p>
                        <div className="grid sm:grid-cols-2 gap-2">
                            {[...SIZES, { name: 'favicon.ico', size: null, label: '16, 32, 48px (ICO)' }, { name: 'site.webmanifest', size: null, label: 'Manifest JSON' }].map(({ name, label }) => (
                                <div key={name} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                                    <span className="text-[#00e4b8] text-xs">✓</span>
                                    <div>
                                        <p className="text-xs font-mono font-semibold">{name}</p>
                                        <p className="text-[.65rem] text-[#5a6a7a]">{label}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={() => { setPreview(null); setImgEl(null); setDone(false); }}
                            className="flex-1 py-3 rounded-xl border border-white/[0.06] text-sm text-[#8899aa] hover:border-white/10 transition"
                        >
                            Cambiar imagen
                        </button>
                        <button
                            onClick={generate}
                            disabled={generating}
                            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#feca57] to-[#ff6b6b] text-[#0d1117] font-bold text-sm hover:shadow-[0_8px_30px_rgba(254,202,87,.3)] transition-all disabled:opacity-50"
                        >
                            {generating ? '⏳ Generando...' : done ? '✓ Descargar de nuevo' : '⬇ Generar y Descargar ZIP'}
                        </button>
                    </div>

                    {/* HTML Snippet */}
                    <div className="bg-[#0d1117] border border-white/[0.06] rounded-2xl p-5">
                        <div className="flex items-center justify-between mb-3">
                            <p className="text-xs font-bold uppercase tracking-widest text-[#5a6a7a]">Código HTML para tu {'<head>'}</p>
                            <button
                                onClick={copyHTML}
                                className={`text-xs px-4 py-1.5 rounded-lg font-semibold transition ${copied ? 'bg-[#00e4b8]/10 border border-[#00e4b8]/30 text-[#00e4b8]' : 'bg-gradient-to-r from-[#0090ff] to-[#00bfff] text-white'}`}
                            >
                                {copied ? '✓ Copiado' : '📋 Copiar HTML'}
                            </button>
                        </div>
                        <pre className="font-mono text-xs text-[#00e4b8] bg-black/30 rounded-xl px-4 py-3 overflow-x-auto whitespace-pre">{generateHTMLSnippet()}</pre>
                    </div>
                </div>
            )}
        </div>
    );
}
