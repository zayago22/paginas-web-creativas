import { useEffect, useRef } from 'react';

const InputField = ({ label, type = 'text', value, onChange, error, placeholder, autoFocus }) => {
    const ref = useRef(null);
    useEffect(() => { if (autoFocus) ref.current?.focus(); }, [autoFocus]);

    return (
        <div className="space-y-1.5">
            <label className="block text-sm font-medium" style={{ color: '#8B8B9E' }}>
                {label} <span style={{ color: '#F87171' }}>*</span>
            </label>
            <input
                ref={ref}
                type={type}
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full px-4 py-3.5 rounded-xl transition-all duration-200 outline-none"
                style={{
                    background: '#1C1C28',
                    border: `1.5px solid ${error ? '#F87171' : '#2A2A3A'}`,
                    color: '#F0F0F5',
                    fontSize: '16px',
                    fontFamily: "'DM Sans', sans-serif",
                    boxShadow: error ? '0 0 0 3px rgba(248,113,113,0.15)' : 'none',
                }}
                onFocus={e => { e.target.style.borderColor = error ? '#F87171' : '#6C63FF'; e.target.style.boxShadow = error ? '0 0 0 3px rgba(248,113,113,0.15)' : '0 0 0 3px rgba(108,99,255,0.15)'; }}
                onBlur={e => { e.target.style.borderColor = error ? '#F87171' : '#2A2A3A'; e.target.style.boxShadow = error ? '0 0 0 3px rgba(248,113,113,0.15)' : 'none'; }}
            />
            {error && <p className="text-xs" style={{ color: '#F87171' }}>⚠ {error}</p>}
        </div>
    );
};

export default function Step01_Contacto({ data, onChange, errors }) {
    const update = (field) => (val) => onChange({ ...data, [field]: val });

    return (
        <div className="space-y-5">
            <InputField
                label="Nombre completo"
                value={data.nombre || ''}
                onChange={update('nombre')}
                error={errors?.nombre}
                placeholder="Ej: María González"
                autoFocus
            />
            <InputField
                label="Nombre de la empresa"
                value={data.empresa || ''}
                onChange={update('empresa')}
                error={errors?.empresa}
                placeholder="Ej: Restaurante La Luna"
            />
            <InputField
                label="Correo electrónico"
                type="email"
                value={data.email || ''}
                onChange={update('email')}
                error={errors?.email}
                placeholder="tu@empresa.com"
            />
            <InputField
                label="Teléfono / WhatsApp"
                type="tel"
                value={data.telefono || ''}
                onChange={update('telefono')}
                error={errors?.telefono}
                placeholder="+52 55 0000 0000"
            />
        </div>
    );
}
