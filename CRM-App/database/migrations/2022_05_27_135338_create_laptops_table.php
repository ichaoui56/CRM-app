<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('laptops', function (Blueprint $table) {
            $table->id();
            $table->string('tag');
            $table->string('model_number');
            $table->string('model_name');
            $table->timestamps();
            
            $table->foreignId('client_id')->constrained()->onDelete('cascade');
            $table->foreignId('technician_id')->nullable()->constrained('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('laptops');
    }
};
