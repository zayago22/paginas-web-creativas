<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description');
            $table->string('client_name')->nullable();
            $table->string('category'); // web, ecommerce, elearning, landing, app
            $table->string('image')->nullable();
            $table->string('thumbnail')->nullable();
            $table->string('url')->nullable();
            $table->json('technologies')->nullable(); // ["Laravel", "React", "Tailwind"]
            $table->json('gallery')->nullable(); // array de imágenes adicionales
            $table->boolean('featured')->default(false);
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->date('completed_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
