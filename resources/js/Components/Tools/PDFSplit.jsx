import { useState, useRef, useCallback } from 'react';
import { PDFDocument } from 'pdf-lib';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

function parsePageInput(input, total) {
    const pages = new Set();
    const parts = input.split(',').map(s => s.trim()).filter(Boolean);
    for (const part of parts) {
        if (part.includes('-')) {
            const [a, b] = part.split('-').map(Number);
            for (let i = Math.max(1, a); i <= Math.min(total, b); i++) pages.add(i);
        } else {
            const n = Number(part);
            if (n >= 1 && n <= total) pages.add(n);
        }
    }
    return [...pages].sort((a, b) => a - b);
}

async function extractPages(srcPdf, pageNumbers) {
    const merged = await PDFDocument.create();
    const pages = await merged.copyPages(srcPdf, pageNumbers.map(n => n - 1));
    pages.forEach(p => merged.addPage(p));
    return merged.save();
}

function formatSize(bytes) {
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(2) + ' MB';
}

export default function PDFSplit() {
    const [file, setFile] = useState(null);
    const [srcPdf, setSrcPdf] = useState(null);
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState('');
    const [mode, setMode] = useState('custom'); // 'custom' | 'every' | 'half'
    const [pageInput, setPageInput] = useState('');
    const [everyN, setEveryN] = useState(1);
    const [selected, setSelected] = useState(new Set());
    const [splitting, setSplitting] = useState(false);
    const [results, setResults] = useState([]);
    const inputRef = useRef(null);
    const dropRef = useRef(null);

    const handleFile = useCallback(async (f) => {
        if (!f || f.type !== 'application/pdf') return;
        setError('');
        setResults([]);
        setSelected(new Set());
        try {
            const buf = await f.arrayBuffer();
            const pdf = await PDFDocument.load(buf);
            setFile(f);
            setSrcPdf(pdf);
            setTotalPages(pdf.getPageCount());
        } catch {
            setError('No se pudo cargar el PDF. Puede estar encriptado o corrupto.');
        }
    }, []);

    const togglePage = (n) => {
        setSelected(prev => {
            const next = new Set(prev);
            if (next.has(n)) next.delete(n); else next.add(n);
            return next;
        });
    };

    const split = async () => {
        if (!srcPdf) return;
        setSplitting(true);
        setError('');
        try {
            let parts = [];

            if (mode === 'custom') {
                const pages = selected.size > 0 ? [...selected].sort((a, b) => a - b)
                    : parsePageInput(pageInput, totalPages);
                if (!pages.length) { setError('Especifica las páginas a extraer.'); setSplitting(false); return; }
                parts = [{ name: 'paginas-extraidas.pdf', pages }];
            } else if (mode === 'every') {
                const n = Math.max(1, everyN);
                for (let i = 1; i <= totalPages; i += n) {
                    const pages = [];
                    for (let j = i; j < i + n && j <= totalPages; j++) pages.push(j);
                    parts.push({ name: `parte-${parts.length + 1}.pdf`, pages });
                }
            } else if (mode === 'half') {
                const mid = Math.floor(totalPages / 2);
                parts = [
                    { name: 'parte-1.pdf', pages: Array.from({ length: mid }, (_, i) => i + 1) },
                    { name: 'parte-2.pdf', pages: Array.from({ length: totalPages - mid }, (_, i) => mid + i + 1) },
                ];
            }

            if (parts.length === 1) {
                const bytes = await extractPages(srcPdf, parts[0].pages);
                const blob = new Blob([bytes], { type: 'application/pdf' });
                saveAs(blob, parts[0].name);
            } else {
                const zip = new JSZip();
                for (const part of parts) {
                    const bytes = await extractPages(srcPdf, part.pages);
                    zip.file(part.name, bytes);
                }
                const zipBlob = await zip.generateAsync({ type: 'blob' });
                saveAs(zipBlob, 'partes-pdf.zip');
            }
            setResults(parts);
        } catch (e) {
            setError('Error al dividir el PDF.');
        } finally {
            setSplitting(false);
        }
    };

    return (
        <div className="max-w-[900px] mx-auto px-6 py-16">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-extrabold mb-2">
                    ✂️ Dividir <span className="bg-gradient-to-r from-[#feca57] to-[#ff6b6b] bg-clip-text text-transparent">PDF</span>
                </h1>
                <p className="text-[#8899aa]">Separa páginas de un PDF. Extrae solo las que necesitas o divide en partes.</p>
            </div>

            {!file ? (
                <div
                    ref={dropRef}
                    onClick={() => inputRef.current?.click()}
                    onDragOver={e => { e.preventDefault(); dropRef.current?.classList.add('border-[#feca57]', 'bg-[#feca57]/5'); }}
                    onDragLeave={() => dropRef.current?.classList.remove('border-[#feca57]', 'bg-[#feca57]/5')}
                    onDrop={e => { e.preventDefault(); dropRef.current?.classList.remove('border-[#feca57]', 'bg-[#feca57]/5'); handleFile(e.dataTransfer.files[0]); }}
                    className="border-2 border-dashed border-[#feca57]/20 rounded-2xl p-20 text-center cursor-pointer hover:border-[#feca57]/40 hover:bg-[#feca57]/3 transition-all"
                >
                    <div className="text-5xl mb-4 opacity-50">✂️</div>
                    <h3 className="text-lg font-bold mb-2">Arrastra tu PDF aquí</h3>
                    <p className="text-[#8899aa] text-sm mb-6">Un solo PDF. Máximo 50MB.</p>
                    <button className="px-8 py-3 rounded-full bg-gradient-to-r from-[#feca57] to-[#ff6b6b] text-[#0d1117] font-semibold text-sm">Seleccionar PDF</button>
                    <input ref={inputRef} type="file" accept="application/pdf" hidden onChange={e => handleFile(e.target.files[0])} />
                </div>
            ) : (
                <div className="space-y-6">
                    {/* File info */}
                    <div className="bg-[#0d1117] border border-white/[0.06] rounded-2xl px-5 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">📄</span>
                            <div>
                                <p className="font-semibold text-sm">{file.name}</p>
                                <p className="text-xs text-[#5a6a7a]">{totalPages} páginas · {formatSize(file.size)}</p>
                            </div>
                        </div>
                        <button onClick={() => { setFile(null); setSrcPdf(null); setTotalPages(0); setResults([]); setSelected(new Set()); }} className="text-sm text-[#5a6a7a] hover:text-white transition">✕ Cambiar</button>
                    </div>

                    {/* Mode selector */}
                    <div className="bg-[#0d1117] border border-white/[0.06] rounded-2xl p-5">
                        <p className="text-xs font-bold uppercase tracking-widest text-[#5a6a7a] mb-4">Modo de división</p>
                        <div className="grid sm:grid-cols-3 gap-3">
                            {[
                                { k: 'custom', label: '✏️ Páginas específicas', desc: 'Selecciona páginas o escribe rangos' },
                                { k: 'every', label: '📦 Cada N páginas', desc: 'Divide en grupos de N páginas' },
                                { k: 'half', label: '⚡ Dos mitades', desc: 'Divide el PDF en 2 partes iguales' },
                            ].map(m => (
                                <button
                                    key={m.k}
                                    onClick={() => setMode(m.k)}
                                    className={`text-left p-4 rounded-xl border transition ${mode === m.k ? 'bg-[#feca57]/5 border-[#feca57]/30' : 'border-white/[0.06] hover:border-white/10'}`}
                                >
                                    <p className="font-semibold text-sm mb-1">{m.label}</p>
                                    <p className="text-xs text-[#5a6a7a]">{m.desc}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Mode-specific controls */}
                    {mode === 'custom' && (
                        <div className="bg-[#0d1117] border border-white/[0.06] rounded-2xl p-5 space-y-4">
                            <div>
                                <label className="text-sm text-[#8899aa] mb-2 block">Páginas a extraer (ej: 1, 3, 5-8)</label>
                                <input
                                    value={pageInput}
                                    onChange={e => setPageInput(e.target.value)}
                                    className="w-full bg-black/30 border border-white/[0.06] rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#5a6a7a] focus:outline-none focus:border-[#feca57]/30"
                                    placeholder={`Ej: 1, 3, 5-8, 10 (total: ${totalPages} páginas)`}
                                />
                            </div>
                            <div>
                                <p className="text-sm text-[#8899aa] mb-3">O haz clic para seleccionar páginas:</p>
                                <div className="grid grid-cols-6 sm:grid-cols-10 gap-1.5">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                                        <button
                                            key={n}
                                            onClick={() => togglePage(n)}
                                            className={`aspect-square rounded-lg text-xs font-bold transition border ${selected.has(n) ? 'bg-[#feca57]/20 border-[#feca57]/40 text-[#feca57]' : 'border-white/[0.06] text-[#5a6a7a] hover:border-white/10'}`}
                                        >
                                            {n}
                                        </button>
                                    ))}
                                </div>
                                {selected.size > 0 && <p className="text-xs text-[#feca57] mt-2">Seleccionadas: {[...selected].sort((a,b)=>a-b).join(', ')}</p>}
                            </div>
                        </div>
                    )}

                    {mode === 'every' && (
                        <div className="bg-[#0d1117] border border-white/[0.06] rounded-2xl p-5">
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-[#8899aa]">Dividir cada</span>
                                <input
                                    type="number" min="1" max={totalPages}
                                    value={everyN} onChange={e => setEveryN(Number(e.target.value))}
                                    className="w-20 bg-black/30 border border-white/[0.06] rounded-xl px-3 py-2 text-sm text-white text-center focus:outline-none focus:border-[#feca57]/30"
                                />
                                <span className="text-sm text-[#8899aa]">página{everyN !== 1 ? 's' : ''} → {Math.ceil(totalPages / Math.max(1, everyN))} archivo{Math.ceil(totalPages / Math.max(1, everyN)) !== 1 ? 's' : ''}</span>
                            </div>
                        </div>
                    )}

                    {error && <p className="text-sm text-red-400 bg-red-400/5 border border-red-400/20 rounded-xl px-4 py-3">{error}</p>}

                    {results.length > 0 && (
                        <div className="bg-[#00e4b8]/5 border border-[#00e4b8]/20 rounded-xl px-4 py-3">
                            <p className="text-[#00e4b8] text-sm font-semibold">✓ Descargado: {results.length} archivo{results.length > 1 ? 's' : ''} zipado{results.length > 1 ? 's' : ''}</p>
                        </div>
                    )}

                    <div className="flex gap-4">
                        <button
                            onClick={split}
                            disabled={splitting}
                            className="flex-1 py-4 rounded-xl bg-gradient-to-r from-[#feca57] to-[#ff6b6b] text-[#0d1117] font-bold text-base hover:shadow-[0_8px_30px_rgba(254,202,87,.3)] transition-all disabled:opacity-50"
                        >
                            {splitting ? '⏳ Procesando...' : '✂️ Dividir y Descargar'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
