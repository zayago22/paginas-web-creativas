import { useState, useRef, useCallback } from 'react';
import { PDFDocument } from 'pdf-lib';

function formatSize(bytes) {
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(2) + ' MB';
}

async function getPDFPageCount(file) {
    try {
        const buf = await file.arrayBuffer();
        const pdf = await PDFDocument.load(buf);
        return pdf.getPageCount();
    } catch {
        return null;
    }
}

export default function PDFMerge() {
    const [pdfs, setPdfs] = useState([]);
    const [merging, setMerging] = useState(false);
    const [error, setError] = useState('');
    const inputRef = useRef(null);
    const dropRef = useRef(null);
    const dragIdxRef = useRef(null);

    const handleFiles = useCallback(async (fileList) => {
        const files = [...fileList].filter(f => f.type === 'application/pdf' || f.name.endsWith('.pdf'));
        if (!files.length) return;
        const newItems = await Promise.all(files.map(async f => ({
            file: f,
            pages: await getPDFPageCount(f),
        })));
        setPdfs(prev => {
            const combined = [...prev, ...newItems];
            return combined.slice(0, 20);
        });
        setError('');
    }, []);

    const remove = (i) => setPdfs(prev => prev.filter((_, idx) => idx !== i));

    const move = (from, to) => {
        setPdfs(prev => {
            const arr = [...prev];
            const [item] = arr.splice(from, 1);
            arr.splice(to, 0, item);
            return arr;
        });
    };

    const merge = async () => {
        if (pdfs.length < 2) {
            setError('Agrega al menos 2 PDFs para unirlos.');
            return;
        }
        setMerging(true);
        setError('');
        try {
            const merged = await PDFDocument.create();
            for (const { file } of pdfs) {
                const buf = await file.arrayBuffer();
                let src;
                try {
                    src = await PDFDocument.load(buf);
                } catch {
                    setError(`No se pudo leer "${file.name}". Puede estar encriptado o corrupto.`);
                    setMerging(false);
                    return;
                }
                const pages = await merged.copyPages(src, src.getPageIndices());
                pages.forEach(p => merged.addPage(p));
            }
            const bytes = await merged.save();
            const blob = new Blob([bytes], { type: 'application/pdf' });
            const link = document.createElement('a');
            link.download = 'unido.pdf';
            link.href = URL.createObjectURL(blob);
            link.click();
            URL.revokeObjectURL(link.href);
        } catch (e) {
            setError('Error al unir los PDFs. Verifica que no estén encriptados.');
        } finally {
            setMerging(false);
        }
    };

    const totalPages = pdfs.reduce((acc, p) => acc + (p.pages || 0), 0);
    const totalSize = pdfs.reduce((acc, p) => acc + p.file.size, 0);

    return (
        <div className="max-w-[800px] mx-auto px-6 py-16">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-extrabold mb-2">
                    📎 Unir <span className="bg-gradient-to-r from-[#00bfff] to-[#0090ff] bg-clip-text text-transparent">PDFs</span>
                </h1>
                <p className="text-[#8899aa]">Combina varios PDFs en uno solo. Arrastra para reordenar. Máx. 20 archivos.</p>
            </div>

            {/* Drop zone */}
            <div
                ref={dropRef}
                onClick={() => inputRef.current?.click()}
                onDragOver={e => { e.preventDefault(); dropRef.current?.classList.add('border-[#00bfff]', 'bg-[#00bfff]/5'); }}
                onDragLeave={() => dropRef.current?.classList.remove('border-[#00bfff]', 'bg-[#00bfff]/5')}
                onDrop={e => { e.preventDefault(); dropRef.current?.classList.remove('border-[#00bfff]', 'bg-[#00bfff]/5'); handleFiles(e.dataTransfer.files); }}
                className="border-2 border-dashed border-[#00bfff]/20 rounded-2xl p-12 text-center cursor-pointer hover:border-[#00bfff]/40 hover:bg-[#00bfff]/3 transition-all mb-6"
            >
                <div className="text-4xl mb-3 opacity-50">📎</div>
                <p className="font-semibold mb-1">Arrastra tus PDFs aquí</p>
                <p className="text-[#8899aa] text-sm">{pdfs.length > 0 ? `${pdfs.length} archivo${pdfs.length > 1 ? 's' : ''} cargado${pdfs.length > 1 ? 's' : ''} — Haz clic para agregar más` : 'Puedes subir varios a la vez'}</p>
                <input ref={inputRef} type="file" accept="application/pdf" multiple hidden onChange={e => handleFiles(e.target.files)} />
            </div>

            {pdfs.length > 0 && (
                <>
                    <div className="bg-[#0d1117] border border-white/[0.06] rounded-2xl overflow-hidden mb-6">
                        <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
                            <p className="text-xs font-bold uppercase tracking-widest text-[#5a6a7a]">Orden de unión — Arrastra para reordenar</p>
                            <div className="text-xs text-[#5a6a7a]">{totalPages} páginas · {formatSize(totalSize)}</div>
                        </div>
                        <div className="divide-y divide-white/[0.04]">
                            {pdfs.map(({ file, pages }, i) => (
                                <div
                                    key={file.name + i}
                                    draggable
                                    onDragStart={() => { dragIdxRef.current = i; }}
                                    onDragOver={e => e.preventDefault()}
                                    onDrop={e => { e.preventDefault(); if (dragIdxRef.current !== null && dragIdxRef.current !== i) move(dragIdxRef.current, i); dragIdxRef.current = null; }}
                                    className="flex items-center gap-4 px-5 py-4 hover:bg-white/[0.02] transition cursor-grab active:cursor-grabbing"
                                >
                                    <div className="text-[#5a6a7a] text-sm w-5 text-center flex-shrink-0">⣿</div>
                                    <div className="w-8 h-10 rounded-lg bg-[#ff6b6b]/10 border border-[#ff6b6b]/20 flex items-center justify-center text-base flex-shrink-0">📄</div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold truncate">{file.name}</p>
                                        <p className="text-xs text-[#5a6a7a]">{formatSize(file.size)}{pages !== null ? ` · ${pages} página${pages !== 1 ? 's' : ''}` : ''}</p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {i > 0 && <button onClick={() => move(i, i - 1)} className="w-7 h-7 rounded border border-white/[0.06] text-[#5a6a7a] hover:text-white hover:border-white/[0.12] transition text-xs flex items-center justify-center">↑</button>}
                                        {i < pdfs.length - 1 && <button onClick={() => move(i, i + 1)} className="w-7 h-7 rounded border border-white/[0.06] text-[#5a6a7a] hover:text-white hover:border-white/[0.12] transition text-xs flex items-center justify-center">↓</button>}
                                        <button onClick={() => remove(i)} className="w-7 h-7 rounded border border-white/[0.06] text-red-400/60 hover:text-red-400 hover:border-red-400/20 transition text-sm flex items-center justify-center">×</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {error && <p className="text-sm text-red-400 bg-red-400/5 border border-red-400/20 rounded-xl px-4 py-3 mb-4">{error}</p>}

                    <button
                        onClick={merge}
                        disabled={merging || pdfs.length < 2}
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-[#0090ff] to-[#00bfff] text-white font-bold text-base hover:shadow-[0_8px_30px_rgba(0,144,255,.3)] transition-all disabled:opacity-50"
                    >
                        {merging ? '⏳ Uniendo PDFs...' : `📎 Unir ${pdfs.length} PDFs en uno solo`}
                    </button>
                </>
            )}
        </div>
    );
}
