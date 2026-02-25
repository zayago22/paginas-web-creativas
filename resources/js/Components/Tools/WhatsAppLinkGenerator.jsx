import { useState, useMemo } from 'react';

const WA_GREEN     = '#25d366';
const WA_GREEN_DIM = 'rgba(37,211,102,0.8)';

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

    const now  = new Date();
    const hhmm = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;

    function copy(text, setter) {
        if (!text) return;
        navigator.clipboard.writeText(text).then(() => {
            setter(true);
            setTimeout(() => setter(false), 2000);
        });
    }

    const country = COUNTRIES.find(c => c.code === countryCode);

    return (
        <div className="max-w-[700px] mx-auto px-6 py-16">

            {/* Header */}
            <div className="text-center mb-10">
                <h1 className="text-3xl font-extrabold mb-2">
                    💬 Generador de{' '}
                    <span className="bg-gradient-to-r from-[#25d366] to-[#128c7e] bg-clip-text text-transparent">
                        Link de WhatsApp
                    </span>
                </h1>
                <p className="text-[#8899aa]">
                    Crea un enlace directo con mensaje predeterminado. Sin apps, sin registro.
                </p>
            </div>

            {/* Phone */}
            <div className="bg-[#0d1117] border border-white/[0.06] rounded-2xl p-6 mb-5">
                <p className="text-xs font-semibold text-[#5a6a7a] uppercase tracking-wider mb-4">
                    Número de teléfono
                </p>
                <div className="flex gap-3">
                    <div className="relative">
                        <select
                            value={countryCode}
                            onChange={e => setCountryCode(e.target.value)}
                            className="appearance-none bg-black/20 border border-white/[0.06] rounded-xl
                                       pl-3 pr-8 py-2.5 text-sm text-white cursor-pointer
                                       focus:outline-none focus:border-[rgba(37,211,102,0.4)]
                                       hover:border-white/10 transition-colors min-w-[170px]"
                        >
                            {COUNTRIES.map(c => (
                                <option key={c.code + c.name} value={c.code} className="bg-[#0d1117]">
                                    {c.flag} {c.name} +{c.code}
                                </option>
                            ))}
                        </select>
                        <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#5a6a7a] text-xs">▾</span>
                    </div>
                    <input
                        type="tel"
                        value={phone}
                        onChange={e => setPhone(e.target.value.replace(/[^0-9\s\-().]/g, ''))}
                        placeholder="5512345678"
                        className="flex-1 bg-black/20 border border-white/[0.06] rounded-xl
                                   px-4 py-2.5 text-sm text-white placeholder-[#3a4a5a]
                                   focus:outline-none focus:border-[rgba(37,211,102,0.4)] transition-colors"
                    />
                </div>
                {phone && !isValid && (
                    <p className="text-xs text-red-400 mt-3">El número debe tener al menos 7 dígitos.</p>
                )}
                {isValid && (
                    <p className="text-xs text-[#5a6a7a] mt-3">
                        Número completo:{' '}
                        <span className="font-mono" style={{ color: WA_GREEN_DIM }}>+{fullNumber}</span>
                    </p>
                )}
            </div>

            {/* Message */}
            <div className="bg-[#0d1117] border border-white/[0.06] rounded-2xl p-6 mb-5">
                <div className="flex items-center justify-between mb-4">
                    <p className="text-xs font-semibold text-[#5a6a7a] uppercase tracking-wider">
                        Mensaje predeterminado
                    </p>
                    <span className="text-xs text-[#5a6a7a]">{message.length} / 1000</span>
                </div>
                <textarea
                    value={message}
                    onChange={e => setMessage(e.target.value.slice(0, 1000))}
                    rows={4}
                    placeholder="Hola, me interesa cotizar una página web..."
                    className="w-full bg-black/20 border border-white/[0.06] rounded-xl
                               px-4 py-3 text-sm text-white placeholder-[#3a4a5a] resize-none
                               focus:outline-none focus:border-[rgba(37,211,102,0.4)] transition-colors"
                />
                <p className="text-xs text-[#5a6a7a] mt-2">
                    Los saltos de línea se codifican automáticamente en la URL.
                </p>
            </div>

            {/* Preview */}
            <div className="bg-[#0d1117] border border-white/[0.06] rounded-2xl p-6 mb-5">
                <p className="text-xs font-semibold text-[#5a6a7a] uppercase tracking-wider mb-4">
                    Preview
                </p>

                {/* Chat mockup */}
                <div className="rounded-xl overflow-hidden mb-4">
                    {/* WA navbar */}
                    <div className="flex items-center gap-3 px-4 py-3" style={{ background: '#075e54' }}>
                        <div
                            className="w-9 h-9 rounded-full flex items-center justify-center text-lg flex-shrink-0"
                            style={{ background: 'rgba(255,255,255,0.15)' }}
                        >
                            {country?.flag ?? '🌍'}
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-white leading-none">
                                +{fullNumber || countryCode + '…'}
                            </p>
                            <p className="text-[10px] mt-0.5" style={{ color: 'rgba(255,255,255,0.65)' }}>
                                en línea
                            </p>
                        </div>
                    </div>

                    {/* Chat area */}
                    <div
                        className="px-4 py-5 min-h-[100px] flex items-end justify-end"
                        style={{ background: '#0a1a13' }}
                    >
                        {message.trim() ? (
                            <div
                                className="max-w-[75%] rounded-tl-2xl rounded-tr-sm rounded-b-2xl px-4 py-2.5"
                                style={{ background: '#075e54' }}
                            >
                                <p className="text-[13px] text-white whitespace-pre-wrap leading-snug">
                                    {message}
                                </p>
                                <div className="flex items-center justify-end gap-1 mt-1.5">
                                    <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.55)' }}>{hhmm}</span>
                                    <span className="text-[11px]" style={{ color: WA_GREEN }}>✓✓</span>
                                </div>
                            </div>
                        ) : (
                            <p className="text-[#5a6a7a] text-xs text-center w-full">
                                Escribe un mensaje para ver el preview
                            </p>
                        )}
                    </div>
                </div>

                {/* URL display */}
                {waUrl ? (
                    <div className="bg-black/30 border border-white/[0.04] rounded-xl px-4 py-3">
                        <p className="text-[10px] text-[#5a6a7a] uppercase tracking-wider mb-1">Enlace generado</p>
                        <p className="text-xs font-mono break-all leading-relaxed" style={{ color: WA_GREEN_DIM }}>
                            {waUrl}
                        </p>
                    </div>
                ) : (
                    <div className="bg-black/20 border border-white/[0.04] rounded-xl px-4 py-3">
                        <p className="text-xs text-[#5a6a7a]">Ingresa un número válido para generar el enlace.</p>
                    </div>
                )}
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
                <button
                    onClick={() => copy(waUrl, setCopiedLink)}
                    disabled={!waUrl}
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold
                               transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{
                        background: copiedLink ? 'rgba(37,211,102,0.15)' : 'rgba(37,211,102,0.1)',
                        border: '1px solid rgba(37,211,102,0.25)',
                        color: waUrl ? WA_GREEN : '#5a6a7a',
                    }}
                >
                    {copiedLink ? '✓ ¡Copiado!' : '📋 Copiar enlace'}
                </button>

                <button
                    onClick={() => waUrl && window.open(waUrl, '_blank', 'noopener,noreferrer')}
                    disabled={!waUrl}
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold
                               bg-black/20 border border-white/[0.06] text-white
                               hover:border-white/20 transition-all
                               disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    🚀 Probar enlace
                </button>

                <button
                    onClick={() => copy(htmlSnippet, setCopiedHtml)}
                    disabled={!waUrl}
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold
                               bg-black/20 border border-white/[0.06] text-[#8899aa]
                               hover:border-white/20 hover:text-white transition-all
                               disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    {copiedHtml ? '✓ ¡Copiado!' : '</> Copiar HTML'}
                </button>
            </div>

            {/* HTML snippet */}
            {waUrl && (
                <div className="bg-[#0d1117] border border-white/[0.06] rounded-2xl p-6">
                    <p className="text-xs font-semibold text-[#5a6a7a] uppercase tracking-wider mb-3">
                        Snippet HTML
                    </p>
                    <pre
                        className="text-xs font-mono bg-black/30 rounded-xl px-4 py-3
                                   overflow-x-auto whitespace-pre-wrap break-all leading-relaxed"
                        style={{ color: WA_GREEN_DIM }}
                    >
                        {htmlSnippet}
                    </pre>
                </div>
            )}

        </div>
    );
}
