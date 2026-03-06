import { useState, useRef } from 'react';
import { Upload, X, File } from 'lucide-react';
import { formatFileSize } from '../utils/validation';
import axios from 'axios';

const ALLOWED_TYPES = ['image/jpeg','image/png','application/pdf','application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/zip','application/x-zip-compressed','image/webp'];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_FILES = 10;

export default function FileUpload({ files, onAdd, onRemove }) {
    const inputRef = useRef(null);
    const [uploading, setUploading] = useState(false);
    const [errors, setErrors] = useState([]);

    const handleFiles = async (newFiles) => {
        if (!newFiles?.length) return;
        const errs = [];

        for (const file of Array.from(newFiles)) {
            if (files.length >= MAX_FILES) { errs.push(`Máximo ${MAX_FILES} archivos permitidos.`); break; }
            if (!ALLOWED_TYPES.includes(file.type)) { errs.push(`"${file.name}" — formato no permitido.`); continue; }
            if (file.size > MAX_SIZE) { errs.push(`"${file.name}" supera 5MB.`); continue; }

            setUploading(true);
            try {
                const fd = new FormData();
                fd.append('file', file);
                fd.append('type', 'archivo');
                const res = await axios.post('/api/briefings/upload', fd, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                onAdd({ url: res.data.url, name: res.data.name, size: res.data.size, path: res.data.path });
            } catch {
                onAdd({ url: URL.createObjectURL(file), name: file.name, size: file.size, localFile: file });
            } finally {
                setUploading(false);
            }
        }
        setErrors(errs);
    };

    return (
        <div className="space-y-3">
            {/* Lista de archivos */}
            {files.map((f, i) => (
                <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-xl"
                    style={{ background: '#1C1C28', border: '1px solid #2A2A3A' }}
                >
                    <File size={18} style={{ color: '#6C63FF', flexShrink: 0 }} />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate" style={{ color: '#F0F0F5' }}>{f.name}</p>
                        {f.size && <p className="text-xs" style={{ color: '#8B8B9E' }}>{formatFileSize(f.size)}</p>}
                    </div>
                    <button type="button" onClick={() => onRemove(i)} style={{ color: '#F87171' }}>
                        <X size={16} />
                    </button>
                </div>
            ))}

            {/* Zona de drop */}
            {files.length < MAX_FILES && (
                <div
                    className="flex flex-col items-center gap-3 p-6 rounded-2xl cursor-pointer transition"
                    style={{ border: '1.5px dashed #2A2A3A', background: '#1C1C28' }}
                    onClick={() => inputRef.current?.click()}
                >
                    <Upload size={28} style={{ color: '#8B8B9E' }} />
                    <p className="text-sm text-center" style={{ color: '#8B8B9E' }}>
                        {uploading ? 'Subiendo...' : 'Arrastra o haz click para subir archivos'}
                    </p>
                    <p className="text-xs" style={{ color: '#4A4A5A' }}>
                        PDF, DOC, DOCX, JPG, PNG, ZIP · máx. 5MB por archivo · hasta {MAX_FILES} archivos
                    </p>
                    <input
                        ref={inputRef}
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip,.webp"
                        className="hidden"
                        onChange={e => handleFiles(e.target.files)}
                    />
                </div>
            )}

            {errors.length > 0 && (
                <div className="space-y-1">
                    {errors.map((e, i) => (
                        <p key={i} className="text-xs" style={{ color: '#F87171' }}>⚠ {e}</p>
                    ))}
                </div>
            )}
        </div>
    );
}
