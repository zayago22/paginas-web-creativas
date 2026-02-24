# Páginas Web Creativas — Sitio Web + Panel Admin

Sitio web corporativo con panel de administración para gestionar proyectos, blog y leads. Construido con Laravel 12, React 18 + Inertia.js y Tailwind CSS v4.

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Backend | Laravel 12, PHP 8.3 |
| Frontend | React 18, Inertia.js v2 |
| Estilos | Tailwind CSS v4 |
| Base de datos | MySQL 8 |
| Build | Vite 7 |
| Autenticación | Laravel Breeze |

## Características

**Sitio público**
- Landing page: Hero, Servicios, Portafolio, Testimonios, Herramientas, Blog, Contacto
- Portafolio con detalle por proyecto (imagen principal + hasta 10 fotos en lightbox)
- Blog con artículos SEO
- Herramientas gratuitas (Compresor de imágenes, Generador QR, Conversor WebP, etc.)
- Formulario de contacto con captura de leads

**Panel de administración** (`/admin`)
- Dashboard con estadísticas
- CRUD de Proyectos (galería de fotos, slug editable para SEO)
- CRUD de Blog (imagen, tags, campos SEO)
- Gestión de Leads (filtros, actualización de estado)

## Instalación local

### Requisitos
- PHP 8.3+
- Composer
- Node.js 20+
- MySQL 8+

### Pasos

```bash
# 1. Clonar repositorio
git clone https://github.com/zayago22/paginas-web-creativas.git
cd paginas-web-creativas

# 2. Instalar dependencias PHP
composer install

# 3. Copiar variables de entorno
cp .env.example .env

# 4. Generar clave de aplicación
php artisan key:generate

# 5. Configurar base de datos en .env
# DB_DATABASE=paginas_web_creativas
# DB_USERNAME=root
# DB_PASSWORD=

# 6. Migrar y poblar la base de datos
php artisan migrate --seed

# 7. Crear enlace de almacenamiento
php artisan storage:link

# 8. Instalar dependencias JS
npm install

# 9. Compilar assets (desarrollo)
npm run dev

# 10. Iniciar servidor Laravel (en otra terminal)
php artisan serve --port=8025
```

Acceder a: `http://localhost:8025`

### Credenciales de acceso al admin

Generadas por el seeder en `database/seeders/DatabaseSeeder.php`.
Por defecto: `admin@paginaswebcreativas.com` / `Admin2026!`

> Cambia estas credenciales antes de desplegar a producción.

## Variables de entorno relevantes

| Variable | Descripción |
|---|---|
| `WHATSAPP_NUMBER` | Número WhatsApp con código de país (ej. `521XXXXXXXXXX`) |
| `CONTACT_PHONE` | Teléfono de contacto visible |
| `MAIL_ADMIN_EMAIL` | Email donde llegan notificaciones de leads |
| `FACEBOOK_PIXEL_ID` | ID del Pixel de Facebook (opcional) |

## Despliegue a producción

```bash
composer install --optimize-autoloader --no-dev
php artisan config:cache
php artisan route:cache
php artisan view:cache
npm run build
```

Configura `APP_ENV=production`, `APP_DEBUG=false` y un `APP_KEY` seguro en el servidor.

## Estructura del proyecto

```
app/Http/Controllers/
├── PageController.php          # Páginas públicas (home, portafolio)
├── BlogController.php
├── ToolController.php
├── LeadController.php
└── Admin/
    ├── DashboardController.php
    ├── ProjectController.php
    ├── BlogPostController.php
    └── LeadController.php

resources/js/Pages/
├── Home.jsx                    # Landing page
├── Portafolio/Show.jsx         # Detalle de proyecto con galería
├── Blog/
├── Tools/
└── Admin/
    ├── Dashboard.jsx
    ├── Projects/ (Index + Form)
    ├── Blog/    (Index + Form)
    └── Leads/   (Index)
```

## Licencia

Propietario — © 2026 Páginas Web Creativas. Todos los derechos reservados.

