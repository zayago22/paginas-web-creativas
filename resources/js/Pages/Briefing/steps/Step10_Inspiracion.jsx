import { Plus, Trash2 } from 'lucide-react';

const inputBase = {
    background: '#1C1C28',
    border: '1.5px solid #2A2A3A',
    color: '#F0F0F5',
    fontSize: '16px',
    fontFamily: "'DM Sans', sans-serif",
};

export default function Step10_Inspiracion({ data, onChange, onSkip }) {
    const inspiracion = data.inspiracion?.length ? data.inspiracion : [{ url: '', comentario: '' }];

    const update = (idx, field, val) => {
        const next = inspiracion.map((item, i) => i === idx ? { ...item, [field]: val } : item);
        onChange({ ...data, inspiracion: next });
    };

    const add = () => {
        if (inspiracion.length >= 3) return;
        onChange({ ...data, inspiracion: [...inspiracion, { url: '', comentario: '' }] });
    };

    const remove = (idx) => {
        const next = inspiracion.filter((_, i) => i !== idx);
        onChange({ ...data, inspiracion: next.length ? next : [{ url: '', comentario: '' }] });
    };

    return (
        <div className="space-y-4">
            <p className="text-sm" style={{ color: '#8B8B9E' }}>
                No tienen que ser de tu industria — solo webs cuyo diseño te inspire.
            </p>

            {inspiracion.map((item, idx) => (
                <div
                    key={idx}
                    className="p-4 rounded-2xl space-y-3"
                    style={{ background: '#13131A', border: '1px solid #2A2A3A' }}
                >
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold" style={{ color: '#6C63FF', fontFamily: "'Syne', sans-serif" }}>
                            Web {idx + 1}
                        </span>
                        {inspiracion.length > 1 && (
                            <button type="button" onClick={() => remove(idx)}
                                className="p-1.5 rounded-lg" style={{ color: '#F87171', background: 'rgba(248,113,113,0.1)' }}>
                                <Trash2 size={14} />
                            </button>
                        )}
                    </div>
                    <input
                        type="url"
                        value={item.url}
                        onChange={e => update(idx, 'url', e.target.value)}
                        placeholder="https://ejemplo.com"
                        className="w-full px-4 py-3 rounded-xl outline-none transition"
                        style={inputBase}
                        onFocus={e => { e.target.style.borderColor = '#6C63FF'; }}
                        onBlur={e => { e.target.style.borderColor = '#2A2A3A'; }}
                    />
                    <textarea
                        value={item.comentario}
                        onChange={e => update(idx, 'comentario', e.target.value)}
                        placeholder="¿Qué te gusta de esta web? (diseño, colores, estructura...)"
                        rows={2}
                        className="w-full px-4 py-3 rounded-xl outline-none resize-none transition"
                        style={inputBase}
                        onFocus={e => { e.target.style.borderColor = '#6C63FF'; }}
                        onBlur={e => { e.target.style.borderColor = '#2A2A3A'; }}
                    />
                </div>
            ))}

            {inspiracion.length < 3 && (
                <button type="button" onClick={add}
                    className="flex items-center gap-2 w-full justify-center py-3 rounded-xl text-sm transition"
                    style={{ border: '1.5px dashed #2A2A3A', color: '#8B8B9E' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#6C63FF'; e.currentTarget.style.color = '#6C63FF'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#2A2A3A'; e.currentTarget.style.color = '#8B8B9E'; }}>
                    <Plus size={16} /> Agregar otra web
                </button>
            )}
        </div>
    );
}
