import { GradientText, Reveal } from '../Components/Home/shared';

export default function CtaSection({ whatsappBase }) {
    return (
        <section className="py-28">
            <div className="max-w-[1200px] mx-auto px-6">
                <Reveal>
                    <div className="text-center p-16 md:p-20 rounded-3xl bg-gradient-to-br from-[#0090ff]/10 to-[#00e4b8]/5 border border-[#0090ff]/15 relative overflow-hidden">
                        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#0090ff] blur-[120px] opacity-[0.15]" />
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-4 relative">
                            Tu competencia ya tiene<br /><GradientText>presencia online</GradientText>
                        </h2>
                        <p className="text-lg text-[#94a3b8] mb-8 max-w-[500px] mx-auto relative">
                            No te quedes atrás. Cotiza tu proyecto hoy y empieza a captar clientes.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative">
                            <a href="#contacto"
                               className="px-9 py-4 rounded-full bg-gradient-to-r from-[#0090ff] to-[#00bfff] text-white font-bold text-base hover:shadow-[0_8px_35px_rgba(0,144,255,.35)] hover:-translate-y-0.5 transition-all">
                                📝 Solicitar Cotización
                            </a>
                            <a href={`${whatsappBase}?text=${encodeURIComponent('Hola! Quiero cotizar mi proyecto web')}`}
                               target="_blank" rel="noopener"
                               className="px-9 py-4 rounded-full border border-white/[0.06] text-white font-semibold text-base hover:border-[#00e4b8] hover:bg-[#00e4b8]/5 transition-all">
                                💬 WhatsApp Directo
                            </a>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
