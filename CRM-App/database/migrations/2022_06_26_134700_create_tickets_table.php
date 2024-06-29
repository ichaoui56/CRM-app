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
        Schema::create('tickets', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('service_type');
            $table->text('problem_description');
            $table->timestamp('diagnostic_date')->nullable();
            $table->timestamp('preparation_date')->nullable();    
            $table->timestamp('finished_date')->nullable();    
            $table->enum('status', ['created','diagnostic', 'waiting_for_parts', 'preparation', 'finished']);
            $table->timestamps();
            
            $table->foreignId('contact_id')->constrained()->onDelete('cascade');
            $table->foreignId('laptop_id')->constrained()->onDelete('cascade');
            $table->foreignId('technician_id')->constrained('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};
