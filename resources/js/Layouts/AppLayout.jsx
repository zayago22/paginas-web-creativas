import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function AppLayout({ children, title }) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <>
            {/* Background Blobs */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute w-[600px] h-[600px] rounded-full bg-[#0090ff] blur-[120px] opacity-[0.15] -top-[10%] -left-[10%] animate-float" />
                <div className="absolute w-[500px] h-[500px] rounded-full bg-[#00bfff] blur-[120px] opacity-[0.15] top-[30%] -right-[15%] animate-float-delayed" />
                <div className="absolute w-[450px] h-[450px] rounded-full bg-[#7c5cfc] blur-[120px] opacity-[0.15] bottom-[10%] left-[20%] animate-float-slow" />
            </div>

            {/* Mobile Nav Overlay */}
            {mobileOpen && (
                <div className="fixed inset-0 bg-[#0c1222]/98 z-[999] flex flex-col items-center justify-center gap-8">
                    <button onClick={() => setMobileOpen(false)} className="absolute top-5 right-6 text-white text-2xl">✕</button>
                    {['servicios', 'portafolio', 'herramientas', 'precios', 'blog'].map(item => (
                        <a key={item} href={`#${item}`} onClick={() => setMobileOpen(false)}
                           className="text-xl font-semibold text-white hover:text-[#0090ff] capitalize transition">
                            {item}
                        </a>
                    ))}
                </div>
            )}

            {/* Navbar */}
            <nav className={`fixed top-0 left-0 right-0 z-[1000] py-3 transition-all duration-400
                ${scrolled ? 'bg-[#0c1222]/85 backdrop-blur-xl border-b border-white/[0.06] py-2' : ''}`}>
                <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
                    <Link href="/" className="flex items-center">
                        <img src="/images/logo.svg" alt="Páginas Web Creativas" className="h-20 w-auto" />
                    </Link>

                    <ul className="hidden lg:flex items-center gap-8">
                        {[
                            ['Servicios', '#servicios'],
                            ['Portafolio', '#portafolio'],
                            ['Herramientas', '/herramientas'],
                            ['Precios', '#precios'],
                            ['Blog', '/blog'],
                        ].map(([label, href]) => (
                            <li key={label}>
                                {href.startsWith('/') ? (
                                    <Link href={href} className="text-sm font-medium text-[#94a3b8] hover:text-white transition">{label}</Link>
                                ) : (
                                    <a href={href} className="text-sm font-medium text-[#94a3b8] hover:text-white transition">{label}</a>
                                )}
                            </li>
                        ))}
                    </ul>

                    <a href="https://wa.me/5215526711438" target="_blank" rel="noopener"
                       className="hidden lg:block px-6 py-2.5 rounded-full bg-[#0090ff] text-white font-semibold text-sm hover:bg-[#0070d6] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,144,255,.3)] transition-all">
                        Cotizar Proyecto
                    </a>

                    <button onClick={() => setMobileOpen(true)} className="lg:hidden text-white text-xl">☰</button>
                </div>
            </nav>

            {/* Page Content */}
            <div className="relative z-[1]">
                {children}
            </div>

            {/* Footer */}
            <footer className="border-t border-white/[0.06] py-20 relative z-[1]">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
                        <div>
                            <Link href="/" className="inline-flex items-center mb-5">
                                <img src="/images/logo.svg" alt="Páginas Web Creativas" className="h-16 w-auto" />
                            </Link>
                            <p className="text-sm text-[#94a3b8] leading-relaxed max-w-[280px] mb-5">
                                Diseñamos experiencias web que convierten visitantes en clientes. +100 proyectos en México.
                            </p>
                            <div className="space-y-2">
                                <a href="mailto:hola@rekobit.com" className="flex items-center gap-2 text-sm text-[#94a3b8] hover:text-[#0090ff] transition">
                                    <span className="text-[#0090ff]">✉</span> hola@rekobit.com
                                </a>
                                <a href="mailto:contacto@paginaswebcreativas.com" className="flex items-center gap-2 text-sm text-[#94a3b8] hover:text-[#0090ff] transition">
                                    <span className="text-[#0090ff]">✉</span> contacto@paginaswebcreativas.com
                                </a>
                                <a href="tel:5526711438" className="flex items-center gap-2 text-sm text-[#94a3b8] hover:text-[#0090ff] transition">
                                    <span className="text-[#0090ff]">✆</span> 55 2671 1438
                                </a>
                                <span className="flex items-center gap-2 text-sm text-[#94a3b8]">
                                    <span className="text-[#0090ff]">⊙</span> Ciudad de México
                                </span>
                            </div>
                        </div>
                        {[
                            { title: 'Servicios', links: [['Página Web', '#servicios'], ['Tienda Online', '#servicios'], ['Escuela Online', '#servicios'], ['Ver Precios', '#precios']] },
                            { title: 'Herramientas', links: [['Compresor', '/herramientas/compresor-imagenes'], ['Redimensionar', '/herramientas/redimensionar-imagenes'], ['Convertidor WebP', '/herramientas/convertir-webp'], ['Generador QR', '/herramientas/generador-qr']] },
                            { title: 'Empresa', links: [['Portafolio', '#portafolio'], ['Blog', '/blog'], ['Contacto', '#contacto'], ['Privacidad', '#']] },
                        ].map(col => (
                            <div key={col.title}>
                                <h5 className="text-xs font-bold uppercase tracking-wider mb-5">{col.title}</h5>
                                {col.links.map(([label, href]) => (
                                    <a key={label} href={href} className="block text-sm text-[#94a3b8] py-1.5 hover:text-[#0090ff] transition">{label}</a>
                                ))}
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/[0.06] text-xs text-[#64748b]">
                        <span>© 2026 Páginas Web Creativas. Todos los derechos reservados.</span>
                        <div className="flex items-center gap-4 mt-4 md:mt-0">
                            <a href="#" target="_blank" rel="noopener" className="hover:text-[#0090ff] transition">Facebook</a>
                            <a href="#" target="_blank" rel="noopener" className="hover:text-[#0090ff] transition">Instagram</a>
                            <a href="https://wa.me/5215526711438?text=Hola! Me interesa un proyecto web" target="_blank" rel="noopener" className="hover:text-[#25d366] transition">WhatsApp</a>
                        </div>
                    </div>
                </div>
            </footer>

            {/* WhatsApp Float */}
            <a href="https://wa.me/5215526711438?text=Hola! Me interesa un proyecto web" target="_blank" rel="noopener"
               className="fixed bottom-6 right-6 z-[999] w-[60px] h-[60px] rounded-full bg-[#25d366] flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,.4)] hover:scale-110 hover:shadow-[0_6px_30px_rgba(37,211,102,.5)] transition-all animate-bounce-wa">
                <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
            </a>
        </>
    );
}
