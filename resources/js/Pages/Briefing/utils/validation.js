// Validaciones por paso — devuelve objeto { campo: 'mensaje de error' }
// Si está vacío el objeto, el paso es válido.

export function validateStep(step, data) {
    const errors = {};

    switch (step) {
        case 1: {
            if (!data.nombre?.trim()) errors.nombre = 'El nombre es obligatorio.';
            if (!data.empresa?.trim()) errors.empresa = 'El nombre de la empresa es obligatorio.';
            if (!data.email?.trim()) {
                errors.email = 'El correo es obligatorio.';
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
                errors.email = 'Ingresa un correo válido.';
            }
            if (!data.telefono?.trim()) errors.telefono = 'El teléfono / WhatsApp es obligatorio.';
            break;
        }
        case 2: {
            if (!data.negocio?.industria) errors.industria = 'Selecciona una industria.';
            if (!data.negocio?.descripcion?.trim()) errors.descripcion = 'Describe brevemente tu empresa.';
            if (!data.negocio?.diferenciador?.trim()) errors.diferenciador = 'Cuéntanos qué te hace diferente.';
            break;
        }
        case 3: {
            const servicios = data.servicios || [];
            if (!servicios.length || !servicios[0]?.nombre?.trim()) {
                errors.servicios = 'Agrega al menos un servicio con nombre.';
            }
            break;
        }
        case 4: {
            if (!data.logoFile && !data.logoUrl && !data.logoSkipped) {
                errors.logo = 'Sube tu logo o marca la opción "Aún no tengo logo".';
            }
            break;
        }
        // Pasos 5, 6, 10, 11, 12 son opcionales (pueden saltarse)
        case 6: {
            if (!data.tipografia?.tieneFuentes) {
                errors.tieneFuentes = 'Selecciona si tienes fuentes definidas o no.';
            }
            break;
        }
        case 7: {
            if (!data.webActual?.tieneWeb) {
                errors.tieneWeb = '¿Ya tienes una página web? Selecciona una opción.';
            }
            if (data.webActual?.tieneWeb === 'si') {
                const url = data.webActual?.url?.trim();
                if (!url) {
                    errors.url = 'Ingresa la URL de tu web actual.';
                } else if (!/^https?:\/\/.+/.test(url)) {
                    errors.url = 'La URL debe comenzar con http:// o https://';
                }
                if (!data.webActual?.mantenerDominio) {
                    errors.mantenerDominio = 'Indica si quieres mantener el dominio.';
                }
            }
            break;
        }
        case 8: {
            if (!data.webNueva?.tipo) errors.tipo = 'Selecciona el tipo de sitio que necesitas.';
            if (!data.webNueva?.paginas?.length) errors.paginas = 'Selecciona al menos una página.';
            if (!data.webNueva?.textos) errors.textos = 'Indica si tienes los textos listos.';
            break;
        }
        case 9: {
            if (!data.audiencia?.descripcion?.trim()) {
                errors.descripcion = 'Describe a tu cliente ideal.';
            }
            if (!data.audiencia?.idiomas?.length) {
                errors.idiomas = 'Selecciona al menos un idioma.';
            }
            break;
        }
    }

    return errors;
}

// Normaliza URLs — agrega https:// si no tiene protocolo
export function normalizeUrl(url) {
    if (!url) return url;
    const trimmed = url.trim();
    if (!trimmed) return trimmed;
    if (/^https?:\/\//.test(trimmed)) return trimmed;
    return 'https://' + trimmed;
}

// Formatea tamaño de archivo
export function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}
