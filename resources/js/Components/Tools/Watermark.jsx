import { useState, useRef, useEffect, useCallback } from 'react';

const POSITIONS = [
    { id: 'tl', label: '↖' }, { id: 'tc', label: '↑' }, { id: 'tr', label: '↗' },
    { id: 'ml', label: '←' }, { id: 'cc', label: '●' }, { id: 'mr', label: '→' },
    { id: 'bl', label: '↙' }, { id: 'bc', label: '↓' }, { id: 'br', label: '↘' },
];
const FONTS = ['Outfit', 'Arial', 'Georgia', 'Courier New', 'Impact'];

function applyWatermark(img, { text, fontSize, opacity, rotation, color, font, position, repeat }) {
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth || img.width;
    canvas.height = img.naturalHeight || img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    ctx.save();
    ctx.globalAlpha = opacity / 100;
    ctx.fillStyle = color;
    ctx.font = `bold ${fontSize}px ${font}`;
    ctx.textBaseline = 'middle';
    const w = canvas.width, h = canvas.height;
    const rad = rotation * Math.PI / 180;

    if (repeat) {
        const gap = fontSize * 4;
        const diag = Math.sqrt(w*w + h*h);
        ctx.translate(w/2, h/2);
        ctx.rotate(rad);
        for (let y = -diag; y < diag; y += gap) {
            for (let x = -diag; x < diag; x += gap * 2.5) {
                ctx.fillText(text, x, y);
            }
        }
    } else {
        const pad = fontSize * 0.8;
        const tw = ctx.measureText(text).width;
        const positions = {
            tl: [pad, pad], tc: [w/2-tw/2, pad], tr: [w-tw-pad, pad],
            ml: [pad, h/2], cc: [w/2-tw/2, h/2], mr: [w-tw-pad, h/2],
            bl: [pad, h-pad], bc: [w/2-tw/2, h-pad], br: [w-tw-pad, h-pad],
        };
        const [x, y] = positions[position] || [w/2-tw/2, h/2];
        ctx.translate(x + tw/2, y);
        ctx.rotate(rad);
        ctx.fillText(text, -tw/2, 0);
    }
    ctx.restore();
    return canvas;
}

export default function Watermark() {
    const [files, setFiles]       = useState([]);
    const [text, setText]         = useState('© Mi Marca');
    const [fontSize, setFontSize] = useState(40);
    const [opacity, setOpacity]   = useState(50);
    const [rotation, setRotation] = useState(-30);
    const [color, setColor]       = useState('#ffffff');
    const [font, setFont]         = useState('Outfit');
    const [position, setPosition] = useState('br');
    const [repeat, setRepeat]     = useState(false);
    const [previewIdx, setPreviewIdx] = useState(0);
    const [processing, setProcessing] = useState(false);
    const canvasRef = useRef(null);
    const inputRef  = useRef(null);
    const dropRef   = useRef(null);
    const imgRef    = useRef(null);

    const handleFiles = useCallback((fileList) => {
        const imgs = [...fileList].filter(f => f.type.startsWith('image/'));
        setFiles(imgs); setPreviewIdx(0);
    }, []);

    useEffect(() => {
        if (!files.length || !canvasRef.current) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                imgRef.current = img;
                const result = applyWatermark(img, { text, fontSize, opacity, rotation, color, font, position, repeat });
                const ctx = canvasRef.current.getContext('2d');
                canvasRef.current.width  = result.width;
                canvasRef.current.height = result.height;
                ctx.drawImage(result, 0, 0);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(files[previewIdx]);
    }, [files, previewIdx, text, fontSize, opacity, rotation, color, font, position, repeat]);

    const downloadAll = async () => {
        setProcessing(true);
        for (const file of files) {
            await new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const img = new Image();
                    img.onload = () => {
                        const canvas = applyWatermark(img, { text, fontSize, opacity, rotation, color, font, position, repeat });
                        const a = document.createElement('a');
                        a.download = file.name.replace(/\.[^.]+$/, '-watermark.png');
                        a.href = canvas.toDataURL('image/png');
                        a.click();
                        setTimeout(resolve, 100);
                    };
                    img.src = e.target.result;
                };
                reader.readAsDataURL(file);
            });
        }
        setProcessing(false);
    };

    const Slider = ({ label, value, min, max, onChange }) => (
        <div className="mb-3">
            <div className="flex justify-between text-xs mb-1">
                <span className="text-[#94a3b8]">{label}</span>
                <span className="text-[#0090ff] font-semibold">{value}</span>
            </div>
            <input type="range" min={min} max={max} value={value} onChange={e => onChange(Number(e.target.value))}
                   className="w-full h-1 rounded-full bg-white/10 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#0090ff]" />
        </div>
    );

    if (!files.length) return (
        <div className="max-w-[900px] mx-auto px-6 py-16">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-extrabold mb-2">💧 Marca de <span className="bg-gradient-to-r from-[#0090ff] to-[#00e4b8] bg-clip-text text-transparent">Agua</span></h1>
                <p className="text-[#94a3b8]">Protege tus imágenes con texto personalizado. 100% privado.</p>
            </div>
            <div ref={dropRef} onClick={() => inputRef.current?.click()}
                 onDragOver={e => { e.preventDefault(); dropRef.current?.classList.add('border-[#0090ff]'); }}
                 onDragLeave={() => dropRef.current?.classList.remove('border-[#0090ff]')}
                 onDrop={e => { e.preventDefault(); dropRef.current?.classList.remove('border-[#0090ff]'); handleFiles(e.dataTransfer.files); }}
                 className="border-2 border-dashed border-[#0090ff]/20 rounded-2xl p-20 text-center cursor-pointer hover:border-[#0090ff]/40 hover:bg-[#0090ff]/3 transition-all">
                <div className="text-4xl mb-4 opacity-50">💧</div>
                <h3 className="text-lg font-bold mb-2">Arrastra tus imágenes aquí</h3>
                <p className="text-[#94a3b8] text-sm mb-6">JPG, PNG, WebP — múltiples imágenes</p>
                <button className="px-8 py-3 rounded-full bg-gradient-to-r from-[#0090ff] to-[#00bfff] text-white font-semibold text-sm">Seleccionar Imágenes</button>
                <input ref={inputRef} type="file" accept="image/*" multiple hidden onChange={e => handleFiles(e.target.files)} />
            </div>
        </div>
    );

    return (
        <div className="max-w-[1200px] mx-auto px-6 py-10">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-extrabold">💧 Marca de Agua</h1>
                <div className="flex gap-2">
                    <button onClick={() => setFiles([])} className="px-4 py-2 rounded-lg border border-white/[0.08] text-sm text-[#94a3b8] hover:border-red-500/30 transition">✕ Nueva</button>
                    <button onClick={downloadAll} disabled={processing}
                            className="px-5 py-2 rounded-lg bg-gradient-to-r from-[#0090ff] to-[#00bfff] text-white font-semibold text-sm disabled:opacity-50">
                        {processing ? '⏳ Procesando...' : `⬇ Descargar ${files.length} imagen${files.length>1?'es':''}`}
                    </button>
                </div>
            </div>

            <div className="flex gap-6">
                {/* Controls sidebar */}
                <div className="w-64 shrink-0 space-y-4">
                    <div className="bg-[#141d2f] border border-white/[0.08] rounded-2xl p-4">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-[#94a3b8] mb-3">Texto</h3>
                        <input value={text} onChange={e => setText(e.target.value)}
                               className="w-full bg-white/5 border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#0090ff]/50 mb-3" />
                        <select value={font} onChange={e => setFont(e.target.value)}
                                className="w-full bg-white/5 border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white focus:outline-none mb-3">
                            {FONTS.map(f => <option key={f} value={f}>{f}</option>)}
                        </select>
                        <div className="flex items-center gap-3">
                            <label className="text-xs text-[#94a3b8]">Color</label>
                            <input type="color" value={color} onChange={e => setColor(e.target.value)}
                                   className="w-10 h-8 rounded cursor-pointer bg-transparent border-0" />
                        </div>
                    </div>

                    <div className="bg-[#141d2f] border border-white/[0.08] rounded-2xl p-4">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-[#94a3b8] mb-3">Ajustes</h3>
                        <Slider label="Tamaño" value={fontSize} min={12} max={120} onChange={setFontSize} />
                        <Slider label="Opacidad %" value={opacity} min={5} max={100} onChange={setOpacity} />
                        <Slider label="Rotación °" value={rotation} min={-90} max={90} onChange={setRotation} />
                    </div>

                    <div className="bg-[#141d2f] border border-white/[0.08] rounded-2xl p-4">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-[#94a3b8]">Posición</h3>
                            <button onClick={() => setRepeat(v => !v)}
                                    className={`text-xs px-2 py-1 rounded-lg border transition ${repeat ? 'border-[#0090ff]/40 text-[#0090ff] bg-[#0090ff]/10' : 'border-white/[0.08] text-[#94a3b8]'}`}>
                                {repeat ? '🔄 Repetir' : '📌 Pos'}
                            </button>
                        </div>
                        {!repeat && (
                            <div className="grid grid-cols-3 gap-1.5">
                                {POSITIONS.map(p => (
                                    <button key={p.id} onClick={() => setPosition(p.id)}
                                            className={`py-2.5 rounded-lg text-sm transition ${position===p.id ? 'bg-[#0090ff] text-white' : 'border border-white/[0.08] text-[#94a3b8] hover:border-[#0090ff]/30'}`}>
                                        {p.label}
                                    </button>
                                ))}
                            </div>
                        )}
                        {repeat && <p className="text-xs text-[#64748b]">Patrón diagonal en toda la imagen</p>}
                    </div>

                    {/* Thumbnail selector */}
                    {files.length > 1 && (
                        <div className="bg-[#141d2f] border border-white/[0.08] rounded-2xl p-4">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-[#94a3b8] mb-3">Preview ({previewIdx+1}/{files.length})</h3>
                            <div className="flex flex-wrap gap-1.5">
                                {files.slice(0, 6).map((f, i) => (
                                    <img key={i} src={URL.createObjectURL(f)} alt=""
                                         onClick={() => setPreviewIdx(i)}
                                         className={`w-12 h-12 object-cover rounded-lg cursor-pointer border-2 transition ${previewIdx===i ? 'border-[#0090ff]' : 'border-transparent hover:border-white/20'}`} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Canvas preview */}
                <div className="flex-1 bg-[#141d2f] border border-white/[0.08] rounded-2xl p-4 flex items-center justify-center min-h-[500px] overflow-auto">
                    <canvas ref={canvasRef} className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl" />
                </div>
            </div>
        </div>
    );
}
