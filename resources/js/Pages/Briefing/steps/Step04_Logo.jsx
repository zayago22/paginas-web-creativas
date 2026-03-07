import LogoUpload from '../components/LogoUpload';

export default function Step04_Logo({ data, onChange, errors }) {
    return (
        <div className="space-y-4">
            {errors?.logo && <p className="text-xs" style={{ color: '#F87171' }}>⚠ {errors.logo}</p>}
            <LogoUpload
                value={data.logoUrl ? { url: data.logoUrl, name: data.logoName } : null}
                onUpload={(file) => onChange({ ...data, logoUrl: file.url, logoName: file.name, logoSkipped: false })}
                onRemove={() => onChange({ ...data, logoUrl: null, logoName: null })}
                skipped={data.logoSkipped || false}
                onSkipToggle={() => onChange({ ...data, logoSkipped: !data.logoSkipped, logoUrl: null, logoName: null })}
            />
            <p className="text-xs text-center" style={{ color: 'var(--briefing-text-dim)' }}>
                Formatos aceptados: PNG, SVG, JPG, PDF · Máximo 5MB
            </p>
        </div>
    );
}
