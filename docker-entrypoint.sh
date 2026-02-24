#!/bin/bash
set -e

# Cache config/routes/views
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Run migrations
php artisan migrate --force

# Create storage symlink
php artisan storage:link || true

# Start Apache
exec "$@"
