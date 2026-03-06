import { Plus, Trash2 } from 'lucide-react';

export default function Step03_Servicios({ data, onChange, errors }) {
    const servicios = data.servicios?.length ? data.servicios : [{ nombre: '', descripcion: '' }];

    const update = (idx, field, val) => {
        const next = servicios.map((s, i) => i === idx ? { ...s, [field]: val } : s);
        onChange({ ...data, servicios: next });
    };

    const add = () => {
        if (servicios.length >= 8) return;
        onChange({ ...data, servicios: [...servicios, { nombre: '', descripcion: '' }] });
    };

    const remove = (idx) => {
        if (servicios.length <= 1) return;
        onChange({ ...data, servicios: servicios.filter((_, i) => i !== idx) });
    };

    const inputStyle = (error) => ({
        background: '#1C1C28',
        border: `1.5px solid ${error ? '#F87171' : '#2A2A3A'}`,
        color: '#F0F0F5',
        fontSize: '16px',
        fontFamily: "'DM Sans', sans-serif",
        borderRadius: '10px',
        padding: '10px 14px',
        width: '100%',
        outline: 'none',
        transition: 'border-color 0.2s',
    });

    return (
        <div className="space-y-4">
            {errors?.servicios && (
                <p className="text-xs" style={{ color: '#F87171' }}>⚠ {errors.servicios}</p>
            )}

            {servicios.map((svc, idx) => (
                <div
                    key={idx}
                    className="p-4 rounded-2xl space-y-3"
                    style={{ background: '#13131A', border: '1px solid #2A2A3A' }}
                >
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold" style={{ color: '#6C63FF', fontFamily: "'Syne', sans-serif" }}>
                            Servicio {idx + 1}
                        </span>
                        {servicios.length > 1 && (
                            <button
                                type="button"
                                onClick={() => remove(idx)}
                                className="p-1.5 rounded-lg transition"
                                style={{ color: '#F87171', background: 'rgba(248,113,113,0.1)' }}
                            >
                                <Trash2 size={14} />
                            </button>
                        )}
                    </div>
                    <input
                        style={inputStyle(false)}
                        placeholder="Nombre del servicio *"
                        value={svc.nombre}
                        onChange={e => update(idx, 'nombre', e.target.value)}
                        onFocus={e => { e.target.style.borderColor = '#6C63FF'; }}
                        onBlur={e => { e.target.style.borderColor = '#2A2A3A'; }}
                    />
                    <input
                        style={inputStyle(false)}
                        placeholder="Descripción breve (opcional)"
                        value={svc.descripcion}
                        onChange={e => update(idx, 'descripcion', e.target.value)}
                        onFocus={e => { e.target.style.borderColor = '#6C63FF'; }}
                        onBlur={e => { e.target.style.borderColor = '#2A2A3A'; }}
                    />
                </div>
            ))}

            {servicios.length < 8 && (
                <button
                    type="button"
                    onClick={add}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl w-full transition justify-center"
                    style={{ border: '1.5px dashed #2A2A3A', color: '#8B8B9E', fontSize: '14px' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#6C63FF'; e.currentTarget.style.color = '#6C63FF'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#2A2A3A'; e.currentTarget.style.color = '#8B8B9E'; }}
                >
                    <Plus size={16} />
                    Agregar otro servicio
                </button>
            )}
        </div>
    );
}
