import { useState, useRef, useEffect, useCallback } from 'react';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

const ASPECT_RATIOS = [
    { label: 'Libre', value: NaN },
    { label: '1:1', value: 1 },
    { label: '16:9', value: 16 / 9 },
    { label: '9:16', value: 9 / 16 },
    { label: '4:3', value: 4 / 3 },
    { label: '3:2', value: 3 / 2 },
];

export default function ImageCropper() {
    const [imgSrc, setImgSrc] = useState(null);
    const [format, setFormat] = useState('image/png');
    const [quality, setQuality] = useState(90);
    const [aspectRatio, setAspectRatio] = useState(NaN);
    const [cropping, setCropping] = useState(false);
    const imgRef = useRef(null);
    const cropperRef = useRef(null);
    const inputRef = useRef(null);
    const dropRef = useRef(null);

    const handleFile = useCallback((file) => {
        if (!file || !file.type.startsWith('image/')) return;
        if (cropperRef.current) {
            cropperRef.current.destroy();
            cropperRef.current = null;
        }
        const reader = new FileReader();
        reader.onload = e => setImgSrc(e.target.result);
        reader.readAsDataURL(file);
    }, []);

    useEffect(() => {
        if (!imgSrc || !imgRef.current) return;
        if (cropperRef.current) {
            cropperRef.current.destroy();
        }
        cropperRef.current = new Cropper(imgRef.current, {
            aspectRatio: isNaN(aspectRatio) ? NaN : aspectRatio,
            viewMode: 1,
            autoCropArea: 0.8,
            background: false,
            guides: true,
            center: true,
            highlight: true,
            cropBoxMovable: true,
            cropBoxResizable: true,
            toggleDragModeOnDblclick: false,
        });
        return () => {
            cropperRef.current?.destroy();
            cropperRef.current = null;
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imgSrc]);

    const setRatio = (value) => {
        setAspectRatio(value);
        cropperRef.current?.setAspectRatio(isNaN(value) ? NaN : value);
    };

    const rotate = (deg) => cropperRef.current?.rotate(deg);
    const flip = (axis) => {
        if (!cropperRef.current) return;
        const data = cropperRef.current.getData();
        if (axis === 'h') cropperRef.current.scaleX(data.scaleX === -1 ? 1 : -1);
        if (axis === 'v') cropperRef.current.scaleY(data.scaleY === -1 ? 1 : -1);
    };
    const zoom = (factor) => cropperRef.current?.zoom(factor);

    const crop = () => {
        if (!cropperRef.current) return;
        setCropping(true);
        const canvas = cropperRef.current.getCroppedCanvas();
        const ext = format === 'image/png' ? '.png' : format === 'image/webp' ? '.webp' : '.jpg';
        const q = format !== 'image/png' ? quality / 100 : undefined;
        canvas.toBlob(blob => {
            const link = document.createElement('a');
            link.download = `recortada${ext}`;
            link.href = URL.createObjectURL(blob);
            link.click();
            URL.revokeObjectURL(link.href);
            setCropping(false);
        }, format, q);
    };

    const reset = () => {
        if (cropperRef.current) {
            cropperRef.current.destroy();
            cropperRef.current = null;
        }
        setImgSrc(null);
    };

    return (
        <div className="max-w-[1000px] mx-auto px-6 py-16">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-extrabold mb-2">
                    ✂️ Recortador de <span className="bg-gradient-to-r from-[#48dbfb] to-[#0090ff] bg-clip-text text-transparent">Imágenes</span>
                </h1>
                <p className="text-[#8899aa]">Recorta tus imágenes con precisión. Aspect ratios, rotación y exportación en múltiples formatos.</p>
            </div>

            {!imgSrc ? (
                <div
                    ref={dropRef}
                    onClick={() => inputRef.current?.click()}
                    onDragOver={e => { e.preventDefault(); dropRef.current?.classList.add('border-[#48dbfb]', 'bg-[#48dbfb]/5'); }}
                    onDragLeave={() => dropRef.current?.classList.remove('border-[#48dbfb]', 'bg-[#48dbfb]/5')}
                    onDrop={e => { e.preventDefault(); dropRef.current?.classList.remove('border-[#48dbfb]', 'bg-[#48dbfb]/5'); handleFile(e.dataTransfer.files[0]); }}
                    className="border-2 border-dashed border-[#48dbfb]/20 rounded-2xl p-20 text-center cursor-pointer hover:border-[#48dbfb]/40 hover:bg-[#48dbfb]/3 transition-all"
                >
                    <div className="text-5xl mb-4 opacity-50">✂️</div>
                    <h3 className="text-lg font-bold mb-2">Arrastra tu imagen aquí</h3>
                    <p className="text-[#8899aa] text-sm mb-6">JPG, PNG, WebP.</p>
                    <button className="px-8 py-3 rounded-full bg-gradient-to-r from-[#48dbfb] to-[#0090ff] text-white font-semibold text-sm hover:shadow-[0_6px_25px_rgba(72,219,251,.3)] transition-all">
                        Seleccionar Imagen
                    </button>
                    <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" hidden onChange={e => handleFile(e.target.files[0])} />
                </div>
            ) : (
                <div className="space-y-5">
                    {/* Toolbar */}
                    <div className="bg-[#0d1117] border border-white/[0.06] rounded-2xl p-4 flex flex-wrap gap-3 items-center">
                        <div className="flex gap-2 flex-wrap">
                            {ASPECT_RATIOS.map(r => (
                                <button
                                    key={r.label}
                                    onClick={() => setRatio(r.value)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${(isNaN(aspectRatio) && isNaN(r.value)) || aspectRatio === r.value ? 'bg-[#0090ff]/10 border-[#0090ff]/30 text-[#0090ff]' : 'border-white/[0.06] text-[#8899aa]'}`}
                                >
                                    {r.label}
                                </button>
                            ))}
                        </div>
                        <div className="flex gap-2 ml-auto flex-wrap">
                            {[
                                { label: '↺', title: 'Rotar -90°', action: () => rotate(-90) },
                                { label: '↻', title: 'Rotar +90°', action: () => rotate(90) },
                                { label: '↔', title: 'Voltear horizontal', action: () => flip('h') },
                                { label: '↕', title: 'Voltear vertical', action: () => flip('v') },
                                { label: '+', title: 'Zoom in', action: () => zoom(0.1) },
                                { label: '−', title: 'Zoom out', action: () => zoom(-0.1) },
                            ].map(btn => (
                                <button
                                    key={btn.label}
                                    onClick={btn.action}
                                    title={btn.title}
                                    className="w-9 h-9 rounded-lg border border-white/[0.06] text-[#8899aa] hover:border-[#0090ff]/20 hover:text-white transition text-base font-bold flex items-center justify-center"
                                >
                                    {btn.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Cropper canvas */}
                    <div className="bg-[#0d1117] border border-white/[0.06] rounded-2xl overflow-hidden" style={{ maxHeight: '500px' }}>
                        <img
                            ref={imgRef}
                            src={imgSrc}
                            alt="crop"
                            style={{ maxWidth: '100%', display: 'block' }}
                        />
                    </div>

                    {/* Output options + action */}
                    <div className="bg-[#0d1117] border border-white/[0.06] rounded-2xl p-5 flex flex-wrap gap-4 items-end">
                        <div>
                            <label className="text-xs text-[#5a6a7a] mb-2 block">Formato</label>
                            <div className="flex gap-2">
                                {[{ v: 'image/png', l: 'PNG' }, { v: 'image/jpeg', l: 'JPG' }, { v: 'image/webp', l: 'WebP' }].map(f => (
                                    <button
                                        key={f.v}
                                        onClick={() => setFormat(f.v)}
                                        className={`px-4 py-2 rounded-lg text-xs font-semibold border transition ${format === f.v ? 'bg-[#0090ff]/10 border-[#0090ff]/30 text-[#0090ff]' : 'border-white/[0.06] text-[#8899aa]'}`}
                                    >
                                        {f.l}
                                    </button>
                                ))}
                            </div>
                        </div>
                        {format !== 'image/png' && (
                            <div className="flex-1 min-w-[160px]">
                                <div className="flex justify-between text-xs mb-2">
                                    <span className="text-[#8899aa]">Calidad</span>
                                    <span className="text-[#0090ff] font-semibold">{quality}%</span>
                                </div>
                                <input
                                    type="range" min="10" max="100" value={quality}
                                    onChange={e => setQuality(Number(e.target.value))}
                                    className="w-full h-1 rounded-full bg-white/10 appearance-none cursor-pointer
                                               [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5
                                               [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#0090ff]"
                                />
                            </div>
                        )}
                        <div className="flex gap-3 ml-auto">
                            <button onClick={reset} className="px-5 py-2.5 rounded-xl border border-white/[0.06] text-sm text-[#8899aa] hover:border-white/10 transition">
                                Nueva imagen
                            </button>
                            <button
                                onClick={crop}
                                disabled={cropping}
                                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#48dbfb] to-[#0090ff] text-white font-bold text-sm hover:shadow-[0_8px_30px_rgba(72,219,251,.3)] transition-all disabled:opacity-50"
                            >
                                {cropping ? '⏳ Recortando...' : '✂️ Recortar y Descargar'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
