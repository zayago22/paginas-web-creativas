import { useState, useRef, useEffect, useCallback } from 'react';

const FILTERS = [
    { id: 'original', label: 'Original' },
    { id: 'grayscale', label: 'B&N' },
    { id: 'sepia', label: 'Sepia' },
    { id: 'warm', label: 'Cálido' },
    { id: 'cool', label: 'Frío' },
    { id: 'vintage', label: 'Vintage' },
    { id: 'dramatic', label: 'Dramático' },
    { id: 'fade', label: 'Fade' },
    { id: 'vivid', label: 'Vívido' },
];

function applyPixelFilter(data, filterId) {
    for (let i = 0; i < data.length; i += 4) {
        let r = data[i], g = data[i+1], b = data[i+2];
        switch (filterId) {
            case 'grayscale': { const gr = 0.299*r+0.587*g+0.114*b; data[i]=data[i+1]=data[i+2]=gr; break; }
            case 'sepia': {
                data[i]   = Math.min(255, r*.393+g*.769+b*.189);
                data[i+1] = Math.min(255, r*.349+g*.686+b*.168);
                data[i+2] = Math.min(255, r*.272+g*.534+b*.131);
                break;
            }
            case 'warm': { data[i]=Math.min(255,r*1.1); data[i+2]=Math.min(255,b*.9); break; }
            case 'cool': { data[i]=Math.min(255,r*.9); data[i+2]=Math.min(255,b*1.1); break; }
            case 'vintage': {
                const gv = 0.299*r+0.587*g+0.114*b;
                data[i]=Math.min(255,gv*.9+50); data[i+1]=Math.min(255,gv*.8+30); data[i+2]=Math.min(255,gv*.7+20);
                break;
            }
            case 'dramatic': {
                const factor = 1.4;
                data[i]  =Math.min(255,Math.max(0,(r-128)*factor+128));
                data[i+1]=Math.min(255,Math.max(0,(g-128)*factor+128));
                data[i+2]=Math.min(255,Math.max(0,(b-128)*factor+128+10));
                break;
            }
            case 'fade': { data[i]=Math.min(255,r*.85+40); data[i+1]=Math.min(255,g*.85+40); data[i+2]=Math.min(255,b*.85+40); break; }
            case 'vivid': {
                const avg=(r+g+b)/3;
                data[i]=Math.min(255,avg+(r-avg)*1.6); data[i+1]=Math.min(255,avg+(g-avg)*1.6); data[i+2]=Math.min(255,avg+(b-avg)*1.6);
                break;
            }
        }
    }
}

export default function ImageEditor() {
    const [image, setImage] = useState(null);
    const [rotation, setRotation] = useState(0);
    const [flipH, setFlipH] = useState(false);
    const [flipV, setFlipV] = useState(false);
    const [brightness, setBrightness] = useState(100);
    const [contrast, setContrast] = useState(100);
    const [saturation, setSaturation] = useState(100);
    const [exposure, setExposure] = useState(0);
    const [temperature, setTemperature] = useState(0);
    const [activeFilter, setActiveFilter] = useState('original');
    const [format, setFormat] = useState('jpeg');
    const canvasRef = useRef(null);
    const inputRef = useRef(null);

    const redraw = useCallback(() => {
        if (!image || !canvasRef.current) return;
        const canvas = canvasRef.current;
        const rad = (rotation * Math.PI) / 180;
        const swapped = rotation === 90 || rotation === 270;
        canvas.width  = swapped ? image.naturalHeight : image.naturalWidth;
        canvas.height = swapped ? image.naturalWidth  : image.naturalHeight;
        const ctx = canvas.getContext('2d');
        const bri = (brightness / 100 + exposure / 100).toFixed(2);
        ctx.filter = `brightness(${bri}) contrast(${contrast/100}) saturate(${saturation/100})`;
        ctx.save();
        ctx.translate(canvas.width/2, canvas.height/2);
        ctx.rotate(rad);
        ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
        ctx.drawImage(image, -image.naturalWidth/2, -image.naturalHeight/2);
        ctx.restore();
        ctx.filter = 'none';
        if (activeFilter !== 'original') {
            const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            applyPixelFilter(imgData.data, activeFilter);
            // temperature tint
            if (temperature !== 0) {
                const td = imgData.data;
                for (let i = 0; i < td.length; i += 4) {
                    td[i]   = Math.min(255, td[i]   + temperature * 0.5);
                    td[i+2] = Math.min(255, td[i+2] - temperature * 0.5);
                }
            }
            ctx.putImageData(imgData, 0, 0);
        } else if (temperature !== 0) {
            const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const td = imgData.data;
            for (let i = 0; i < td.length; i += 4) {
                td[i]   = Math.min(255, Math.max(0, td[i]   + temperature * 0.5));
                td[i+2] = Math.min(255, Math.max(0, td[i+2] - temperature * 0.5));
            }
            ctx.putImageData(imgData, 0, 0);
        }
    }, [image, rotation, flipH, flipV, brightness, contrast, saturation, exposure, temperature, activeFilter]);

    useEffect(() => { redraw(); }, [redraw]);

    const loadFile = (file) => {
        if (!file || !file.type.startsWith('image/')) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => setImage(img);
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    };

    const reset = () => { setRotation(0); setFlipH(false); setFlipV(false); setBrightness(100); setContrast(100); setSaturation(100); setExposure(0); setTemperature(0); setActiveFilter('original'); };

    const download = () => {
        if (!canvasRef.current) return;
        const mime = format === 'png' ? 'image/png' : format === 'webp' ? 'image/webp' : 'image/jpeg';
        const link = document.createElement('a');
        link.download = `editada.${format === 'jpeg' ? 'jpg' : format}`;
        link.href = canvasRef.current.toDataURL(mime, 0.92);
        link.click();
    };

    const Slider = ({ label, value, min, max, onChange }) => (
        <div className="mb-4">
            <div className="flex justify-between text-xs mb-1">
                <span className="text-[#94a3b8]">{label}</span>
                <span className="text-[#0090ff] font-semibold">{value}</span>
            </div>
            <input type="range" min={min} max={max} value={value} onChange={e => onChange(Number(e.target.value))}
                   className="w-full h-1 rounded-full bg-white/10 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#0090ff]" />
        </div>
    );

    if (!image) return (
        <div className="max-w-[900px] mx-auto px-6 py-16">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-extrabold mb-2">🎨 Editor de <span className="bg-gradient-to-r from-[#0090ff] to-[#00e4b8] bg-clip-text text-transparent">Imágenes</span></h1>
                <p className="text-[#94a3b8]">Filtra, ajusta y transforma tus fotos. 100% privado.</p>
            </div>
            <div onClick={() => inputRef.current?.click()}
                 onDragOver={e => e.preventDefault()}
                 onDrop={e => { e.preventDefault(); loadFile(e.dataTransfer.files[0]); }}
                 className="border-2 border-dashed border-[#0090ff]/20 rounded-2xl p-20 text-center cursor-pointer hover:border-[#0090ff]/40 hover:bg-[#0090ff]/3 transition-all">
                <div className="text-4xl mb-4 opacity-50">🎨</div>
                <h3 className="text-lg font-bold mb-2">Arrastra tu imagen aquí</h3>
                <p className="text-[#94a3b8] text-sm mb-6">JPG, PNG, WebP</p>
                <button className="px-8 py-3 rounded-full bg-gradient-to-r from-[#0090ff] to-[#00bfff] text-white font-semibold text-sm">Seleccionar Imagen</button>
                <input ref={inputRef} type="file" accept="image/*" hidden onChange={e => loadFile(e.target.files[0])} />
            </div>
        </div>
    );

    return (
        <div className="max-w-[1200px] mx-auto px-6 py-10">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-extrabold">🎨 Editor de Imágenes</h1>
                <div className="flex gap-2">
                    <button onClick={reset} className="px-4 py-2 rounded-lg border border-white/[0.08] text-sm text-[#94a3b8] hover:border-[#0090ff]/30 transition">↺ Reset</button>
                    <button onClick={() => { setImage(null); reset(); }} className="px-4 py-2 rounded-lg border border-white/[0.08] text-sm text-[#94a3b8] hover:border-red-500/30 transition">✕ Nueva</button>
                    <div className="flex rounded-lg overflow-hidden border border-white/[0.08]">
                        {['jpeg','png','webp'].map(f => (
                            <button key={f} onClick={() => setFormat(f)}
                                    className={`px-3 py-2 text-xs font-bold uppercase transition ${format===f ? 'bg-[#0090ff] text-white' : 'text-[#94a3b8] hover:text-white'}`}>{f}</button>
                        ))}
                    </div>
                    <button onClick={download} className="px-5 py-2 rounded-lg bg-gradient-to-r from-[#0090ff] to-[#00bfff] text-white font-semibold text-sm">⬇ Descargar</button>
                </div>
            </div>

            <div className="flex gap-6">
                {/* Sidebar */}
                <div className="w-64 shrink-0 space-y-4">
                    {/* Transforms */}
                    <div className="bg-[#141d2f] border border-white/[0.08] rounded-2xl p-4">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-[#94a3b8] mb-3">Transformar</h3>
                        <div className="grid grid-cols-2 gap-2">
                            {[['↺ -90°', () => setRotation(r => (r-90+360)%360)], ['↻ +90°', () => setRotation(r => (r+90)%360)],
                              ['↔ H', () => setFlipH(v => !v)], ['↕ V', () => setFlipV(v => !v)]].map(([label, fn]) => (
                                <button key={label} onClick={fn}
                                        className="py-2 rounded-lg border border-white/[0.08] text-xs text-[#94a3b8] hover:border-[#0090ff]/30 hover:text-[#0090ff] transition">{label}</button>
                            ))}
                        </div>
                    </div>

                    {/* Adjustments */}
                    <div className="bg-[#141d2f] border border-white/[0.08] rounded-2xl p-4">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-[#94a3b8] mb-3">Ajustes</h3>
                        <Slider label="Brillo" value={brightness} min={0} max={200} onChange={setBrightness} />
                        <Slider label="Contraste" value={contrast} min={0} max={200} onChange={setContrast} />
                        <Slider label="Saturación" value={saturation} min={0} max={200} onChange={setSaturation} />
                        <Slider label="Exposición" value={exposure} min={-100} max={100} onChange={setExposure} />
                        <Slider label="Temperatura" value={temperature} min={-100} max={100} onChange={setTemperature} />
                    </div>

                    {/* Filters */}
                    <div className="bg-[#141d2f] border border-white/[0.08] rounded-2xl p-4">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-[#94a3b8] mb-3">Filtros</h3>
                        <div className="grid grid-cols-3 gap-1.5">
                            {FILTERS.map(f => (
                                <button key={f.id} onClick={() => setActiveFilter(f.id)}
                                        className={`py-1.5 rounded-lg text-xs font-medium transition ${activeFilter===f.id ? 'bg-[#0090ff] text-white' : 'border border-white/[0.08] text-[#94a3b8] hover:border-[#0090ff]/30'}`}>
                                    {f.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Canvas */}
                <div className="flex-1 bg-[#141d2f] border border-white/[0.08] rounded-2xl p-4 flex items-center justify-center min-h-[500px] overflow-auto">
                    <canvas ref={canvasRef} className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl" />
                </div>
            </div>
        </div>
    );
}
