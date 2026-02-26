<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Traits\HasSeoData;
use App\Models\Service;

class ServiciosController extends Controller
{
    use HasSeoData;

    public function index()
    {
        return Inertia::render('Servicios/Index', array_merge(
            $this->seo([
                'title'       => 'Servicios de Diseño Web en México | Páginas Web Creativas',
                'description' => 'Diseño de páginas web, tiendas online, escuelas virtuales y aplicaciones web desde $8,999 MXN. Cotiza sin compromiso.',
                'canonical'   => url('/servicios'),
            ]),
            [
                'services' => Service::all(),
            ]
        ));
    }

    public function paginasWeb()
    {
        return Inertia::render('Servicios/PaginasWeb', $this->seo([
            'title'       => 'Diseño de Páginas Web Profesionales en México | Desde $8,999 MXN',
            'description' => 'Creamos páginas web profesionales que convierten visitantes en clientes. Diseño moderno, rápido y optimizado para SEO. Entrega en 15 días.',
            'canonical'   => url('/servicios/paginas-web'),
        ]));
    }

    public function tiendasOnline()
    {
        return Inertia::render('Servicios/TiendasOnline', $this->seo([
            'title'       => 'Tiendas Online en México | E-Commerce Profesional | Desde $14,999 MXN',
            'description' => 'Creamos tiendas en línea con carrito de compras, pasarela de pagos (Stripe/PayPal/Conekta) y gestión de inventario. Vende 24/7.',
            'canonical'   => url('/servicios/tiendas-online'),
        ]));
    }

    public function escuelasVirtuales()
    {
        return Inertia::render('Servicios/EscuelasVirtuales', $this->seo([
            'title'       => 'Escuelas Virtuales y Plataformas E-Learning en México | PWC',
            'description' => 'Desarrollamos plataformas educativas online con cursos, videos, quizzes y certificados digitales. Monetiza tu conocimiento.',
            'canonical'   => url('/servicios/escuelas-virtuales'),
        ]));
    }

    public function aplicacionesWeb()
    {
        return Inertia::render('Servicios/AplicacionesWeb', $this->seo([
            'title'       => 'Aplicaciones Web a Medida en México | Páginas Web Creativas',
            'description' => 'Desarrollamos aplicaciones web personalizadas: CRMs, dashboards, portales de clientes y sistemas de gestión a la medida de tu negocio.',
            'canonical'   => url('/servicios/aplicaciones-web'),
        ]));
    }
}
