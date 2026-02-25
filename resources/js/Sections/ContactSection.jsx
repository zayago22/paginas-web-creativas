import { useState } from 'react';
import { GradientText, Reveal, SectionLabel } from '../Components/Home/shared';

function ContactForm({ services }) {
    const [form, setForm] = useState({
        name: '', email: '', phone: '', service_interest: '', message: '',
    });
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('idle');

    const updateField = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        setErrors({});

        try {
            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || '',
                },
                body: JSON.stringify({ ...form, source: 'contact_form' }),
            });

            const data = await res.json();

            if (!res.ok) {
                if (res.status === 422 && data.errors) setErrors(data.errors);
                else throw new Error(data.message || 'Error al enviar');
                setStatus('error');
                return;
            }

            setStatus('success');
            setForm({ name: '', email: '', phone: '', service_interest: '', message: '' });
        } catch {
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="p-10 bg-[#141d2f] border border-[#00e4b8]/20 rounded-2xl text-center">
                <div className="w-16 h-16 rounded-full bg-[#00e4b8]/10 flex items-center justify-center text-3xl mx-auto mb-5">✓</div>
                <h3 className="text-xl font-bold mb-2">¡Mensaje enviado!</h3>
                <p className="text-[#94a3b8] mb-6">Te contactaremos en menos de 24 horas.</p>
                <button onClick={() => setStatus('idle')} className="text-sm text-[#0090ff] font-semibold hover:underline">
                    Enviar otro mensaje
                </button>
            </div>
        );
    }

    const inputClass = (field) =>
        `w-full px-5 py-3.5 bg-[#0c1222] border rounded-xl text-sm text-white placeholder-[#4a5568] outline-none transition-colors
         ${errors[field] ? 'border-red-500/50 focus:border-red-500' : 'border-white/[0.06] focus:border-[#0090ff]'}`;

    return (
        <form onSubmit={handleSubmit} className="p-8 md:p-10 bg-[#141d2f] border border-white/[0.06] rounded-2xl space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
                <div>
                    <label className="block text-sm font-medium mb-2">Nombre *</label>
                    <input type="text" placeholder="Tu nombre" value={form.name}
                           onChange={e => updateField('name', e.target.value)}
                           className={inputClass('name')} />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name[0]}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <input type="email" placeholder="tu@email.com" value={form.email}
                           onChange={e => updateField('email', e.target.value)}
                           className={inputClass('email')} />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email[0]}</p>}
                </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
                <div>
                    <label className="block text-sm font-medium mb-2">Teléfono</label>
                    <input type="tel" placeholder="+52 55 1234 5678" value={form.phone}
                           onChange={e => updateField('phone', e.target.value)}
                           className={inputClass('phone')} />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Servicio de interés</label>
                    <select value={form.service_interest}
                            onChange={e => updateField('service_interest', e.target.value)}
                            className={`${inputClass('service_interest')} appearance-none cursor-pointer`}>
                        <option value="" className="bg-[#0c1222]">Seleccionar...</option>
                        {services.map(svc => (
                            <option key={svc.slug} value={svc.slug} className="bg-[#0c1222]">
                                {svc.name} — ${Number(svc.price).toLocaleString()} MXN
                            </option>
                        ))}
                        <option value="otro" className="bg-[#0c1222]">Otro / No estoy seguro</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Cuéntanos sobre tu proyecto</label>
                <textarea placeholder="Describe brevemente lo que necesitas..." value={form.message}
                          onChange={e => updateField('message', e.target.value)}
                          rows={4}
                          className={`${inputClass('message')} resize-none`} />
            </div>

            <button type="submit" disabled={status === 'sending'}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#0090ff] to-[#00bfff] text-white font-bold text-base hover:shadow-[0_8px_30px_rgba(0,144,255,.3)] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:hover:translate-y-0">
                {status === 'sending' ? (
                    <span className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Enviando...
                    </span>
                ) : 'Enviar Mensaje →'}
            </button>

            {status === 'error' && !Object.keys(errors).length && (
                <p className="text-red-400 text-sm text-center">Hubo un error. Intenta de nuevo o contáctanos por WhatsApp.</p>
            )}

            <p className="text-xs text-[#4a5568] text-center">
                Al enviar aceptas ser contactado. No compartimos tu información.
            </p>
        </form>
    );
}

export default function ContactSection({ services, whatsappBase }) {
    return (
        <section className="py-28" id="contacto">
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    <Reveal>
                        <SectionLabel text="Contacto" />
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                            ¿Listo para <GradientText>tu nuevo sitio web</GradientText>?
                        </h2>
                        <p className="text-[#94a3b8] text-lg leading-relaxed mb-10">
                            Cuéntanos sobre tu proyecto y te contactaremos en menos de 24 horas con una propuesta personalizada.
                        </p>

                        <div className="space-y-6">
                            {[
                                { icon: '💬', title: 'WhatsApp directo', desc: 'Respuesta inmediata en horario laboral', action: `${whatsappBase}?text=${encodeURIComponent('Hola! Quiero cotizar mi proyecto web')}` },
                                { icon: '✉️', title: 'contacto@paginaswebcreativas.com', desc: 'Te respondemos en menos de 24h', action: 'mailto:contacto@paginaswebcreativas.com' },
                            ].map((item, i) => (
                                <a key={i} href={item.action} target={i === 0 ? '_blank' : undefined} rel="noopener"
                                   className="flex items-start gap-4 group">
                                    <div className="w-12 h-12 rounded-xl bg-[#0090ff]/10 flex items-center justify-center text-xl flex-shrink-0 group-hover:bg-[#0090ff]/20 transition">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold group-hover:text-[#0090ff] transition">{item.title}</h4>
                                        <p className="text-sm text-[#64748b]">{item.desc}</p>
                                    </div>
                                </a>
                            ))}
                        </div>

                        <div className="flex items-center gap-3 mt-10 pt-8 border-t border-white/[0.06]">
                            <div className="flex -space-x-2">
                                {['MR', 'CL', 'AF'].map((initials, i) => {
                                    const colors = ['from-[#0090ff] to-[#00bfff]', 'from-[#00e4b8] to-[#00a86b]', 'from-[#7c5cfc] to-[#a78bfa]'];
                                    return (
                                        <div key={i} className={`w-9 h-9 rounded-full bg-gradient-to-br ${colors[i]} flex items-center justify-center text-[.65rem] font-bold text-white border-2 border-[#0c1222]`}>
                                            {initials}
                                        </div>
                                    );
                                })}
                            </div>
                            <div>
                                <p className="text-sm font-semibold">+100 clientes satisfechos</p>
                                <div className="flex gap-0.5 text-[#feca57] text-xs">★★★★★</div>
                            </div>
                        </div>
                    </Reveal>

                    <Reveal delay={200}>
                        <ContactForm services={services} />
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
