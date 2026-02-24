/**
 * Compresor de Imágenes — React Component
 *
 * Este componente es 100% client-side. Toda la compresión
 * se hace en el navegador usando Canvas API.
 *
 * Patrón: Cada herramienta es un componente React independiente
 * que se carga dinámicamente en Tools/Show.jsx
 */

import { useState, useRef, useCallback } from 'react';

export default function ImageCompressor() {
    const [files, setFiles] = useState([]);
    const [quality, setQuality] = useState(80);
    const [results, setResults] = useState([]);
    const [processing, setProcessing] = useState(false);
    const inputRef = useRef(null);
    const dropRef = useRef(null);

    const handleFiles = useCallback((fileList) => {
        const imageFiles = [...fileList].filter(f => f.type.startsWith('image/'));
        setFiles(imageFiles);
        setResults([]);
    }, []);

    const compressImage = (file, quality) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.naturalWidth;
                    canvas.height = img.naturalHeight;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0);

                    canvas.toBlob((blob) => {
                        resolve({
                            name: file.name,
                            originalSize: file.size,
                            compressedSize: blob.size,
                            savings: Math.round((1 - blob.size / file.size) * 100),
                            blob,
                            url: URL.createObjectURL(blob),
                        });
                    }, 'image/jpeg', quality / 100);
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        });
    };

    const handleCompress = async () => {
        setProcessing(true);
        const compressed = await Promise.all(
            files.map(f => compressImage(f, quality))
        );
        setResults(compressed);
        setProcessing(false);
    };

    const downloadFile = (result) => {
        const link = document.createElement('a');
        link.download = result.name.replace(/\.[^.]+$/, '-compressed.jpg');
        link.href = result.url;
        link.click();
    };

    const downloadAll = () => results.forEach(downloadFile);

    const formatSize = (bytes) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / 1048576).toFixed(2) + ' MB';
    };

    return (
        <div className="max-w-[900px] mx-auto px-6 py-16">
            {/* Header */}
            <div className="text-center mb-10">
                <h1 className="text-3xl font-extrabold mb-2">
                    🗜️ Compresor de <span className="bg-gradient-to-r from-[#0090ff] to-[#00e4b8] bg-clip-text text-transparent">Imágenes</span>
                </h1>
                <p className="text-[#94a3b8]">Reduce el peso de tus imágenes sin perder calidad visible. 100% privado.</p>
            </div>

            {/* Upload Area */}
            {files.length === 0 && (
                <div ref={dropRef}
                     onClick={() => inputRef.current?.click()}
                     onDragOver={(e) => { e.preventDefault(); dropRef.current?.classList.add('border-[#0090ff]', 'bg-[#0090ff]/5'); }}
                     onDragLeave={() => dropRef.current?.classList.remove('border-[#0090ff]', 'bg-[#0090ff]/5')}
                     onDrop={(e) => { e.preventDefault(); dropRef.current?.classList.remove('border-[#0090ff]', 'bg-[#0090ff]/5'); handleFiles(e.dataTransfer.files); }}
                     className="border-2 border-dashed border-[#0090ff]/20 rounded-2xl p-20 text-center cursor-pointer hover:border-[#0090ff]/40 hover:bg-[#0090ff]/3 transition-all">
                    <div className="text-4xl mb-4 opacity-50">📸</div>
                    <h3 className="text-lg font-bold mb-2">Arrastra tus imágenes aquí</h3>
                    <p className="text-[#94a3b8] text-sm mb-6">O haz clic para seleccionar. JPG, PNG, WebP.</p>
                    <button className="px-8 py-3 rounded-full bg-gradient-to-r from-[#0090ff] to-[#00bfff] text-white font-semibold text-sm hover:shadow-[0_6px_25px_rgba(0,144,255,.3)] transition-all">
                        Seleccionar Imágenes
                    </button>
                    <input ref={inputRef} type="file" accept="image/*" multiple hidden onChange={e => handleFiles(e.target.files)} />
                </div>
            )}

            {/* Controls */}
            {files.length > 0 && !results.length && (
                <div className="bg-[#141d2f] border border-white/[0.06] rounded-2xl p-8">
                    <div className="flex items-center justify-between mb-6">
                        <span className="text-sm text-[#94a3b8]">{files.length} imagen{files.length > 1 ? 'es' : ''} seleccionada{files.length > 1 ? 's' : ''}</span>
                        <button onClick={() => setFiles([])} className="text-sm text-red-400 hover:text-red-300">Limpiar</button>
                    </div>

                    <div className="mb-6">
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-[#94a3b8]">Calidad de compresión</span>
                            <span className="text-[#0090ff] font-semibold">{quality}%</span>
                        </div>
                        <input type="range" min="10" max="100" value={quality} onChange={e => setQuality(Number(e.target.value))}
                               className="w-full h-1 rounded-full bg-white/10 appearance-none cursor-pointer
                                          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
                                          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#0090ff] [&::-webkit-slider-thumb]:shadow-[0_2px_8px_rgba(0,144,255,.3)]" />
                    </div>

                    <button onClick={handleCompress} disabled={processing}
                            className="w-full py-4 rounded-xl bg-gradient-to-r from-[#0090ff] to-[#00bfff] text-white font-bold hover:shadow-[0_8px_30px_rgba(0,144,255,.3)] transition-all disabled:opacity-50">
                        {processing ? '⏳ Comprimiendo...' : `🗜️ Comprimir ${files.length} imagen${files.length > 1 ? 'es' : ''}`}
                    </button>
                </div>
            )}

            {/* Results */}
            {results.length > 0 && (
                <div className="bg-[#141d2f] border border-white/[0.06] rounded-2xl overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
                        <span className="font-bold text-[#00e4b8]">✓ {results.length} imágenes comprimidas</span>
                        <div className="flex gap-3">
                            <button onClick={downloadAll}
                                    className="px-5 py-2 rounded-lg bg-gradient-to-r from-[#0090ff] to-[#00bfff] text-white text-sm font-semibold hover:shadow-lg transition">
                                ⬇ Descargar todo
                            </button>
                            <button onClick={() => { setFiles([]); setResults([]); }}
                                    className="px-5 py-2 rounded-lg border border-white/[0.06] text-sm text-[#94a3b8] hover:border-[#0090ff]/20 transition">
                                Nuevas imágenes
                            </button>
                        </div>
                    </div>

                    <div className="divide-y divide-white/[0.04]">
                        {results.map((r, i) => (
                            <div key={i} className="flex items-center justify-between px-6 py-4 hover:bg-white/[0.02] transition">
                                <div className="flex-1 min-w-0">
                                    <div className="font-medium text-sm truncate">{r.name}</div>
                                    <div className="text-xs text-[#64748b] mt-1">
                                        {formatSize(r.originalSize)} → {formatSize(r.compressedSize)}
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className={`text-sm font-bold ${r.savings > 0 ? 'text-[#00e4b8]' : 'text-[#94a3b8]'}`}>
                                        -{r.savings}%
                                    </span>
                                    <button onClick={() => downloadFile(r)}
                                            className="px-4 py-1.5 rounded-lg border border-white/[0.06] text-xs font-medium text-[#94a3b8] hover:border-[#0090ff]/20 hover:text-[#0090ff] transition">
                                        ⬇ Descargar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
