import { useState, useRef, useCallback } from 'react';
import { PDFDocument } from 'pdf-lib';

const PAGE_SIZES = {
    a4: { width: 595.28, height: 841.89, label: 'A4' },
    letter: { width: 612, height: 792, label: 'Carta' },
    fit: { width: null, height: null, label: 'Ajustar a imagen' },
};

const MARGINS = {
    none: 0,
    small: 18,
    medium: 36,
};

function formatSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(2) + ' MB';
}

function fileToBase64(file) {
    return new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = e => resolve(e.target.result);
        reader.readAsDataURL(file);
    });
}

function getImageDimensions(file) {
    return new Promise(resolve => {
        const url = URL.createObjectURL(file);
        const img = new Image();
        img.onload = () => { resolve({ w: img.naturalWidth, h: img.naturalHeight }); URL.revokeObjectURL(url); };
        img.src = url;
    });
}

async function fileToArrayBuffer(file) {
    return new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = e => resolve(e.target.result);
        reader.readAsArrayBuffer(file);
    });
}

async function convertImageToJpeg(file, quality) {
    return new Promise(resolve => {
        const url = URL.createObjectURL(file);
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            canvas.getContext('2d').drawImage(img, 0, 0);
            canvas.toBlob(blob => {
                blob.arrayBuffer().then(buf => { URL.revokeObjectURL(url); resolve(buf); });
            }, 'image/jpeg', quality);
        };
        img.src = url;
    });
}

export default function ImageToPDF() {
    const [images, setImages] = useState([]);
    const [pageSize, setPageSize] = useState('a4');
    const [orientation, setOrientation] = useState('auto');
    const [margin, setMargin] = useState('none');
    const [quality, setQuality] = useState(85);
    const [generating, setGenerating] = useState(false);
    const inputRef = useRef(null);
    const dropRef = useRef(null);
    const dragIdxRef = useRef(null);

    const handleFiles = useCallback((fileList) => {
        const imgs = [...fileList].filter(f => f.type.startsWith('image/'));
        setImages(prev => [...prev, ...imgs.map(f => ({ file: f, url: URL.createObjectURL(f) }))]);
    }, []);

    const removeImage = (i) => setImages(prev => prev.filter((_, idx) => idx !== i));

    const moveImage = (from, to) => {
        setImages(prev => {
            const arr = [...prev];
            const [item] = arr.splice(from, 1);
            arr.splice(to, 0, item);
            return arr;
        });
    };

    const generate = async () => {
        if (!images.length) return;
        setGenerating(true);
        try {
            const pdf = await PDFDocument.create();
            const marginPx = MARGINS[margin];

            for (const { file } of images) {
                const dims = await getImageDimensions(file);
                const type = file.type;

                let imgBytes, pdfImage;
                if (type === 'image/png') {
                    imgBytes = await fileToArrayBuffer(file);
                    pdfImage = await pdf.embedPng(imgBytes);
                } else {
                    imgBytes = await convertImageToJpeg(file, quality / 100);
                    pdfImage = await pdf.embedJpg(imgBytes);
                }

                let pageW, pageH;
                if (pageSize === 'fit') {
                    pageW = dims.w * 0.75 + marginPx * 2; // px to pt approx
                    pageH = dims.h * 0.75 + marginPx * 2;
                } else {
                    pageW = PAGE_SIZES[pageSize].width;
                    pageH = PAGE_SIZES[pageSize].height;
                }

                // Apply orientation
                let finalW = pageW, finalH = pageH;
                if (orientation === 'landscape') { finalW = Math.max(pageW, pageH); finalH = Math.min(pageW, pageH); }
                else if (orientation === 'portrait') { finalW = Math.min(pageW, pageH); finalH = Math.max(pageW, pageH); }
                else if (orientation === 'auto') {
                    const imgLandscape = dims.w > dims.h;
                    if (imgLandscape) { finalW = Math.max(pageW, pageH); finalH = Math.min(pageW, pageH); }
                    else { finalW = Math.min(pageW, pageH); finalH = Math.max(pageW, pageH); }
                }

                const page = pdf.addPage([finalW, finalH]);
                const drawW = finalW - marginPx * 2;
                const drawH = finalH - marginPx * 2;
                const scale = Math.min(drawW / dims.w, drawH / dims.h);
                const w = dims.w * scale;
                const h = dims.h * scale;
                const x = marginPx + (drawW - w) / 2;
                const y = marginPx + (drawH - h) / 2;
                page.drawImage(pdfImage, { x, y, width: w, height: h });
            }

            const bytes = await pdf.save();
            const blob = new Blob([bytes], { type: 'application/pdf' });
            const link = document.createElement('a');
            link.download = 'imagenes.pdf';
            link.href = URL.createObjectURL(blob);
            link.click();
            URL.revokeObjectURL(link.href);
        } finally {
            setGenerating(false);
        }
    };

    return (
        <div className="max-w-[900px] mx-auto px-6 py-16">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-extrabold mb-2">
                    🖼️ Imagen a <span className="bg-gradient-to-r from-[#6c5ce7] to-[#a29bfe] bg-clip-text text-transparent">PDF</span>
                </h1>
                <p className="text-[#8899aa]">Convierte tus imágenes a un documento PDF. Ordénalas, ajusta el tamaño y descarga al instante.</p>
            </div>

            {/* Upload */}
            <div
                ref={dropRef}
                onClick={() => inputRef.current?.click()}
                onDragOver={e => { e.preventDefault(); dropRef.current?.classList.add('border-[#6c5ce7]', 'bg-[#6c5ce7]/5'); }}
                onDragLeave={() => dropRef.current?.classList.remove('border-[#6c5ce7]', 'bg-[#6c5ce7]/5')}
                onDrop={e => { e.preventDefault(); dropRef.current?.classList.remove('border-[#6c5ce7]', 'bg-[#6c5ce7]/5'); handleFiles(e.dataTransfer.files); }}
                className="border-2 border-dashed border-[#6c5ce7]/20 rounded-2xl p-10 text-center cursor-pointer hover:border-[#6c5ce7]/40 hover:bg-[#6c5ce7]/3 transition-all mb-6"
            >
                <div className="text-4xl mb-3 opacity-50">🖼️</div>
                <p className="font-semibold mb-1">Arrastra imágenes aquí</p>
                <p className="text-[#8899aa] text-sm">JPG, PNG, WebP — Puedes agregar más después</p>
                <input ref={inputRef} type="file" accept="image/*" multiple hidden onChange={e => handleFiles(e.target.files)} />
            </div>

            {images.length > 0 && (
                <>
                    {/* Image list */}
                    <div className="bg-[#0d1117] border border-white/[0.06] rounded-2xl p-5 mb-6">
                        <div className="flex items-center justify-between mb-3">
                            <p className="text-xs font-bold uppercase tracking-widest text-[#5a6a7a]">Imágenes ({images.length}) — Arrastra para reordenar</p>
                            <button onClick={() => inputRef.current?.click()} className="text-xs px-3 py-1.5 rounded-lg border border-white/[0.06] text-[#8899aa] hover:border-[#6c5ce7]/20 transition">+ Agregar más</button>
                        </div>
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                            {images.map(({ file, url }, i) => (
                                <div
                                    key={url}
                                    draggable
                                    onDragStart={() => { dragIdxRef.current = i; }}
                                    onDragOver={e => e.preventDefault()}
                                    onDrop={e => { e.preventDefault(); if (dragIdxRef.current !== null && dragIdxRef.current !== i) moveImage(dragIdxRef.current, i); dragIdxRef.current = null; }}
                                    className="relative group rounded-xl overflow-hidden border border-white/[0.06] cursor-grab active:cursor-grabbing aspect-square"
                                >
                                    <img src={url} alt="" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center flex-col gap-1">
                                        <span className="text-white text-xs font-bold">{i + 1}</span>
                                        <button onClick={e => { e.stopPropagation(); removeImage(i); }} className="text-red-400 text-lg leading-none">×</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Options */}
                    <div className="grid sm:grid-cols-3 gap-4 mb-6">
                        <div className="bg-[#0d1117] border border-white/[0.06] rounded-2xl p-4">
                            <p className="text-xs text-[#5a6a7a] font-bold uppercase mb-3">Tamaño de página</p>
                            {Object.entries(PAGE_SIZES).map(([k, v]) => (
                                <button key={k} onClick={() => setPageSize(k)} className={`w-full text-left px-3 py-2 rounded-lg text-sm mb-1 transition border ${pageSize === k ? 'bg-[#6c5ce7]/10 border-[#6c5ce7]/30 text-[#a29bfe]' : 'border-transparent text-[#8899aa]'}`}>{v.label}</button>
                            ))}
                        </div>
                        <div className="bg-[#0d1117] border border-white/[0.06] rounded-2xl p-4">
                            <p className="text-xs text-[#5a6a7a] font-bold uppercase mb-3">Orientación</p>
                            {[['auto', '↕ Automática'], ['portrait', '↕ Vertical'], ['landscape', '↔ Horizontal']].map(([k, l]) => (
                                <button key={k} onClick={() => setOrientation(k)} className={`w-full text-left px-3 py-2 rounded-lg text-sm mb-1 transition border ${orientation === k ? 'bg-[#6c5ce7]/10 border-[#6c5ce7]/30 text-[#a29bfe]' : 'border-transparent text-[#8899aa]'}`}>{l}</button>
                            ))}
                        </div>
                        <div className="bg-[#0d1117] border border-white/[0.06] rounded-2xl p-4">
                            <p className="text-xs text-[#5a6a7a] font-bold uppercase mb-3">Margen</p>
                            {[['none', 'Sin margen'], ['small', 'Pequeño (0.6cm)'], ['medium', 'Mediano (1.3cm)']].map(([k, l]) => (
                                <button key={k} onClick={() => setMargin(k)} className={`w-full text-left px-3 py-2 rounded-lg text-sm mb-1 transition border ${margin === k ? 'bg-[#6c5ce7]/10 border-[#6c5ce7]/30 text-[#a29bfe]' : 'border-transparent text-[#8899aa]'}`}>{l}</button>
                            ))}
                            <div className="mt-3">
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-[#8899aa]">Calidad JPG</span>
                                    <span className="text-[#6c5ce7] font-semibold">{quality}%</span>
                                </div>
                                <input type="range" min="30" max="100" value={quality} onChange={e => setQuality(Number(e.target.value))}
                                    className="w-full h-1 rounded-full bg-white/10 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#6c5ce7]" />
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={generate}
                        disabled={generating}
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-[#6c5ce7] to-[#a29bfe] text-white font-bold text-base hover:shadow-[0_8px_30px_rgba(108,92,231,.3)] transition-all disabled:opacity-50"
                    >
                        {generating ? '⏳ Generando PDF...' : `📄 Convertir ${images.length} imagen${images.length > 1 ? 'es' : ''} a PDF`}
                    </button>
                </>
            )}
        </div>
    );
}
