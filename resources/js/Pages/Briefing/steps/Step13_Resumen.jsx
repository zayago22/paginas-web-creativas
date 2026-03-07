import { useState } from 'react';
import SummaryView from '../components/SummaryView';
import { generateBriefingPDF } from '../utils/generatePDF';
import axios from 'axios';
import { CheckCircle, Loader2 } from 'lucide-react';

export default function Step13_Resumen({ data, onGoToStep, onSuccess }) {
    const [confirmed, setConfirmed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null); // null | 'success' | 'error'
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async () => {
        if (!confirmed) {
            setErrorMsg('Debes confirmar que la información es correcta.');
            return;
        }
        setErrorMsg('');
        setLoading(true);

        try {
            // 1. Generar PDF con jsPDF
            let pdfBase64 = null;
            try {
                pdfBase64 = await generateBriefingPDF(data);
            } catch (e) {
                console.warn('PDF generation failed, continuing without PDF:', e);
            }

            // 2. Enviar al backend
            await axios.post('/api/briefings', {
                nombre:   data.nombre,
                empresa:  data.empresa,
                email:    data.email,
                telefono: data.telefono,
                data:     data,
                pdf:      pdfBase64,
            });

            // 3. Limpiar localStorage
            try { localStorage.removeItem('briefing_pwc_v1'); } catch {}

            setStatus('success');
            if (onSuccess) onSuccess();

        } catch (e) {
            setStatus('error');
            setErrorMsg('Ocurrió un error al enviar. Por favor inténtalo de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    // ── ESTADO DE ÉXITO ──
    if (status === 'success') {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center space-y-6">
                <div
                    className="w-24 h-24 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(74,222,128,0.12)', border: '2px solid rgba(74,222,128,0.3)' }}
                >
                    <CheckCircle size={48} style={{ color: '#4ADE80' }} />
                </div>
                <div className="space-y-2">
                    <h2
                        className="text-2xl font-bold"
                        style={{ fontFamily: "'Syne', sans-serif", color: 'var(--briefing-text)' }}
                    >
                        ¡Briefing enviado!
                    </h2>
                    <p className="text-base leading-relaxed" style={{ color: 'var(--briefing-text-muted)', maxWidth: '360px' }}>
                        Recibimos toda tu información. Nos pondremos en contacto contigo muy pronto — generalmente en menos de 24 horas.
                    </p>
                </div>
                <a
                    href="https://wa.me/5215526711438?text=Hola%21+Acabo+de+enviar+mi+briefing"
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white transition"
                    style={{ background: '#25d366', boxShadow: '0 4px 20px rgba(37,211,102,0.35)' }}
                >
                    <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Hablar por WhatsApp
                </a>
                <a href="/" className="text-sm" style={{ color: '#6C63FF' }}>← Volver al inicio</a>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <SummaryView formData={data} onGoToStep={onGoToStep} />

            {/* Confirmación */}
            <div className="space-y-4 pt-2">
                <button
                    type="button"
                    onClick={() => setConfirmed(c => !c)}
                    className="flex items-start gap-3 w-full text-left p-4 rounded-xl transition"
                    style={{
                        border: `1.5px solid ${confirmed ? '#6C63FF' : 'var(--briefing-border)'}`,
                        background: confirmed ? 'rgba(108,99,255,0.08)' : 'var(--briefing-card)',
                    }}
                >
                    <span
                        className="w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 transition"
                        style={{ borderColor: confirmed ? '#6C63FF' : 'var(--briefing-border)', background: confirmed ? '#6C63FF' : 'transparent' }}
                    >
                        {confirmed && <span style={{ color: '#fff', fontSize: '11px', fontWeight: 700 }}>✓</span>}
                    </span>
                    <p className="text-sm leading-relaxed" style={{ color: confirmed ? 'var(--briefing-text)' : 'var(--briefing-text-muted)' }}>
                        Confirmo que la información es correcta y autorizo a{' '}
                        <strong style={{ color: '#6C63FF' }}>paginaswebcreativas.com</strong>{' '}
                        a usarla para el desarrollo de mi proyecto.
                    </p>
                </button>

                {errorMsg && (
                    <p className="text-sm" style={{ color: '#F87171' }}>⚠ {errorMsg}</p>
                )}

                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading || !confirmed}
                    className="w-full flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-white transition-all duration-200"
                    style={{
                        background: confirmed && !loading ? '#6C63FF' : 'var(--briefing-border)',
                        boxShadow: confirmed && !loading ? '0 4px 30px rgba(108,99,255,0.4)' : 'none',
                        cursor: confirmed && !loading ? 'pointer' : 'not-allowed',
                        fontSize: '16px',
                        fontFamily: "'Syne', sans-serif",
                    }}
                >
                    {loading ? (
                        <>
                            <Loader2 size={20} className="animate-spin" />
                            Generando briefing...
                        </>
                    ) : (
                        'Enviar Briefing → Generar PDF'
                    )}
                </button>
            </div>
        </div>
    );
}
