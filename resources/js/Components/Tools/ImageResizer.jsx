import { useState, useRef, useCallback } from 'react';

const PRESETS = [
    { label: '800×600', w: 800, h: 600 },
    { label: '1280×720', w: 1280, h: 720 },
    { label: '1920×1080', w: 1920, h: 1080 },
    { label: '512×512', w: 512, h: 512 },
    { label: '256×256', w: 256, h: 256 },
];

function formatSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(2) + ' MB';
}

function resizeImage(file, newW, newH) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = newW; canvas.height = newH;
                const ctx = canvas.getContext('2d');
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = 'high';
                ctx.drawImage(img, 0, 0, newW, newH);
                canvas.toBlob((blob) => {
                    resolve({ name: file.name, originalSize: file.size, originalW: img.naturalWidth, originalH: img.naturalHeight, blob, url: URL.createObjectURL(blob) });
                }, 'image/jpeg', 0.92);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });
}

export default function ImageResizer() {
    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [width, setWidth]   = useState(800);
    const [height, setHeight] = useState(600);
    const [keepRatio, setKeepRatio] = useState(true);
    const [results, setResults] = useState([]);
    const [processing, setProcessing] = useState(false);
    const [ratioRef, setRatioRef] = useState(null);
    const inputRef = useRef(null);
    const dropRef  = useRef(null);

    const handleFiles = useCallback((fileList) => {
        const imgs = [...fileList].filter(f => f.type.startsWith('image/'));
        if (!imgs.length) return;
        setFiles(imgs); setResults([]);
        // Set initial dimensions from first image
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                setWidth(img.naturalWidth); setHeight(img.naturalHeight);
                setRatioRef(img.naturalWidth / img.naturalHeight);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(imgs[0]);
        setPreviews(imgs.map(f => URL.createObjectURL(f)));
    }, []);

    const onWidthChange = (val) => {
        const v = Math.max(1, parseInt(val) || 1);
        setWidth(v);
        if (keepRatio && ratioRef) setHeight(Math.round(v / ratioRef));
    };
    const onHeightChange = (val) => {
        const v = Math.max(1, parseInt(val) || 1);
        setHeight(v);
        if (keepRatio && ratioRef) setWidth(Math.round(v * ratioRef));
    };
    const applyPreset = (p) => { setWidth(p.w); setHeight(p.h); };

    const handleResize = async () => {
        setProcessing(true);
        const out = await Promise.all(files.map(f => resizeImage(f, width, height)));
        setResults(out);
        setProcessing(false);
    };

    const downloadOne = (r) => {
        const a = document.createElement('a');
        a.download = r.name.replace(/\.[^.]+$/, `-${width}x${height}.jpg`);
        a.href = r.url; a.click();
    };
    const downloadAll = () => results.forEach(downloadOne);

    if (!files.length) return (
        <div className="max-w-[900px] mx-auto px-6 py-16">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-extrabold mb-2">📐 Redimensionar <span className="bg-gradient-to-r from-[#0090ff] to-[#00e4b8] bg-clip-text text-transparent">Imágenes</span></h1>
                <p className="text-[#94a3b8]">Ajusta el tamaño de tus imágenes al instante. 100% privado.</p>
            </div>
            <div ref={dropRef} onClick={() => inputRef.current?.click()}
                 onDragOver={e => { e.preventDefault(); dropRef.current?.classList.add('border-[#0090ff]'); }}
                 onDragLeave={() => dropRef.current?.classList.remove('border-[#0090ff]')}
                 onDrop={e => { e.preventDefault(); dropRef.current?.classList.remove('border-[#0090ff]'); handleFiles(e.dataTransfer.files); }}
                 className="border-2 border-dashed border-[#0090ff]/20 rounded-2xl p-20 text-center cursor-pointer hover:border-[#0090ff]/40 hover:bg-[#0090ff]/3 transition-all">
                <div className="text-4xl mb-4 opacity-50">📐</div>
                <h3 className="text-lg font-bold mb-2">Arrastra tus imágenes aquí</h3>
                <p className="text-[#94a3b8] text-sm mb-6">JPG, PNG, WebP — múltiples imágenes</p>
                <button className="px-8 py-3 rounded-full bg-gradient-to-r from-[#0090ff] to-[#00bfff] text-white font-semibold text-sm">Seleccionar Imágenes</button>
                <input ref={inputRef} type="file" accept="image/*" multiple hidden onChange={e => handleFiles(e.target.files)} />
            </div>
        </div>
    );

    return (
        <div className="max-w-[900px] mx-auto px-6 py-16">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-extrabold mb-2">📐 Redimensionar <span className="bg-gradient-to-r from-[#0090ff] to-[#00e4b8] bg-clip-text text-transparent">Imágenes</span></h1>
            </div>

            {/* Controls */}
            {!results.length && (
                <div className="bg-[#141d2f] border border-white/[0.08] rounded-2xl p-8 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-[#94a3b8]">{files.length} imagen{files.length>1?'es':''} seleccionada{files.length>1?'s':''}</span>
                        <button onClick={() => { setFiles([]); setResults([]); }} className="text-sm text-red-400 hover:text-red-300">Limpiar</button>
                    </div>

                    <div className="mb-6">
                        <p className="text-xs font-bold uppercase tracking-wider text-[#94a3b8] mb-3">Presets rápidos</p>
                        <div className="flex flex-wrap gap-2">
                            {PRESETS.map(p => (
                                <button key={p.label} onClick={() => applyPreset(p)}
                                        className="px-3 py-1.5 rounded-lg border border-white/[0.08] text-xs text-[#94a3b8] hover:border-[#0090ff]/30 hover:text-[#0090ff] transition">
                                    {p.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-end gap-4 mb-4">
                        <div className="flex-1">
                            <label className="text-xs text-[#94a3b8] mb-1 block">Ancho (px)</label>
                            <input type="number" value={width} min={1} onChange={e => onWidthChange(e.target.value)}
                                   className="w-full bg-white/5 border border-white/[0.08] rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#0090ff]/50" />
                        </div>
                        <button onClick={() => setKeepRatio(v => !v)}
                                className={`mb-0.5 p-2.5 rounded-lg border transition ${keepRatio ? 'border-[#0090ff]/40 text-[#0090ff] bg-[#0090ff]/10' : 'border-white/[0.08] text-[#94a3b8]'}`}
                                title="Mantener proporción">🔗</button>
                        <div className="flex-1">
                            <label className="text-xs text-[#94a3b8] mb-1 block">Alto (px)</label>
                            <input type="number" value={height} min={1} onChange={e => onHeightChange(e.target.value)}
                                   className="w-full bg-white/5 border border-white/[0.08] rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#0090ff]/50" />
                        </div>
                    </div>
                    <p className="text-xs text-[#64748b] mb-6">
                        {keepRatio ? '🔗 Proporción bloqueada' : '🔓 Proporción libre'} — Nuevo tamaño: {width}×{height}px
                    </p>

                    {/* Thumbnails */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {previews.slice(0, 8).map((src, i) => (
                            <img key={i} src={src} className="w-16 h-16 object-cover rounded-lg border border-white/[0.08]" alt="" />
                        ))}
                        {files.length > 8 && <div className="w-16 h-16 rounded-lg border border-white/[0.08] flex items-center justify-center text-xs text-[#94a3b8]">+{files.length-8}</div>}
                    </div>

                    <button onClick={handleResize} disabled={processing}
                            className="w-full py-4 rounded-xl bg-gradient-to-r from-[#0090ff] to-[#00bfff] text-white font-bold hover:shadow-[0_8px_30px_rgba(0,144,255,.3)] transition-all disabled:opacity-50">
                        {processing ? '⏳ Procesando...' : `📐 Redimensionar ${files.length} imagen${files.length>1?'es':''} a ${width}×${height}`}
                    </button>
                </div>
            )}

            {/* Results */}
            {results.length > 0 && (
                <div className="bg-[#141d2f] border border-white/[0.08] rounded-2xl overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08]">
                        <span className="font-bold text-[#00e4b8]">✓ {results.length} imágenes redimensionadas a {width}×{height}px</span>
                        <div className="flex gap-3">
                            <button onClick={downloadAll} className="px-5 py-2 rounded-lg bg-gradient-to-r from-[#0090ff] to-[#00bfff] text-white text-sm font-semibold">⬇ Descargar todo</button>
                            <button onClick={() => { setFiles([]); setResults([]); }} className="px-5 py-2 rounded-lg border border-white/[0.08] text-sm text-[#94a3b8]">Nuevas</button>
                        </div>
                    </div>
                    <div className="divide-y divide-white/[0.04]">
                        {results.map((r, i) => (
                            <div key={i} className="flex items-center justify-between px-6 py-4 hover:bg-white/[0.02]">
                                <div>
                                    <div className="font-medium text-sm truncate max-w-xs">{r.name}</div>
                                    <div className="text-xs text-[#64748b] mt-1">{r.originalW}×{r.originalH} → {width}×{height} · {formatSize(r.originalSize)} → {formatSize(r.blob.size)}</div>
                                </div>
                                <button onClick={() => downloadOne(r)} className="px-4 py-1.5 rounded-lg border border-white/[0.08] text-xs text-[#94a3b8] hover:border-[#0090ff]/20 hover:text-[#0090ff] transition">⬇ Descargar</button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
