import { useState, useRef, useEffect } from 'react';
import QRCode from 'qrcode';

const PRESETS = [
    { label: 'URL', prefix: 'https://', placeholder: 'https://misitioweb.com' },
    { label: 'WhatsApp', prefix: 'https://wa.me/', placeholder: 'https://wa.me/521...' },
    { label: 'Email', prefix: 'mailto:', placeholder: 'mailto:tu@email.com' },
    { label: 'Teléfono', prefix: 'tel:', placeholder: 'tel:+521...' },
    { label: 'WiFi', prefix: 'WIFI:T:WPA;S:', placeholder: 'WIFI:T:WPA;S:MiRed;P:MiClave;;' },
];

const SIZES = [200, 300, 500, 1000];
const LEVELS = ['L', 'M', 'Q', 'H'];

export default function QRGenerator() {
    const [text, setText]       = useState('https://paginaswebcreativas.com');
    const [size, setSize]       = useState(300);
    const [fgColor, setFgColor] = useState('#000000');
    const [bgColor, setBgColor] = useState('#ffffff');
    const [level, setLevel]     = useState('M');
    const [preset, setPreset]   = useState(0);
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!text.trim() || !canvasRef.current) return;
        QRCode.toCanvas(canvasRef.current, text, {
            width: Math.min(size, 400),
            color: { dark: fgColor, light: bgColor },
            errorCorrectionLevel: level,
            margin: 2,
        }).catch(() => {});
    }, [text, size, fgColor, bgColor, level]);

    const download = async () => {
        try {
            const dataUrl = await QRCode.toDataURL(text, {
                width: size,
                color: { dark: fgColor, light: bgColor },
                errorCorrectionLevel: level,
                margin: 2,
            });
            const a = document.createElement('a');
            a.download = `qr-${size}x${size}.png`;
            a.href = dataUrl; a.click();
        } catch {}
    };

    const applyPreset = (idx) => {
        setPreset(idx);
        setText(PRESETS[idx].prefix);
    };

    return (
        <div className="max-w-[900px] mx-auto px-6 py-16">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-extrabold mb-2">📱 Generador de <span className="bg-gradient-to-r from-[#0090ff] to-[#00e4b8] bg-clip-text text-transparent">QR</span></h1>
                <p className="text-[#94a3b8]">Genera códigos QR personalizados al instante. 100% privado.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Controls */}
                <div className="space-y-4">
                    {/* Presets */}
                    <div className="bg-[#141d2f] border border-white/[0.08] rounded-2xl p-5">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-[#94a3b8] mb-3">Tipo de contenido</h3>
                        <div className="flex flex-wrap gap-2">
                            {PRESETS.map((p, i) => (
                                <button key={i} onClick={() => applyPreset(i)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${preset===i ? 'bg-[#0090ff] text-white' : 'border border-white/[0.08] text-[#94a3b8] hover:border-[#0090ff]/30'}`}>
                                    {p.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Text input */}
                    <div className="bg-[#141d2f] border border-white/[0.08] rounded-2xl p-5">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-[#94a3b8] mb-3">Contenido</h3>
                        <textarea value={text} onChange={e => setText(e.target.value)}
                                  placeholder={PRESETS[preset]?.placeholder}
                                  rows={3}
                                  className="w-full bg-white/5 border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#0090ff]/50 resize-none placeholder-[#64748b]" />
                    </div>

                    {/* Size */}
                    <div className="bg-[#141d2f] border border-white/[0.08] rounded-2xl p-5">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-[#94a3b8] mb-3">Tamaño de descarga</h3>
                        <div className="flex gap-2">
                            {SIZES.map(s => (
                                <button key={s} onClick={() => setSize(s)}
                                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${size===s ? 'bg-[#0090ff] text-white' : 'border border-white/[0.08] text-[#94a3b8] hover:border-[#0090ff]/30'}`}>
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Colors + Level */}
                    <div className="bg-[#141d2f] border border-white/[0.08] rounded-2xl p-5">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-[#94a3b8] mb-3">Personalización</h3>
                        <div className="flex gap-4 mb-4">
                            <div className="flex-1">
                                <label className="text-xs text-[#94a3b8] mb-1 block">Color QR</label>
                                <div className="flex items-center gap-2 bg-white/5 border border-white/[0.08] rounded-lg px-3 py-2">
                                    <input type="color" value={fgColor} onChange={e => setFgColor(e.target.value)} className="w-6 h-6 rounded cursor-pointer bg-transparent border-0" />
                                    <span className="text-sm font-mono text-white">{fgColor}</span>
                                </div>
                            </div>
                            <div className="flex-1">
                                <label className="text-xs text-[#94a3b8] mb-1 block">Fondo</label>
                                <div className="flex items-center gap-2 bg-white/5 border border-white/[0.08] rounded-lg px-3 py-2">
                                    <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-6 h-6 rounded cursor-pointer bg-transparent border-0" />
                                    <span className="text-sm font-mono text-white">{bgColor}</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="text-xs text-[#94a3b8] mb-2 block">Corrección de error</label>
                            <div className="flex gap-2">
                                {LEVELS.map(l => (
                                    <button key={l} onClick={() => setLevel(l)}
                                            className={`flex-1 py-2 rounded-lg text-sm font-bold transition ${level===l ? 'bg-[#0090ff] text-white' : 'border border-white/[0.08] text-[#94a3b8] hover:border-[#0090ff]/30'}`}>
                                        {l}
                                    </button>
                                ))}
                            </div>
                            <p className="text-xs text-[#64748b] mt-1">L=7% · M=15% · Q=25% · H=30% de corrección</p>
                        </div>
                    </div>
                </div>

                {/* QR Preview */}
                <div className="flex flex-col">
                    <div className="bg-[#141d2f] border border-white/[0.08] rounded-2xl p-6 flex flex-col items-center justify-center flex-1 min-h-[300px]">
                        <div className="rounded-2xl overflow-hidden shadow-2xl mb-6">
                            <canvas ref={canvasRef} />
                        </div>
                        <button onClick={download} disabled={!text.trim()}
                                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#0090ff] to-[#00bfff] text-white font-bold hover:shadow-[0_8px_30px_rgba(0,144,255,.3)] transition-all disabled:opacity-40">
                            ⬇ Descargar PNG ({size}×{size}px)
                        </button>
                        <p className="text-xs text-[#64748b] mt-3 text-center">Los cambios se aplican en tiempo real</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
