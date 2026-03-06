import jsPDF from 'jspdf';

/**
 * Genera un PDF del briefing completo.
 * Retorna un string base64 del PDF.
 */
export async function generateBriefingPDF(formData) {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const W = 210; // A4 width mm
    const margin = 20;
    const contentW = W - margin * 2;
    let y = 0;

    const PURPLE = [108, 99, 255];
    const DARK   = [10, 10, 15];
    const GRAY   = [139, 139, 158];
    const WHITE  = [240, 240, 245];
    const BORDER = [42, 42, 58];

    // ── HELPER FUNCTIONS ──────────────────────────────────────────
    const addPage = () => {
        doc.addPage();
        y = margin;
    };

    const checkPageBreak = (neededMm = 20) => {
        if (y + neededMm > 280) addPage();
    };

    const setFont = (family = 'helvetica', style = 'normal', size = 11) => {
        doc.setFont(family, style);
        doc.setFontSize(size);
    };

    const setColor = (rgb) => doc.setTextColor(...rgb);

    const text = (str, x, yPos, opts = {}) => {
        if (!str) return;
        doc.text(String(str), x, yPos, opts);
    };

    const drawLine = () => {
        doc.setDrawColor(...BORDER);
        doc.setLineWidth(0.3);
        doc.line(margin, y, W - margin, y);
        y += 6;
    };

    // ── PORTADA ───────────────────────────────────────────────────
    // Fondo oscuro
    doc.setFillColor(...DARK);
    doc.rect(0, 0, W, 297, 'F');

    // Banda violeta superior
    doc.setFillColor(...PURPLE);
    doc.rect(0, 0, W, 60, 'F');

    setFont('helvetica', 'bold', 22);
    setColor(WHITE);
    text('BRIEFING DE DISEÑO WEB', W / 2, 28, { align: 'center' });
    setFont('helvetica', 'normal', 13);
    setColor([200, 200, 220]);
    text('Páginas Web Creativas', W / 2, 40, { align: 'center' });
    text('paginaswebcreativas.com', W / 2, 49, { align: 'center' });

    // Card de datos del cliente
    doc.setFillColor(19, 19, 26); // bg-card
    doc.roundedRect(margin, 80, contentW, 70, 4, 4, 'F');

    setFont('helvetica', 'bold', 14);
    setColor([...PURPLE]);
    text(formData.empresa || '', margin + 10, 100);

    const infoRows = [
        ['Cliente', formData.nombre || ''],
        ['Email',   formData.email  || ''],
        ['Teléfono', formData.telefono || ''],
        ['Fecha',   new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })],
    ];
    setFont('helvetica', 'normal', 10);
    infoRows.forEach(([label, val], i) => {
        const rowY = 112 + i * 10;
        setColor(GRAY);
        text(label + ':', margin + 10, rowY);
        setColor(WHITE);
        text(val, margin + 45, rowY);
    });

    // ── PÁGINAS DE CONTENIDO ──────────────────────────────────────
    addPage();

    // Borde superior en cada página
    doc.setFillColor(...DARK);
    doc.rect(0, 0, W, 297, 'F');
    doc.setFillColor(...PURPLE);
    doc.rect(0, 0, W, 8, 'F');

    const sectionTitle = (title, icon = '') => {
        checkPageBreak(20);
        doc.setFillColor(19, 19, 26);
        doc.roundedRect(margin, y, contentW, 12, 2, 2, 'F');
        setFont('helvetica', 'bold', 11);
        setColor([...PURPLE]);
        text(`${icon}  ${title}`, margin + 6, y + 8);
        y += 18;
    };

    const field = (label, value) => {
        if (!value && value !== 0) return;
        const strVal = Array.isArray(value) ? value.join(', ') : String(value);
        if (!strVal.trim()) return;
        checkPageBreak(14);
        setFont('helvetica', 'bold', 9);
        setColor(GRAY);
        text(label, margin, y);
        y += 5;
        setFont('helvetica', 'normal', 10);
        setColor(WHITE);
        // Wrap text
        const lines = doc.splitTextToSize(strVal, contentW);
        lines.forEach((line) => {
            checkPageBreak(6);
            text(line, margin, y);
            y += 5.5;
        });
        y += 3;
    };

    // ── SECCIÓN 1: CONTACTO ──
    sectionTitle('Datos de Contacto', '01');
    field('Nombre', formData.nombre);
    field('Empresa', formData.empresa);
    field('Email', formData.email);
    field('Teléfono / WhatsApp', formData.telefono);
    drawLine();

    // ── SECCIÓN 2: NEGOCIO ──
    sectionTitle('Negocio', '02');
    field('Industria', formData.negocio?.industria);
    field('¿Qué hace tu empresa?', formData.negocio?.descripcion);
    field('Diferenciador', formData.negocio?.diferenciador);
    drawLine();

    // ── SECCIÓN 3: SERVICIOS ──
    if (formData.servicios?.length) {
        sectionTitle('Servicios', '03');
        formData.servicios.forEach((svc, i) => {
            checkPageBreak(12);
            setFont('helvetica', 'bold', 10);
            setColor(WHITE);
            text(`${i + 1}. ${svc.nombre || ''}`, margin, y);
            y += 5;
            if (svc.descripcion) {
                setFont('helvetica', 'normal', 9);
                setColor(GRAY);
                const lines = doc.splitTextToSize(svc.descripcion, contentW - 6);
                lines.forEach((l) => { text(l, margin + 6, y); y += 5; });
            }
            y += 2;
        });
        drawLine();
    }

    // ── SECCIÓN 4: LOGO ──
    sectionTitle('Logo', '04');
    if (formData.logoSkipped) {
        field('Estado', 'No tiene logo aún — lo necesita como parte del proyecto');
    } else if (formData.logoUrl || formData.logoFile) {
        field('Logo', 'Logo subido por el cliente (ver archivos adjuntos)');
    }
    drawLine();

    // ── SECCIÓN 5: COLORES ──
    sectionTitle('Colores de Marca', '05');
    if (formData.colores?.length) {
        checkPageBreak(16);
        formData.colores.forEach((color, i) => {
            doc.setFillColor(color);
            doc.circle(margin + 8 + i * 22, y, 5, 'F');
            setFont('helvetica', 'normal', 8);
            setColor(GRAY);
            text(color, margin + 2 + i * 22, y + 10, { align: 'center' });
        });
        y += 18;
    } else {
        field('Colores', 'No definidos todavía');
    }
    drawLine();

    // ── SECCIÓN 6: TIPOGRAFÍA ──
    sectionTitle('Tipografía', '06');
    field('¿Tiene fuentes definidas?', formData.tipografia?.tieneFuentes === 'si' ? 'Sí' : 'No');
    if (formData.tipografia?.fuentes) field('Fuentes', formData.tipografia.fuentes);
    drawLine();

    // ── SECCIÓN 7: WEB ACTUAL ──
    sectionTitle('Web Actual', '07');
    field('¿Tiene web?', formData.webActual?.tieneWeb === 'si' ? 'Sí' : 'No');
    if (formData.webActual?.tieneWeb === 'si') {
        field('URL actual', formData.webActual?.url);
        field('¿Qué no le gusta?', formData.webActual?.noLeGusta);
        field('¿Mantener dominio?', formData.webActual?.mantenerDominio);
    }
    drawLine();

    // ── SECCIÓN 8: NUEVA WEB ──
    sectionTitle('Nueva Web', '08');
    field('Tipo de sitio', formData.webNueva?.tipo);
    field('Páginas requeridas', formData.webNueva?.paginas);
    field('¿Tiene los textos listos?', formData.webNueva?.textos === 'si' ? 'Sí, los tiene' : 'No, necesita ayuda con el copy');
    if (formData.webNueva?.paginaOtro) field('Otras páginas', formData.webNueva.paginaOtro);
    drawLine();

    // ── SECCIÓN 9: AUDIENCIA ──
    sectionTitle('Audiencia', '09');
    field('Cliente ideal', formData.audiencia?.descripcion);
    field('Idiomas', formData.audiencia?.idiomas);
    drawLine();

    // ── SECCIÓN 10: INSPIRACIÓN ──
    if (formData.inspiracion?.some(i => i.url)) {
        sectionTitle('Inspiración', '10');
        formData.inspiracion.filter(i => i.url).forEach((insp, idx) => {
            field(`Web ${idx + 1}`, insp.url);
            if (insp.comentario) field('¿Qué le gusta?', insp.comentario);
        });
        drawLine();
    }

    // ── SECCIÓN 11: ARCHIVOS ──
    if (formData.archivos?.length) {
        sectionTitle('Archivos Adjuntos', '11');
        formData.archivos.forEach((a) => {
            field('Archivo', a.name || a.url);
        });
        drawLine();
    }

    // ── SECCIÓN 12: COMENTARIOS ──
    if (formData.comentarios?.trim()) {
        sectionTitle('Comentarios Finales', '12');
        field('Comentarios adicionales', formData.comentarios);
        drawLine();
    }

    // ── PIE DE PÁGINA EN TODAS LAS PÁGINAS ──
    const total = doc.internal.getNumberOfPages();
    for (let p = 1; p <= total; p++) {
        doc.setPage(p);
        setFont('helvetica', 'normal', 8);
        setColor(GRAY);
        text('paginaswebcreativas.com  ·  contacto@paginaswebcreativas.com  ·  55 2671 1438', W / 2, 290, { align: 'center' });
        text(`Página ${p} de ${total}`, W - margin, 290, { align: 'right' });
    }

    return doc.output('datauristring');
}
