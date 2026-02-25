import { useState, useCallback, useRef } from 'react';

const PRESETS = [
    { name: 'Océano', type: 'linear', angle: 135, stops: [{ color: '#0090ff', pos: 0 }, { color: '#00e4b8', pos: 100 }] },
    { name: 'Atardecer', type: 'linear', angle: 135, stops: [{ color: '#ff6b6b', pos: 0 }, { color: '#feca57', pos: 100 }] },
    { name: 'Bosque', type: 'linear', angle: 135, stops: [{ color: '#11998e', pos: 0 }, { color: '#38ef7d', pos: 100 }] },
    { name: 'Galaxia', type: 'linear', angle: 135, stops: [{ color: '#6c5ce7', pos: 0 }, { color: '#fd79a8', pos: 100 }] },
    { name: 'Fuego', type: 'radial', angle: 45, stops: [{ color: '#f7971e', pos: 0 }, { color: '#ffd200', pos: 50 }, { color: '#ff6b6b', pos: 100 }] },
    { name: 'Noche', type: 'linear', angle: 180, stops: [{ color: '#0d1117', pos: 0 }, { color: '#1a2332', pos: 50 }, { color: '#0090ff', pos: 100 }] },
    { name: 'Candy', type: 'linear', angle: 90, stops: [{ color: '#f093fb', pos: 0 }, { color: '#f5576c', pos: 100 }] },
    { name: 'Aurora', type: 'conic', angle: 0, stops: [{ color: '#00e4b8', pos: 0 }, { color: '#0090ff', pos: 33 }, { color: '#6c5ce7', pos: 66 }, { color: '#00e4b8', pos: 100 }] },
    { name: 'Esmeralda', type: 'linear', angle: 120, stops: [{ color: '#11998e', pos: 0 }, { color: '#8BC6EC', pos: 100 }] },
    { name: 'Naranja', type: 'linear', angle: 45, stops: [{ color: '#f7971e', pos: 0 }, { color: '#ffd200', pos: 100 }] },
];

function buildCSS({ type, angle, stops }) {
    const stopsStr = stops.map(s => `${s.color} ${s.pos}%`).join(', ');
    if (type === 'linear') return `linear-gradient(${angle}deg, ${stopsStr})`;
    if (type === 'radial') return `radial-gradient(circle, ${stopsStr})`;
    if (type === 'conic') return `conic-gradient(from ${angle}deg, ${stopsStr})`;
    return '';
}

export default function GradientGenerator() {
    const [type, setType] = useState('linear');
    const [angle, setAngle] = useState(135);
    const [stops, setStops] = useState([
        { color: '#0090ff', pos: 0 },
        { color: '#00e4b8', pos: 100 },
    ]);
    const [copied, setCopied] = useState(false);
    const canvasRef = useRef(null);

    const css = buildCSS({ type, angle, stops });
    const fullCSS = `background: ${css};`;

    const updateStop = useCallback((i, field, value) => {
        setStops(prev => {
            const next = [...prev];
            next[i] = { ...next[i], [field]: value };
            return next;
        });
    }, []);

    const addStop = () => {
        if (stops.length >= 5) return;
        const newPos = Math.round((stops[stops.length - 1].pos + stops[stops.length - 2].pos) / 2);
        setStops(prev => [...prev.slice(0, -1), { color: '#ffffff', pos: newPos }, prev[prev.length - 1]].sort((a, b) => a.pos - b.pos));
    };

    const removeStop = (i) => {
        if (stops.length <= 2) return;
        setStops(prev => prev.filter((_, idx) => idx !== i));
    };

    const applyPreset = (preset) => {
        setType(preset.type);
        setAngle(preset.angle);
        setStops(preset.stops.map(s => ({ ...s })));
    };

    const copy = async () => {
        await navigator.clipboard.writeText(fullCSS);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const exportPNG = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 400;
        const ctx = canvas.getContext('2d');
        const sortedStops = [...stops].sort((a, b) => a.pos - b.pos);
        if (type === 'linear') {
            const rad = (angle - 90) * Math.PI / 180;
            const x1 = 400 - Math.cos(rad) * 400;
            const y1 = 200 - Math.sin(rad) * 400;
            const x2 = 400 + Math.cos(rad) * 400;
            const y2 = 200 + Math.sin(rad) * 400;
            const grad = ctx.createLinearGradient(x1, y1, x2, y2);
            sortedStops.forEach(s => grad.addColorStop(s.pos / 100, s.color));
            ctx.fillStyle = grad;
        } else if (type === 'radial') {
            const grad = ctx.createRadialGradient(400, 200, 0, 400, 200, 400);
            sortedStops.forEach(s => grad.addColorStop(s.pos / 100, s.color));
            ctx.fillStyle = grad;
        } else {
            ctx.fillStyle = sortedStops[0].color;
        }
        ctx.fillRect(0, 0, 800, 400);
        const link = document.createElement('a');
        link.download = 'gradiente.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    };

    return (
        <div className="max-w-[1000px] mx-auto px-6 py-16">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-extrabold mb-2">
                    🎨 Generador de <span className="bg-gradient-to-r from-[#6c5ce7] to-[#fd79a8] bg-clip-text text-transparent">Gradientes CSS</span>
                </h1>
                <p className="text-[#8899aa]">Crea gradientes CSS perfectos con preview en vivo y copia el código listo para usar.</p>
            </div>

            {/* Preview */}
            <div className="rounded-2xl overflow-hidden mb-8 w-full h-52 shadow-2xl border border-white/[0.06]" style={{ background: css }} />

            {/* Presets */}
            <div className="bg-[#0d1117] border border-white/[0.06] rounded-2xl p-5 mb-6">
                <p className="text-xs font-bold uppercase tracking-widest text-[#5a6a7a] mb-3">Presets</p>
                <div className="flex flex-wrap gap-2">
                    {PRESETS.map(preset => (
                        <button
                            key={preset.name}
                            onClick={() => applyPreset(preset)}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/[0.06] text-xs font-semibold hover:border-[#0090ff]/20 transition"
                        >
                            <div className="w-4 h-4 rounded-full flex-shrink-0" style={{ background: buildCSS(preset) }} />
                            {preset.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Type + Angle */}
                <div className="bg-[#0d1117] border border-white/[0.06] rounded-2xl p-5 space-y-5">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-[#5a6a7a] mb-3">Tipo</p>
                        <div className="flex gap-2">
                            {['linear', 'radial', 'conic'].map(t => (
                                <button
                                    key={t}
                                    onClick={() => setType(t)}
                                    className={`flex-1 py-2 rounded-lg text-sm font-semibold transition border ${type === t ? 'bg-[#0090ff]/10 border-[#0090ff]/30 text-[#0090ff]' : 'border-white/[0.06] text-[#8899aa] hover:border-white/10'}`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>
                    {(type === 'linear' || type === 'conic') && (
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-[#8899aa]">Ángulo</span>
                                <span className="text-[#0090ff] font-bold">{angle}°</span>
                            </div>
                            <input
                                type="range" min="0" max="360" value={angle}
                                onChange={e => setAngle(Number(e.target.value))}
                                className="w-full h-1 rounded-full bg-white/10 appearance-none cursor-pointer
                                           [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
                                           [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#0090ff]"
                            />
                        </div>
                    )}
                </div>

                {/* Color Stops */}
                <div className="bg-[#0d1117] border border-white/[0.06] rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-xs font-bold uppercase tracking-widest text-[#5a6a7a]">Color Stops ({stops.length}/5)</p>
                        <button
                            onClick={addStop}
                            disabled={stops.length >= 5}
                            className="text-xs px-3 py-1 rounded-lg border border-white/[0.06] text-[#8899aa] hover:border-[#0090ff]/20 disabled:opacity-30 transition"
                        >
                            + Agregar
                        </button>
                    </div>
                    <div className="space-y-3">
                        {stops.map((stop, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <input
                                    type="color" value={stop.color}
                                    onChange={e => updateStop(i, 'color', e.target.value)}
                                    className="w-8 h-8 rounded-lg border border-white/10 bg-transparent cursor-pointer"
                                />
                                <span className="text-xs font-mono text-[#8899aa] w-16">{stop.color}</span>
                                <div className="flex-1 relative">
                                    <input
                                        type="range" min="0" max="100" value={stop.pos}
                                        onChange={e => updateStop(i, 'pos', Number(e.target.value))}
                                        className="w-full h-1 rounded-full bg-white/10 appearance-none cursor-pointer
                                                   [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
                                                   [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                                    />
                                </div>
                                <span className="text-xs text-[#5a6a7a] w-8">{stop.pos}%</span>
                                <button
                                    onClick={() => removeStop(i)}
                                    disabled={stops.length <= 2}
                                    className="text-[#5a6a7a] hover:text-red-400 disabled:opacity-20 transition text-lg leading-none"
                                >×</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CSS Output */}
            <div className="bg-[#0d1117] border border-white/[0.06] rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-bold uppercase tracking-widest text-[#5a6a7a]">CSS Generado</p>
                    <div className="flex gap-2">
                        <button
                            onClick={exportPNG}
                            className="text-xs px-3 py-1.5 rounded-lg border border-white/[0.06] text-[#8899aa] hover:border-[#0090ff]/20 transition"
                        >
                            ⬇ Export PNG
                        </button>
                        <button
                            onClick={copy}
                            className={`text-xs px-4 py-1.5 rounded-lg font-semibold transition ${copied ? 'bg-[#00e4b8]/10 border border-[#00e4b8]/30 text-[#00e4b8]' : 'bg-gradient-to-r from-[#0090ff] to-[#00bfff] text-white'}`}
                        >
                            {copied ? '✓ Copiado' : '📋 Copiar CSS'}
                        </button>
                    </div>
                </div>
                <pre className="font-mono text-sm text-[#00e4b8] bg-black/30 rounded-xl px-4 py-3 overflow-x-auto">{fullCSS}</pre>
            </div>
        </div>
    );
}
