import FileUpload from '../components/FileUpload';

export default function Step11_Archivos({ data, onChange }) {
    const archivos = data.archivos || [];

    return (
        <div className="space-y-4">
            <div
                className="p-4 rounded-xl flex items-start gap-3"
                style={{ background: '#13131A', border: '1px solid #2A2A3A' }}
            >
                <span style={{ fontSize: '20px' }}>💡</span>
                <p className="text-sm leading-relaxed" style={{ color: '#8B8B9E' }}>
                    Puedes subir: presentaciones de empresa, catálogos, fotos, textos, propuesta anterior, logotipos en alta resolución, etc.
                </p>
            </div>

            <FileUpload
                files={archivos}
                onAdd={(file) => onChange({ ...data, archivos: [...archivos, file] })}
                onRemove={(idx) => onChange({ ...data, archivos: archivos.filter((_, i) => i !== idx) })}
            />
        </div>
    );
}
