import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import BriefingLayout from '../../Layouts/BriefingLayout';
import ProgressBar from './components/ProgressBar';
import StepWrapper from './components/StepWrapper';
import NavigationButtons from './components/NavigationButtons';
import { validateStep } from './utils/validation';

// ── Lazy load steps ──────────────────────────────────────────────────────
const Step01 = lazy(() => import('./steps/Step01_Contacto'));
const Step02 = lazy(() => import('./steps/Step02_Negocio'));
const Step03 = lazy(() => import('./steps/Step03_Servicios'));
const Step04 = lazy(() => import('./steps/Step04_Logo'));
const Step05 = lazy(() => import('./steps/Step05_Colores'));
const Step06 = lazy(() => import('./steps/Step06_Tipografia'));
const Step07 = lazy(() => import('./steps/Step07_WebActual'));
const Step08 = lazy(() => import('./steps/Step08_NuevaWeb'));
const Step09 = lazy(() => import('./steps/Step09_Audiencia'));
const Step10 = lazy(() => import('./steps/Step10_Inspiracion'));
const Step11 = lazy(() => import('./steps/Step11_Archivos'));
const Step12 = lazy(() => import('./steps/Step12_Comentarios'));
const Step13 = lazy(() => import('./steps/Step13_Resumen'));

const STEPS = [
    { id: 1,  label: 'Contacto',     num: '01', subtitle: 'Hola 👋 Comencemos con tus datos', Component: Step01, optional: false },
    { id: 2,  label: 'Negocio',      num: '02', subtitle: 'Cuéntanos sobre tu negocio', Component: Step02, optional: false },
    { id: 3,  label: 'Servicios',    num: '03', subtitle: '¿Qué servicios ofreces?', Component: Step03, optional: false },
    { id: 4,  label: 'Logo',         num: '04', subtitle: 'Sube tu logo', Component: Step04, optional: false },
    { id: 5,  label: 'Colores',      num: '05', subtitle: '¿Cuáles son los colores de tu marca?', Component: Step05, optional: true },
    { id: 6,  label: 'Tipografía',   num: '06', subtitle: '¿Usas alguna tipografía en tu marca?', Component: Step06, optional: false },
    { id: 7,  label: 'Web Actual',   num: '07', subtitle: '¿Ya tienes una página web?', Component: Step07, optional: false },
    { id: 8,  label: 'Nueva Web',    num: '08', subtitle: '¿Qué tipo de web necesitas?', Component: Step08, optional: false },
    { id: 9,  label: 'Audiencia',    num: '09', subtitle: '¿A quién va dirigida tu web?', Component: Step09, optional: false },
    { id: 10, label: 'Inspiración',  num: '10', subtitle: '¿Qué webs te gustan?', Component: Step10, optional: true },
    { id: 11, label: 'Archivos',     num: '11', subtitle: '¿Tienes materiales para compartir?', Component: Step11, optional: true },
    { id: 12, label: 'Comentarios',  num: '12', subtitle: '¿Algo más que debamos saber?', Component: Step12, optional: true },
    { id: 13, label: 'Resumen',      num: '13', subtitle: '¡Todo listo! Revisa tu información', Component: Step13, optional: false },
];

const STORAGE_KEY = 'briefing_pwc_v1';
const TOTAL = STEPS.length;

const INITIAL_DATA = {
    nombre: '', empresa: '', email: '', telefono: '',
    negocio: {}, servicios: [{ nombre: '', descripcion: '' }],
    logoUrl: null, logoName: null, logoSkipped: false,
    colores: [], tipografia: {}, webActual: {}, webNueva: {},
    audiencia: {}, inspiracion: [{ url: '', comentario: '' }],
    archivos: [], comentarios: '',
};

function StepLoader() {
    return (
        <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
                style={{ borderColor: '#6C63FF', borderTopColor: 'transparent' }} />
        </div>
    );
}

export default function BriefingIndex({ meta }) {
    const [currentStep, setCurrentStep] = useState(1);
    const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
    const [formData, setFormData] = useState(INITIAL_DATA);
    const [errors, setErrors] = useState({});
    const [showResumeModal, setShowResumeModal] = useState(false);

    // ── Cargar datos de localStorage al montar ────────────────────────────
    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                if (parsed.formData && parsed.step > 1) {
                    setShowResumeModal(true);
                    // Guardamos en un ref temporal para procesar en el modal
                    window.__briefingSaved = parsed;
                }
            }
        } catch {}
    }, []);

    // ── Guardar en localStorage en cada cambio ────────────────────────────
    useEffect(() => {
        if (currentStep === 13 && formData._submitted) return;
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({ formData, step: currentStep }));
        } catch {}
    }, [formData, currentStep]);

    const goToStep = useCallback((step) => {
        setDirection(step > currentStep ? 1 : -1);
        setCurrentStep(step);
        setErrors({});
        // Focus al título del nuevo paso
        setTimeout(() => {
            document.getElementById('step-title')?.focus();
        }, 300);
    }, [currentStep]);

    const handleNext = () => {
        const stepErrors = validateStep(currentStep, formData);
        if (Object.keys(stepErrors).length > 0) {
            setErrors(stepErrors);
            // Scroll al primer error
            setTimeout(() => {
                document.querySelector('[data-error]')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 50);
            return;
        }
        setErrors({});
        if (currentStep < TOTAL) goToStep(currentStep + 1);
    };

    const handleBack = () => {
        if (currentStep > 1) goToStep(currentStep - 1);
    };

    const currentStepConfig = STEPS[currentStep - 1];
    const { Component } = currentStepConfig;

    return (
        <BriefingLayout meta={meta}>
            {/* Modal "continuar donde lo dejé" */}
            {showResumeModal && (
                <div
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
                    style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}
                >
                    <div
                        className="max-w-sm w-full p-6 rounded-2xl space-y-4"
                        style={{ background: 'var(--briefing-card)', border: '1px solid var(--briefing-border)' }}
                    >
                        <p
                            className="text-lg font-bold"
                            style={{ fontFamily: "'Syne', sans-serif", color: 'var(--briefing-text)' }}
                        >
                            ¿Continuar donde lo dejaste?
                        </p>
                        <p className="text-sm" style={{ color: 'var(--briefing-text-muted)' }}>
                            Encontramos un formulario que no terminaste. ¿Quieres continuar?
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    const saved = window.__briefingSaved;
                                    if (saved) {
                                        setFormData(saved.formData);
                                        setCurrentStep(saved.step);
                                    }
                                    setShowResumeModal(false);
                                }}
                                className="flex-1 py-3 rounded-xl font-semibold text-sm text-white transition"
                                style={{ background: '#6C63FF' }}
                            >
                                Continuar
                            </button>
                            <button
                                onClick={() => {
                                    localStorage.removeItem(STORAGE_KEY);
                                    setShowResumeModal(false);
                                }}
                                className="flex-1 py-3 rounded-xl font-semibold text-sm transition"
                                style={{ border: '1px solid var(--briefing-border)', color: 'var(--briefing-text-muted)' }}
                            >
                                Empezar de nuevo
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <ProgressBar current={currentStep} total={TOTAL} />

            {/* Main content */}
            <div className="min-h-screen pt-[60px] pb-[100px] flex flex-col">
                <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
                    <div className="w-full max-w-2xl">
                        <StepWrapper stepKey={currentStep} direction={direction}>
                            <div className="space-y-6">
                                {/* Header del paso */}
                                <div>
                                    <p
                                        className="text-lg font-black mb-2 block"
                                        style={{ color: '#6C63FF', fontFamily: "'Syne', sans-serif", letterSpacing: '0.05em' }}
                                        aria-hidden="true"
                                    >
                                        {currentStepConfig.num} / {currentStepConfig.label}
                                    </p>
                                    <h1
                                        id="step-title"
                                        tabIndex={-1}
                                        className="text-2xl md:text-3xl font-black leading-tight outline-none"
                                        style={{ fontFamily: "'Syne', sans-serif", color: 'var(--briefing-text)' }}
                                    >
                                        {currentStepConfig.subtitle}
                                    </h1>
                                    {currentStepConfig.optional && currentStep !== 13 && (
                                        <p className="text-sm mt-2" style={{ color: 'var(--briefing-text-dim)' }}>
                                            Este paso es opcional — puedes saltarlo si no aplica.
                                        </p>
                                    )}
                                </div>

                                {/* Card de la pregunta */}
                                <div
                                    className="p-6 md:p-8 rounded-3xl"
                                    style={{
                                        background: 'var(--briefing-card)',
                                        border: '1px solid var(--briefing-border)',
                                        boxShadow: '0 0 40px rgba(108,99,255,0.08)',
                                    }}
                                >
                                    <Suspense fallback={<StepLoader />}>
                                        <Component
                                            data={formData}
                                            onChange={setFormData}
                                            errors={errors}
                                            onGoToStep={goToStep}
                                            onSkip={handleNext}
                                        />
                                    </Suspense>
                                </div>
                            </div>
                        </StepWrapper>
                    </div>
                </div>
            </div>

            {/* Botones de navegación fijos */}
            {currentStep !== 13 && (
                <NavigationButtons
                    onBack={handleBack}
                    onNext={handleNext}
                    isFirst={currentStep === 1}
                    isLast={currentStep === TOTAL - 1}
                    nextLabel={currentStepConfig.optional && currentStep !== TOTAL - 1 ? undefined : undefined}
                />
            )}
            {/* En el paso 13 (Resumen), los botones los maneja el Step13 directamente */}
        </BriefingLayout>
    );
}
