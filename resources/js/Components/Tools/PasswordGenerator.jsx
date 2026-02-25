import { useState, useCallback } from 'react';

const CHARS = {
    upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lower: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
    ambiguous: 'O0lI1',
};

function generatePassword(length, options) {
    let charset = '';
    if (options.upper) charset += CHARS.upper;
    if (options.lower) charset += CHARS.lower;
    if (options.numbers) charset += CHARS.numbers;
    if (options.symbols) charset += CHARS.symbols;

    if (options.noAmbiguous) {
        charset = charset.split('').filter(c => !CHARS.ambiguous.includes(c)).join('');
    }

    if (!charset) return '';

    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    return Array.from(array, n => charset[n % charset.length]).join('');
}

function calcStrength(password) {
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (password.length >= 16) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score; // 0-7
}

function calcCrackTime(password) {
    const charset =
        (/[A-Z]/.test(password) ? 26 : 0) +
        (/[a-z]/.test(password) ? 26 : 0) +
        (/[0-9]/.test(password) ? 10 : 0) +
        (/[^A-Za-z0-9]/.test(password) ? 30 : 0);
    const combinations = Math.pow(charset || 1, password.length);
    const guessesPerSecond = 1e10; // 10 billion/sec (GPU)
    const seconds = combinations / guessesPerSecond;
    if (seconds < 1) return 'Instantáneo';
    if (seconds < 60) return `${Math.round(seconds)} segundos`;
    if (seconds < 3600) return `${Math.round(seconds / 60)} minutos`;
    if (seconds < 86400) return `${Math.round(seconds / 3600)} horas`;
    if (seconds < 31536000) return `${Math.round(seconds / 86400)} días`;
    if (seconds < 3.154e10) return `${Math.round(seconds / 31536000)} años`;
    if (seconds < 3.154e13) return `${(seconds / 3.154e10).toFixed(0)} mil años`;
    return 'Billones de años';
}

const strengthLabels = ['', 'Muy débil', 'Débil', 'Débil', 'Regular', 'Regular', 'Fuerte', 'Muy fuerte'];
const strengthColors = ['', '#ff4757', '#ff6b81', '#fca343', '#feca57', '#a8e063', '#00e4b8', '#00e4b8'];

export default function PasswordGenerator() {
    const [length, setLength] = useState(16);
    const [options, setOptions] = useState({ upper: true, lower: true, numbers: true, symbols: true, noAmbiguous: false });
    const [password, setPassword] = useState(() => generatePassword(16, { upper: true, lower: true, numbers: true, symbols: true, noAmbiguous: false }));
    const [copied, setCopied] = useState(false);

    const generate = useCallback(() => {
        setPassword(generatePassword(length, options));
        setCopied(false);
    }, [length, options]);

    const handleOption = (key) => {
        const next = { ...options, [key]: !options[key] };
        const anyActive = next.upper || next.lower || next.numbers || next.symbols;
        if (!anyActive) return;
        setOptions(next);
        setPassword(generatePassword(length, next));
        setCopied(false);
    };

    const handleLength = (val) => {
        setLength(val);
        setPassword(generatePassword(val, options));
        setCopied(false);
    };

    const copy = async () => {
        await navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const strength = calcStrength(password);
    const strengthLabel = strengthLabels[strength] || 'Muy débil';
    const strengthColor = strengthColors[strength] || '#ff4757';
    const strengthPercent = Math.round((strength / 7) * 100);

    const Toggle = ({ label, optKey }) => (
        <button
            onClick={() => handleOption(optKey)}
            className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all text-sm
                ${options[optKey]
                    ? 'border-[#0090ff]/30 bg-[#0090ff]/5 text-white'
                    : 'border-white/[0.06] text-[#5a6a7a] hover:border-white/10'}`}
        >
            <span>{label}</span>
            <div className={`w-10 h-5 rounded-full transition-all relative ${options[optKey] ? 'bg-[#0090ff]' : 'bg-white/10'}`}>
                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${options[optKey] ? 'left-5' : 'left-0.5'}`} />
            </div>
        </button>
    );

    return (
        <div className="max-w-[700px] mx-auto px-6 py-16">
            {/* Header */}
            <div className="text-center mb-10">
                <h1 className="text-3xl font-extrabold mb-2">
                    🔐 Generador de <span className="bg-gradient-to-r from-[#00e4b8] to-[#0090ff] bg-clip-text text-transparent">Contraseñas</span>
                </h1>
                <p className="text-[#8899aa]">Genera contraseñas seguras con cripto-aleatoriedad real. Nada se envía a ningún servidor.</p>
            </div>

            {/* Password display */}
            <div className="bg-[#0d1117] border border-white/[0.06] rounded-2xl p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="flex-1 font-mono text-xl font-bold tracking-widest break-all leading-relaxed text-white/90 bg-black/20 rounded-xl px-4 py-4 min-h-[64px] flex items-center">
                        {password || <span className="text-[#5a6a7a] text-sm font-sans">Selecciona al menos un tipo de carácter</span>}
                    </div>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={generate}
                        className="flex-1 py-3 rounded-xl border border-white/[0.06] text-sm font-semibold text-[#8899aa] hover:border-[#0090ff]/20 hover:text-white transition flex items-center justify-center gap-2"
                    >
                        🎲 Generar nueva
                    </button>
                    <button
                        onClick={copy}
                        disabled={!password}
                        className={`flex-1 py-3 rounded-xl text-sm font-semibold transition flex items-center justify-center gap-2
                            ${copied
                                ? 'bg-[#00e4b8]/10 border border-[#00e4b8]/30 text-[#00e4b8]'
                                : 'bg-gradient-to-r from-[#0090ff] to-[#00bfff] text-white hover:shadow-[0_6px_25px_rgba(0,144,255,.3)]'}`}
                    >
                        {copied ? '✓ ¡Copiada!' : '📋 Copiar'}
                    </button>
                </div>
            </div>

            {/* Strength indicator */}
            {password && (
                <div className="bg-[#0d1117] border border-white/[0.06] rounded-2xl p-5 mb-6">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-[#8899aa]">Fortaleza</span>
                        <span className="text-sm font-bold" style={{ color: strengthColor }}>{strengthLabel}</span>
                    </div>
                    <div className="relative h-2 bg-white/5 rounded-full overflow-hidden mb-3">
                        <div
                            className="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
                            style={{ width: `${strengthPercent}%`, background: strengthColor }}
                        />
                    </div>
                    <div className="flex items-center justify-between text-xs text-[#5a6a7a]">
                        <span>Tiempo para crackear (GPU):</span>
                        <span className="font-semibold text-[#8899aa]">{calcCrackTime(password)}</span>
                    </div>
                </div>
            )}

            {/* Controls */}
            <div className="bg-[#0d1117] border border-white/[0.06] rounded-2xl p-6">
                {/* Length */}
                <div className="mb-6">
                    <div className="flex justify-between text-sm mb-3">
                        <span className="text-[#8899aa]">Longitud</span>
                        <span className="text-[#0090ff] font-bold">{length} caracteres</span>
                    </div>
                    <input
                        type="range" min="8" max="128" value={length}
                        onChange={e => handleLength(Number(e.target.value))}
                        className="w-full h-1 rounded-full bg-white/10 appearance-none cursor-pointer
                                   [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
                                   [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#0090ff] [&::-webkit-slider-thumb]:shadow-[0_2px_8px_rgba(0,144,255,.3)]"
                    />
                    <div className="flex justify-between text-xs text-[#5a6a7a] mt-1">
                        <span>8</span><span>128</span>
                    </div>
                </div>

                {/* Toggles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Toggle label="Mayúsculas (A-Z)" optKey="upper" />
                    <Toggle label="Minúsculas (a-z)" optKey="lower" />
                    <Toggle label="Números (0-9)" optKey="numbers" />
                    <Toggle label="Símbolos (!@#$...)" optKey="symbols" />
                    <Toggle label="Excluir ambiguos (0,O,l,1,I)" optKey="noAmbiguous" />
                </div>
            </div>
        </div>
    );
}
