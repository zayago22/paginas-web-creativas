import { useState, useRef, useCallback } from 'react';

export default function BackgroundRemover() {
    const [original, setOriginal] = useState(null);
    const [originalFile, setOriginalFile] = useState(null);
    const [result, setResult] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [modelProgress, setModelProgress] = useState(null); // null | { loaded, total, percent }
    const [error, setError] = useState('');
    const [bgMode, setBgMode] = useState('transparent'); // 'transparent' | 'white' | 'color'
    const [bgColor, setBgColor] = useState('#ffffff');
    const [sliderPos, setSliderPos] = useState(50);
    const inputRef = useRef(null);
    const dropRef = useRef(null);

    const handleFile = useCallback((file) => {
        if (!file || !file.type.startsWith('image/')) return;
        if (file.size > 10 * 1024 * 1024) { setError('El archivo es demasiado grande (máx. 10MB).'); return; }
        setError('');
        setResult(null);
        setModelProgress(null);
        setOriginalFile(file);
        const url = URL.createObjectURL(file);
        setOriginal(url);
    }, []);

    const removeBackground = async () => {
        if (!originalFile) return;
        setProcessing(true);
        setError('');
        setModelProgress({ loaded: 0, total: 100, percent: 0 });
        try {
            const { removeBackground } = await import('@imgly/background-removal');
            const blob = await removeBackground(originalFile, {
                progress: (key, current, total) => {
                    if (total > 0) {
                        setModelProgress({ loaded: current, total, percent: Math.round((current / total) * 100) });
                    }
                },
                publicPath: 'https://cdn.jsdelivr.net/npm/@imgly/background-removal/dist/',
            });
            setResult(URL.createObjectURL(blob));
            setModelProgress(null);
        } catch (e) {
            setError('Error al procesar la imagen. Intenta con otra imagen.');
            setModelProgress(null);
        } finally {
            setProcessing(false);
        }
    };

    const download = () => {
        if (!result) return;
        if (bgMode === 'transparent') {
            const link = document.createElement('a');
            link.download = 'sin-fondo.png';
            link.href = result;
            link.click();
            return;
        }
        // Apply background color
        const img = new Image();
        img.src = result;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = bgMode === 'white' ? '#ffffff' : bgColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
            canvas.toBlob(blob => {
                const link = document.createElement('a');
                link.download = 'resultado.png';
                link.href = URL.createObjectURL(blob);
                link.click();
                URL.revokeObjectURL(link.href);
            }, 'image/png');
        };
    };

    const reset = () => {
        setOriginal(null);
        setOriginalFile(null);
        setResult(null);
        setModelProgress(null);
        setError('');
    };

    const appliedBg = bgMode === 'transparent' ? null : bgMode === 'white' ? '#ffffff' : bgColor;

    return (
        <div className="max-w-[900px] mx-auto px-6 py-16">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-extrabold mb-2">
                    🪄 Remover <span className="bg-gradient-to-r from-[#00e4b8] to-[#0090ff] bg-clip-text text-transparent">Fondo</span> con IA
                </h1>
                <p className="text-[#8899aa]">Elimina el fondo de tus fotos con inteligencia artificial. 100% en tu navegador.</p>
                <p className="text-xs text-[#5a6a7a] mt-2">La primera vez descarga un modelo de IA (~40MB). Después queda en caché.</p>
            </div>

            {!original ? (
                <div
                    ref={dropRef}
                    onClick={() => inputRef.current?.click()}
                    onDragOver={e => { e.preventDefault(); dropRef.current?.classList.add('border-[#00e4b8]', 'bg-[#00e4b8]/5'); }}
                    onDragLeave={() => dropRef.current?.classList.remove('border-[#00e4b8]', 'bg-[#00e4b8]/5')}
                    onDrop={e => { e.preventDefault(); dropRef.current?.classList.remove('border-[#00e4b8]', 'bg-[#00e4b8]/5'); handleFile(e.dataTransfer.files[0]); }}
                    className="border-2 border-dashed border-[#00e4b8]/20 rounded-2xl p-20 text-center cursor-pointer hover:border-[#00e4b8]/40 hover:bg-[#00e4b8]/3 transition-all"
                >
                    <div className="text-5xl mb-4 opacity-50">🪄</div>
                    <h3 className="text-lg font-bold mb-2">Arrastra tu imagen aquí</h3>
                    <p className="text-[#8899aa] text-sm mb-6">JPG, PNG, WebP · Máx. 10MB</p>
                    <button className="px-8 py-3 rounded-full bg-gradient-to-r from-[#00e4b8] to-[#0090ff] text-white font-semibold text-sm hover:shadow-[0_6px_25px_rgba(0,228,184,.3)] transition-all">
                        Seleccionar Imagen
                    </button>
                    <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" hidden onChange={e => handleFile(e.target.files[0])} />
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Before / After comparison */}
                    <div className="bg-[#0d1117] border border-white/[0.06] rounded-2xl overflow-hidden">
                        {result ? (
                            <div className="relative select-none" style={{ userSelect: 'none' }}>
                                {/* After (right side) */}
                                <div className="w-full" style={{ background: appliedBg ? appliedBg : 'repeating-conic-gradient(#1a2332 0% 25%, #0d1117 0% 50%) 0 0/20px 20px' }}>
                                    <img src={result} alt="resultado" className="w-full max-h-[400px] object-contain" />
                                </div>
                                {/* Before (left overlay) */}
                                <div
                                    className="absolute top-0 left-0 h-full overflow-hidden"
                                    style={{ width: `${sliderPos}%` }}
                                >
                                    <img src={original} alt="original" className="absolute top-0 left-0 w-full max-h-[400px] object-contain" style={{ width: `${10000 / sliderPos}%` }} />
                                </div>
                                {/* Slider handle */}
                                <div className="absolute top-0 h-full flex items-center" style={{ left: `${sliderPos}%` }}>
                                    <input
                                        type="range" min="0" max="100" value={sliderPos}
                                        onChange={e => setSliderPos(Number(e.target.value))}
                                        className="absolute opacity-0 cursor-ew-resize h-full w-8 -translate-x-1/2"
                                        style={{ appearance: 'none' }}
                                    />
                                    <div className="w-0.5 h-full bg-white/80 shadow pointer-events-none" />
                                    <div className="absolute -translate-x-1/2 bg-white rounded-full shadow-xl w-8 h-8 flex items-center justify-center pointer-events-none">
                                        <span className="text-xs text-gray-800 font-black select-none">↔</span>
                                    </div>
                                </div>
                                <div className="absolute bottom-2 left-2 text-xs bg-black/60 px-2 py-1 rounded-lg">Original</div>
                                <div className="absolute bottom-2 right-2 text-xs bg-black/60 px-2 py-1 rounded-lg">Resultado</div>
                            </div>
                        ) : (
                            <img src={original} alt="original" className="w-full max-h-[300px] object-contain bg-[#0d1117]" />
                        )}
                    </div>

                    {/* Progress bar */}
                    {modelProgress !== null && (
                        <div className="bg-[#0d1117] border border-white/[0.06] rounded-2xl p-5">
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-[#8899aa]">Descargando modelo de IA (solo la primera vez)...</span>
                                <span className="text-[#00e4b8] font-semibold">{modelProgress.percent}%</span>
                            </div>
                            <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
                                <div
                                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#00e4b8] to-[#0090ff] transition-all duration-300"
                                    style={{ width: `${modelProgress.percent}%` }}
                                />
                            </div>
                        </div>
                    )}

                    {error && <p className="text-sm text-red-400 bg-red-400/5 border border-red-400/20 rounded-xl px-4 py-3">{error}</p>}

                    {/* Download options */}
                    {result && (
                        <div className="bg-[#0d1117] border border-white/[0.06] rounded-2xl p-5">
                            <p className="text-xs font-bold uppercase tracking-widest text-[#5a6a7a] mb-4">Fondo de descarga</p>
                            <div className="flex flex-wrap gap-3 mb-4">
                                {[
                                    { k: 'transparent', label: '⬜ Transparente (PNG)' },
                                    { k: 'white', label: '🟦 Blanco' },
                                    { k: 'color', label: '🎨 Color personalizado' },
                                ].map(o => (
                                    <button
                                        key={o.k}
                                        onClick={() => setBgMode(o.k)}
                                        className={`px-4 py-2 rounded-xl text-sm font-semibold border transition ${bgMode === o.k ? 'bg-[#00e4b8]/10 border-[#00e4b8]/30 text-[#00e4b8]' : 'border-white/[0.06] text-[#8899aa]'}`}
                                    >
                                        {o.label}
                                    </button>
                                ))}
                                {bgMode === 'color' && (
                                    <div className="flex items-center gap-2">
                                        <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-8 h-8 rounded-lg border border-white/10 bg-transparent cursor-pointer" />
                                        <span className="text-xs font-mono text-[#8899aa]">{bgColor}</span>
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={download}
                                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00e4b8] to-[#0090ff] text-white font-bold text-sm hover:shadow-[0_8px_30px_rgba(0,228,184,.3)] transition-all"
                            >
                                ⬇ Descargar resultado
                            </button>
                        </div>
                    )}

                    <div className="flex gap-4">
                        {!result && (
                            <button
                                onClick={removeBackground}
                                disabled={processing}
                                className="flex-1 py-4 rounded-xl bg-gradient-to-r from-[#00e4b8] to-[#0090ff] text-white font-bold text-base hover:shadow-[0_8px_30px_rgba(0,228,184,.3)] transition-all disabled:opacity-50"
                            >
                                {processing ? '⏳ Procesando...' : '🪄 Remover fondo'}
                            </button>
                        )}
                        <button
                            onClick={reset}
                            className="px-6 py-4 rounded-xl border border-white/[0.06] text-sm text-[#8899aa] hover:border-white/10 transition"
                        >
                            Nueva imagen
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
