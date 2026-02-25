import { useState, useCallback } from 'react';

const PRESETS = [
    { name: 'Material', shadows: [{ x: 0, y: 4, blur: 6, spread: -1, color: '#000000', opacity: 0.1, inset: false }, { x: 0, y: 2, blur: 4, spread: -1, color: '#000000', opacity: 0.06, inset: false }] },
    { name: 'Soft', shadows: [{ x: 0, y: 20, blur: 60, spread: 0, color: '#000000', opacity: 0.2, inset: false }] },
    { name: 'Hard', shadows: [{ x: 4, y: 4, blur: 0, spread: 0, color: '#000000', opacity: 0.8, inset: false }] },
    { name: 'Neon Blue', shadows: [{ x: 0, y: 0, blur: 20, spread: 0, color: '#0090ff', opacity: 0.6, inset: false }, { x: 0, y: 0, blur: 60, spread: 0, color: '#0090ff', opacity: 0.3, inset: false }] },
    { name: 'Neon Green', shadows: [{ x: 0, y: 0, blur: 20, spread: 0, color: '#00e4b8', opacity: 0.6, inset: false }, { x: 0, y: 0, blur: 60, spread: 0, color: '#00e4b8', opacity: 0.3, inset: false }] },
    { name: 'Neumorphism', shadows: [{ x: 8, y: 8, blur: 16, spread: 0, color: '#000000', opacity: 0.4, inset: false }, { x: -8, y: -8, blur: 16, spread: 0, color: '#1e293b', opacity: 0.6, inset: false }] },
    { name: 'Inset Soft', shadows: [{ x: 0, y: 4, blur: 12, spread: 0, color: '#000000', opacity: 0.3, inset: true }] },
    { name: 'Elevado', shadows: [{ x: 0, y: 32, blur: 64, spread: -12, color: '#000000', opacity: 0.3, inset: false }] },
];

const defaultShadow = () => ({ x: 0, y: 8, blur: 24, spread: 0, color: '#000000', opacity: 0.2, inset: false });

function shadowToCSS(s) {
    const hex = s.color;
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${s.inset ? 'inset ' : ''}${s.x}px ${s.y}px ${s.blur}px ${s.spread}px rgba(${r},${g},${b},${s.opacity})`;
}

function buildCSS(shadows) {
    return shadows.map(shadowToCSS).join(',\n       ');
}

const RangeRow = ({ label, value, min, max, onChange, unit = 'px' }) => (
    <div className="flex items-center gap-3">
        <span className="text-xs text-[#5a6a7a] w-16 flex-shrink-0">{label}</span>
        <input
            type="range" min={min} max={max} value={value}
            onChange={e => onChange(Number(e.target.value))}
            className="flex-1 h-1 rounded-full bg-white/10 appearance-none cursor-pointer
                       [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5
                       [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#0090ff]"
        />
        <span className="text-xs text-[#0090ff] font-semibold w-14 text-right">{value}{unit}</span>
    </div>
);

export default function BoxShadowGenerator() {
    const [shadows, setShadows] = useState([defaultShadow()]);
    const [activeIdx, setActiveIdx] = useState(0);
    const [copied, setCopied] = useState(false);

    const s = shadows[activeIdx] || defaultShadow();

    const updateActive = useCallback((field, value) => {
        setShadows(prev => {
            const next = [...prev];
            next[activeIdx] = { ...next[activeIdx], [field]: value };
            return next;
        });
    }, [activeIdx]);

    const addShadow = () => {
        const next = [...shadows, defaultShadow()];
        setShadows(next);
        setActiveIdx(next.length - 1);
    };

    const removeShadow = (i) => {
        if (shadows.length === 1) return;
        const next = shadows.filter((_, idx) => idx !== i);
        setShadows(next);
        setActiveIdx(Math.max(0, i - 1));
    };

    const applyPreset = (preset) => {
        setShadows(preset.shadows.map(p => ({ ...p })));
        setActiveIdx(0);
    };

    const cssValue = buildCSS(shadows);
    const fullCSS = `box-shadow: ${cssValue};`;

    const copy = async () => {
        await navigator.clipboard.writeText(fullCSS);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const previewStyle = {
        boxShadow: shadows.map(shadowToCSS).join(', '),
    };

    return (
        <div className="max-w-[900px] mx-auto px-6 py-16">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-extrabold mb-2">
                    📐 Generador de <span className="bg-gradient-to-r from-[#48dbfb] to-[#0090ff] bg-clip-text text-transparent">Box Shadow CSS</span>
                </h1>
                <p className="text-[#8899aa]">Diseña sombras CSS perfectas con preview en vivo y código listo para copiar.</p>
            </div>

            {/* Preview */}
            <div className="flex items-center justify-center bg-[#0d1117] border border-white/[0.06] rounded-2xl p-16 mb-8">
                <div
                    className="w-48 h-32 rounded-2xl bg-gradient-to-br from-[#1a2332] to-[#0d1117] border border-white/[0.08] flex items-center justify-center"
                    style={previewStyle}
                >
                    <span className="text-xs text-[#5a6a7a] font-semibold">Preview</span>
                </div>
            </div>

            {/* Presets */}
            <div className="bg-[#0d1117] border border-white/[0.06] rounded-2xl p-4 mb-6">
                <p className="text-xs font-bold uppercase tracking-widest text-[#5a6a7a] mb-3">Presets</p>
                <div className="flex flex-wrap gap-2">
                    {PRESETS.map(preset => (
                        <button
                            key={preset.name}
                            onClick={() => applyPreset(preset)}
                            className="px-3 py-1.5 rounded-lg border border-white/[0.06] text-xs font-semibold text-[#8899aa] hover:border-[#0090ff]/20 hover:text-white transition"
                        >
                            {preset.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Shadow tabs */}
            <div className="bg-[#0d1117] border border-white/[0.06] rounded-2xl p-5 mb-6">
                <div className="flex items-center gap-2 mb-5 flex-wrap">
                    {shadows.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveIdx(i)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition border ${activeIdx === i ? 'bg-[#0090ff]/10 border-[#0090ff]/30 text-[#0090ff]' : 'border-white/[0.06] text-[#8899aa]'}`}
                        >
                            Sombra {i + 1}
                            {shadows.length > 1 && (
                                <span
                                    onClick={e => { e.stopPropagation(); removeShadow(i); }}
                                    className="ml-1 text-red-400/60 hover:text-red-400 leading-none"
                                >×</span>
                            )}
                        </button>
                    ))}
                    {shadows.length < 6 && (
                        <button
                            onClick={addShadow}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-dashed border-white/10 text-[#5a6a7a] hover:border-[#0090ff]/20 transition"
                        >
                            + Agregar
                        </button>
                    )}
                </div>

                {/* Controls for active shadow */}
                <div className="space-y-4">
                    <RangeRow label="Offset X" value={s.x} min={-50} max={50} onChange={v => updateActive('x', v)} />
                    <RangeRow label="Offset Y" value={s.y} min={-50} max={50} onChange={v => updateActive('y', v)} />
                    <RangeRow label="Blur" value={s.blur} min={0} max={100} onChange={v => updateActive('blur', v)} />
                    <RangeRow label="Spread" value={s.spread} min={-50} max={50} onChange={v => updateActive('spread', v)} />
                    <RangeRow label="Opacidad" value={s.opacity} min={0} max={1} onChange={v => updateActive('opacity', v)} unit="" />

                    <div className="flex items-center gap-4 pt-1">
                        <div className="flex items-center gap-3">
                            <span className="text-xs text-[#5a6a7a]">Color</span>
                            <input
                                type="color" value={s.color}
                                onChange={e => updateActive('color', e.target.value)}
                                className="w-8 h-8 rounded-lg border border-white/10 bg-transparent cursor-pointer"
                            />
                            <span className="text-xs font-mono text-[#8899aa]">{s.color}</span>
                        </div>
                        <button
                            onClick={() => updateActive('inset', !s.inset)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition ml-4
                                ${s.inset ? 'bg-[#0090ff]/10 border-[#0090ff]/30 text-[#0090ff]' : 'border-white/[0.06] text-[#8899aa]'}`}
                        >
                            <div className={`w-8 h-4 rounded-full relative transition-all ${s.inset ? 'bg-[#0090ff]' : 'bg-white/10'}`}>
                                <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${s.inset ? 'left-4.5' : 'left-0.5'}`} />
                            </div>
                            Inset
                        </button>
                    </div>
                </div>
            </div>

            {/* CSS Output */}
            <div className="bg-[#0d1117] border border-white/[0.06] rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-bold uppercase tracking-widest text-[#5a6a7a]">CSS Generado</p>
                    <button
                        onClick={copy}
                        className={`text-xs px-4 py-1.5 rounded-lg font-semibold transition ${copied ? 'bg-[#00e4b8]/10 border border-[#00e4b8]/30 text-[#00e4b8]' : 'bg-gradient-to-r from-[#0090ff] to-[#00bfff] text-white'}`}
                    >
                        {copied ? '✓ Copiado' : '📋 Copiar CSS'}
                    </button>
                </div>
                <pre className="font-mono text-sm text-[#00e4b8] bg-black/30 rounded-xl px-4 py-3 overflow-x-auto whitespace-pre-wrap">{fullCSS}</pre>
            </div>
        </div>
    );
}
