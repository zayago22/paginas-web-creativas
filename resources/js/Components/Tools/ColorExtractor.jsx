import { useState, useRef } from 'react';

function toHex(r, g, b) {
    return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('').toUpperCase();
}

function extractColors(img, count = 8) {
    const canvas = document.createElement('canvas');
    const size = 80;
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, size, size);
    const data = ctx.getImageData(0, 0, size, size).data;
    const colorMap = {};
    for (let i = 0; i < data.length; i += 4) {
        const r = Math.round(data[i] / 32) * 32;
        const g = Math.round(data[i+1] / 32) * 32;
        const b = Math.round(data[i+2] / 32) * 32;
        const key = `${r},${g},${b}`;
        colorMap[key] = (colorMap[key] || 0) + 1;
    }
    return Object.entries(colorMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, count)
        .map(([key]) => {
            const [r, g, b] = key.split(',').map(Number);
            return { r: Math.min(255, r), g: Math.min(255, g), b: Math.min(255, b) };
        });
}

export default function ColorExtractor() {
    const [image, setImage]     = useState(null);
    const [preview, setPreview] = useState(null);
    const [colors, setColors]   = useState([]);
    const [copied, setCopied]   = useState(null);
    const inputRef = useRef(null);
    const dropRef  = useRef(null);

    const loadFile = (file) => {
        if (!file || !file.type.startsWith('image/')) return;
        const url = URL.createObjectURL(file);
        setPreview(url);
        const img = new Image();
        img.onload = () => {
            setImage(img);
            setColors(extractColors(img));
        };
        img.src = url;
    };

    const copy = (hex, idx) => {
        navigator.clipboard.writeText(hex).then(() => {
            setCopied(idx);
            setTimeout(() => setCopied(null), 1500);
        });
    };

    if (!image) return (
        <div className="max-w-[900px] mx-auto px-6 py-16">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-extrabold mb-2">🎨 Extractor de <span className="bg-gradient-to-r from-[#0090ff] to-[#00e4b8] bg-clip-text text-transparent">Colores</span></h1>
                <p className="text-[#94a3b8]">Obtén la paleta de colores dominantes de cualquier imagen. 100% privado.</p>
            </div>
            <div ref={dropRef} onClick={() => inputRef.current?.click()}
                 onDragOver={e => { e.preventDefault(); dropRef.current?.classList.add('border-[#0090ff]'); }}
                 onDragLeave={() => dropRef.current?.classList.remove('border-[#0090ff]')}
                 onDrop={e => { e.preventDefault(); dropRef.current?.classList.remove('border-[#0090ff]'); loadFile(e.dataTransfer.files[0]); }}
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
        <div className="max-w-[900px] mx-auto px-6 py-16">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-extrabold">🎨 Paleta de Colores</h1>
                <button onClick={() => { setImage(null); setPreview(null); setColors([]); }}
                        className="px-4 py-2 rounded-lg border border-white/[0.08] text-sm text-[#94a3b8] hover:border-red-500/30 transition">✕ Nueva imagen</button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Preview */}
                <div className="bg-[#141d2f] border border-white/[0.08] rounded-2xl p-4">
                    <img src={preview} alt="preview" className="w-full rounded-xl object-contain max-h-80" />
                    {/* Color strip */}
                    <div className="flex mt-4 rounded-xl overflow-hidden h-8">
                        {colors.map((c, i) => (
                            <div key={i} className="flex-1 cursor-pointer hover:flex-[2] transition-all duration-300"
                                 style={{ background: toHex(c.r, c.g, c.b) }}
                                 onClick={() => copy(toHex(c.r, c.g, c.b), i)} />
                        ))}
                    </div>
                </div>

                {/* Color list */}
                <div className="space-y-3">
                    {colors.map((c, i) => {
                        const hex = toHex(c.r, c.g, c.b);
                        const isCopied = copied === i;
                        return (
                            <div key={i} className="flex items-center gap-4 bg-[#141d2f] border border-white/[0.08] rounded-xl p-3 hover:border-white/20 transition group">
                                <div className="w-12 h-12 rounded-xl shadow-lg shrink-0 border border-white/10"
                                     style={{ background: hex }} />
                                <div className="flex-1 min-w-0">
                                    <div className="font-bold font-mono text-sm">{hex}</div>
                                    <div className="text-xs text-[#64748b] mt-0.5">rgb({c.r}, {c.g}, {c.b})</div>
                                </div>
                                <button onClick={() => copy(hex, i)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition shrink-0 ${isCopied ? 'bg-[#00e4b8]/20 text-[#00e4b8]' : 'border border-white/[0.08] text-[#94a3b8] hover:border-[#0090ff]/30 hover:text-[#0090ff]'}`}>
                                    {isCopied ? '✓ Copiado' : 'Copiar'}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
