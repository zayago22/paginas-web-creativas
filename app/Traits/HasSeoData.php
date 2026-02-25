<?php

namespace App\Traits;

trait HasSeoData
{
    protected function seo(array $data = []): array
    {
        $defaults = [
            'title' => 'Páginas Web Creativas | Desarrollo Web Profesional en México',
            'description' => 'Agencia de desarrollo web en México. Diseñamos páginas web, tiendas online y escuelas virtuales con Laravel y React. +100 proyectos entregados. Desde $8,999 MXN.',
            'canonical' => url()->current(),
            'og_title' => null,
            'og_description' => null,
            'og_image' => asset('images/og-paginaswebcreativas.jpg'),
            'schema' => null,
            'extra_schema' => null,
        ];

        $merged = array_merge($defaults, $data);

        // og_title y og_description usan title/description si no se especifican
        $merged['og_title'] = $merged['og_title'] ?? $merged['title'];
        $merged['og_description'] = $merged['og_description'] ?? $merged['description'];

        return ['seo' => $merged];
    }
}
