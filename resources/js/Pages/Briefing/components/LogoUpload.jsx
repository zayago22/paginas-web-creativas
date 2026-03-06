import { useState, useRef } from 'react';
import { Upload, X, CheckSquare } from 'lucide-react';
import axios from 'axios';

export default function LogoUpload({ value, onUpload, onRemove, skipped, onSkipToggle }) {
    const [dragging, setDragging] = useState(false);
    const [uploading, setUploading] = useState(false);
    const inputRef = useRef(null);

    const handleFile = async (file) => {
        if (!file) return;
        const allowed = ['image/png', 'image/jpeg', 'image/svg+xml', 'application/pdf', 'image/webp'];
        if (!allowed.includes(file.type)) {
            alert('Formato no permitido. Usa PNG, SVG, JPG o PDF.');
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            alert('El archivo supera 5MB.');
            return;
        }

        setUploading(true);
        try {
            const fd = new FormData();
            fd.append('file', file);
            fd.append('type', 'logo');
            const res = await axios.post('/api/briefings/upload', fd, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            onUpload({ url: res.data.url, name: res.data.name, path: res.data.path });
        } catch (e) {
            // Fallback: usar URL local para preview
            const localUrl = URL.createObjectURL(file);
            onUpload({ url: localUrl, name: file.name, localFile: file });
        } finally {
            setUploading(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
    };

    return (
        <div className="space-y-4">
            {value ? (
                /* Preview del logo subido */
                <div
                    className="relative flex flex-col items-center justify-center p-6 rounded-2xl"
                    style={{ border: '1.5px solid #6C63FF', background: '#1C1C28' }}
                >
                    <img
                        src={value.url}
                        alt="Logo subido"
                        className="max-h-32 max-w-full object-contain rounded"
                    />
                    <p className="text-xs mt-3" style={{ color: '#8B8B9E' }}>{value.name}</p>
                    <button
                        type="button"
                        onClick={onRemove}
                        className="absolute top-3 right-3 p-1.5 rounded-full transition"
                        style={{ background: '#2A2A3A', color: '#F87171' }}
                    >
                        <X size={14} />
                    </button>
                </div>
            ) : (
                /* Área drag & drop */
                <div
                    className="flex flex-col items-center justify-center gap-3 p-8 rounded-2xl cursor-pointer transition-all duration-200"
                    style={{
                        border: `1.5px dashed ${dragging ? '#6C63FF' : '#2A2A3A'}`,
                        background: dragging ? 'rgba(108,99,255,0.08)' : '#1C1C28',
                    }}
                    onDragOver={e => { e.preventDefault(); setDragging(true); }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={handleDrop}
                    onClick={() => inputRef.current?.click()}
                >
                    <Upload
                        size={36}
                        style={{ color: dragging ? '#6C63FF' : '#8B8B9E' }}
                        className="transition-colors"
                    />
                    <div className="text-center">
                        <p className="font-medium mb-1" style={{ color: '#F0F0F5' }}>
                            {uploading ? 'Subiendo...' : 'Arrastra tu logo aquí'}
                        </p>
                        <p className="text-sm" style={{ color: '#8B8B9E' }}>
                            PNG, SVG, JPG o PDF · máx. 5MB
                        </p>
                    </div>
                    <button
                        type="button"
                        className="px-5 py-2 rounded-lg text-sm font-semibold transition"
                        style={{ background: '#6C63FF', color: '#fff' }}
                        onClick={e => { e.stopPropagation(); inputRef.current?.click(); }}
                    >
                        Seleccionar archivo
                    </button>
                    <input
                        ref={inputRef}
                        type="file"
                        accept=".png,.jpg,.jpeg,.svg,.pdf,.webp"
                        className="hidden"
                        onChange={e => handleFile(e.target.files[0])}
                    />
                </div>
            )}

            {/* Opción: no tengo logo */}
            <button
                type="button"
                onClick={onSkipToggle}
                className="flex items-center gap-3 w-full p-4 rounded-xl transition"
                style={{
                    border: `1.5px solid ${skipped ? '#6C63FF' : '#2A2A3A'}`,
                    background: skipped ? 'rgba(108,99,255,0.08)' : 'transparent',
                    color: skipped ? '#8B84FF' : '#8B8B9E',
                }}
            >
                <CheckSquare size={18} style={{ color: skipped ? '#6C63FF' : '#2A2A3A' }} />
                <span className="text-sm font-medium text-left">
                    Aún no tengo logo / lo necesito como parte del proyecto
                </span>
            </button>
        </div>
    );
}
