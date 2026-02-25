import { useState, useMemo } from 'react';

const COUNTRIES = [
    { flag: '🇲🇽', name: 'México',           code: '52' },
    { flag: '🇺🇸', name: 'USA / Canadá',     code: '1' },
    { flag: '🇨🇴', name: 'Colombia',          code: '57' },
    { flag: '🇪🇸', name: 'España',            code: '34' },
    { flag: '🇦🇷', name: 'Argentina',         code: '54' },
    { flag: '🇨🇱', name: 'Chile',             code: '56' },
    { flag: '🇵🇪', name: 'Perú',              code: '51' },
    { flag: '🇧🇷', name: 'Brasil',            code: '55' },
    { flag: '🇪🇨', name: 'Ecuador',           code: '593' },
    { flag: '🇻🇪', name: 'Venezuela',         code: '58' },
    { flag: '🇬🇹', name: 'Guatemala',         code: '502' },
    { flag: '🇭🇳', name: 'Honduras',          code: '504' },
    { flag: '🇨🇷', name: 'Costa Rica',        code: '506' },
    { flag: '🇵🇦', name: 'Panamá',            code: '507' },
    { flag: '🇺🇾', name: 'Uruguay',           code: '598' },
    { flag: '🇵🇾', name: 'Paraguay',          code: '595' },
    { flag: '🇧🇴', name: 'Bolivia',           code: '591' },
    { flag: '🇩🇴', name: 'Rep. Dominicana',   code: '1809' },
    { flag: '🇸🇻', name: 'El Salvador',       code: '503' },
    { flag: '🇳🇮', name: 'Nicaragua',         code: '505' },
];

function cleanPhone(raw) {
    return raw.replace(/[\s\-().+]/g, '');
}

export default function WhatsAppLinkGenerator() {
    const [countryCode, setCountryCode] = useState('52');
    const [phone, setPhone]             = useState('');
    const [message, setMessage]         = useState('');
    const [copiedLink, setCopiedLink]   = useState(false);
    const [copiedHtml, setCopiedHtml]   = useState(false);

    const cleanedPhone = cleanPhone(phone);
    const fullNumber   = countryCode + cleanedPhone;
    const isValid      = cleanedPhone.length >= 7;

    const waUrl = useMemo(() => {
        if (!isValid) return '';
        const base = `https://wa.me/${fullNumber}`;
        return message.trim()
            ? `${base}?text=${encodeURIComponent(message)}`
            : base;
    }, [fullNumber, message, isValid]);

    const htmlSnippet = waUrl
        ? `<a href="${waUrl}" target="_blank" rel="noopener noreferrer">Escríbenos por WhatsApp</a>`
        : '';

    const now   = new Date();
    const hhmm  = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;

    function copy(text, setter) {
        if (!text) return;
        navigator.clipboard.writeText(text).then(() => {
            setter(true);
            setTimeout(() => setter(false), 2000);
        });
    }

    return (
        <div className="min-h-screen bg-[#07090f] text-white">
            <div className="max-w-2xl mx-auto px-4 py-10 space-y-6">

                {/* Header */}
                <div className="text-center space-y-2">
                    <div
                        className="inline-flex items-center justify-center w-16 h-16 rounded-2xl text-3xl mb-1"
                        style={{ background: 'rgba(37,211,102,0.1)' }}
                    >
                        💬
                    </div>
                    <h1 className="text-2xl font-bold">Generador de Link de WhatsApp</h1>
                    <p className="text-[#94a3b8] text-sm">
                        Genera un enlace directo a WhatsApp con mensaje personalizado. Sin apps, sin registro.
                    </p>
                </div>

                {/* Phone */}
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 space-y-4">
                    <h2 className="text-sm font-semibold text-[#94a3b8] uppercase tracking-wider">
                        Número de teléfono
                    </h2>
                    <div className="flex gap-3">
                        {/* Country selector */}
                        <div className="relative">
                            <select
                                value={countryCode}
                                onChange={e => setCountryCode(e.target.value)}
                                className="appearance-none bg-white/[0.05] border border-white/[0.08] rounded-xl
                                           pl-3 pr-8 py-2.5 text-sm text-white cursor-pointer
                                           focus:outline-none focus:border-[rgba(37,211,102,0.5)]
                                           hover:border-white/20 transition-colors min-w-[150px]"
                            >
                                {COUNTRIES.map(c => (
                                    <option key={c.code + c.name} value={c.code} className="bg-[#0d1117]">
                                        {c.flag} {c.name} +{c.code}
                                    </option>
                                ))}
                            </select>
                            <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#94a3b8] text-xs">▾</span>
                        </div>

                        {/* Number input */}
                        <input
                            type="tel"
                            value={phone}
                            onChange={e => setPhone(e.target.value.replace(/[^0-9\s\-().]/g, ''))}
                            placeholder="5512345678"
                            className="flex-1 bg-white/[0.05] border border-white/[0.08] rounded-xl
                                       px-4 py-2.5 text-sm text-white placeholder-[#4a5568]
                                       focus:outline-none focus:border-[rgba(37,211,102,0.5)] transition-colors"
                        />
                    </div>
                    {phone && !isValid && (
                        <p className="text-xs text-red-400">El número debe tener al menos 7 dígitos.</p>
                    )}
                    {isValid && (
                        <p className="text-xs text-[#94a3b8]">
                            Número completo: <span className="text-[rgba(37,211,102,0.9)] font-mono">+{fullNumber}</span>
                        </p>
                    )}
                </div>

                {/* Message */}
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 space-y-3">
                    <div className="flex items-center justify-between">
                        <h2 className="text-sm font-semibold text-[#94a3b8] uppercase tracking-wider">
                            Mensaje predeterminado
                        </h2>
                        <span className="text-xs text-[#4a5568]">{message.length} / 1000</span>
                    </div>
                    <textarea
                        value={message}
                        onChange={e => setMessage(e.target.value.slice(0, 1000))}
                        rows={4}
                        placeholder="Hola, me interesa cotizar una página web..."
                        className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl
                                   px-4 py-3 text-sm text-white placeholder-[#4a5568] resize-none
                                   focus:outline-none focus:border-[rgba(37,211,102,0.5)] transition-colors"
                    />
                    <p className="text-xs text-[#4a5568]">
                        Los saltos de línea se codifican automáticamente en la URL.
                    </p>
                </div>

                {/* Preview */}
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 space-y-4">
                    <h2 className="text-sm font-semibold text-[#94a3b8] uppercase tracking-wider">
                        Preview
                    </h2>

                    {/* Chat mockup */}
                    <div
                        className="rounded-xl overflow-hidden"
                        style={{ background: 'rgba(0,0,0,0.3)' }}
                    >
                        {/* WA header */}
                        <div className="flex items-center gap-3 px-4 py-3 bg-[#1a2a1a]">
                            <div className="w-9 h-9 rounded-full bg-[rgba(37,211,102,0.3)] flex items-center justify-center text-lg">
                                💬
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-white leading-none">
                                    {COUNTRIES.find(c => c.code === countryCode)?.flag}{' '}
                                    +{fullNumber || countryCode + '…'}
                                </p>
                                <p className="text-[10px] text-[rgba(37,211,102,0.8)] mt-0.5">en línea</p>
                            </div>
                        </div>

                        {/* Chat area */}
                        <div
                            className="px-4 py-5 min-h-[90px] flex items-end justify-end"
                            style={{
                                backgroundImage:
                                    'radial-gradient(circle, rgba(255,255,255,0.015) 1px, transparent 1px)',
                                backgroundSize: '20px 20px',
                                background: '#0b1a0b',
                            }}
                        >
                            {message.trim() ? (
                                <div
                                    className="max-w-[80%] rounded-tl-2xl rounded-tr-sm rounded-b-2xl px-4 py-2.5 relative"
                                    style={{ background: 'rgba(37,211,102,0.85)' }}
                                >
                                    <p className="text-[13px] text-[#0a1a0a] whitespace-pre-wrap leading-snug">
                                        {message}
                                    </p>
                                    <div className="flex items-center justify-end gap-1 mt-1">
                                        <span className="text-[10px] text-[rgba(0,0,0,0.5)]">{hhmm}</span>
                                        <span className="text-[11px] text-blue-600">✓✓</span>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-[#4a5568] text-xs text-center w-full">
                                    Escribe un mensaje para ver el preview
                                </p>
                            )}
                        </div>
                    </div>

                    {/* URL preview */}
                    {waUrl ? (
                        <div className="bg-black/30 border border-white/[0.06] rounded-xl px-4 py-3">
                            <p className="text-[10px] text-[#4a5568] mb-1 uppercase tracking-wider">Enlace generado</p>
                            <p className="text-xs text-[rgba(37,211,102,0.9)] font-mono break-all leading-relaxed">
                                {waUrl}
                            </p>
                        </div>
                    ) : (
                        <div className="bg-black/20 border border-white/[0.04] rounded-xl px-4 py-3">
                            <p className="text-xs text-[#4a5568]">Ingresa un número válido para generar el enlace.</p>
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                        onClick={() => copy(waUrl, setCopiedLink)}
                        disabled={!waUrl}
                        className="flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-sm font-semibold
                                   transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                        style={{
                            background: waUrl
                                ? (copiedLink ? 'rgba(37,211,102,0.25)' : 'rgba(37,211,102,0.15)')
                                : undefined,
                            border: '1px solid rgba(37,211,102,0.3)',
                            color: waUrl ? 'rgba(37,211,102,0.95)' : '#4a5568',
                        }}
                    >
                        {copiedLink ? '✅ ¡Copiado!' : '📋 Copiar enlace'}
                    </button>

                    <button
                        onClick={() => waUrl && window.open(waUrl, '_blank', 'noopener,noreferrer')}
                        disabled={!waUrl}
                        className="flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-sm font-semibold
                                   bg-white/[0.05] border border-white/[0.08] text-white
                                   hover:bg-white/[0.08] transition-all
                                   disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        🚀 Probar enlace
                    </button>

                    <button
                        onClick={() => copy(htmlSnippet, setCopiedHtml)}
                        disabled={!waUrl}
                        className="flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-sm font-semibold
                                   bg-white/[0.05] border border-white/[0.08] text-[#94a3b8]
                                   hover:bg-white/[0.08] transition-all
                                   disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        {copiedHtml ? '✅ ¡Copiado!' : '</> Copiar HTML'}
                    </button>
                </div>

                {/* HTML preview */}
                {waUrl && (
                    <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 space-y-2">
                        <h2 className="text-sm font-semibold text-[#94a3b8] uppercase tracking-wider">
                            Snippet HTML
                        </h2>
                        <pre
                            className="text-xs text-[rgba(37,211,102,0.8)] font-mono bg-black/30 rounded-xl
                                       px-4 py-3 overflow-x-auto whitespace-pre-wrap break-all leading-relaxed"
                        >
                            {htmlSnippet}
                        </pre>
                    </div>
                )}

            </div>
        </div>
    );
}
