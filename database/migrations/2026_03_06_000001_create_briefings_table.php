<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('briefings', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('empresa');
            $table->string('email');
            $table->string('telefono');
            $table->json('data');                          // Todos los pasos como JSON
            $table->string('pdf_path')->nullable();        // Ruta al PDF en storage
            $table->enum('status', ['nuevo', 'revisado', 'en_proceso'])->default('nuevo');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('briefings');
    }
};
