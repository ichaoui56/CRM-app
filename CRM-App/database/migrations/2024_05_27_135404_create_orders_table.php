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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->integer('quantity');
            $table->string('ups_tracking_number')->nullable();
            $table->timestamp('ordered_at')->nullable();
            $table->timestamp('arrived_at')->nullable();
            $table->enum('status', ['ordered', 'in_transit', 'arrived', 'installed']);
            $table->timestamps();
            
            $table->foreignId('ticket_id')->constrained()->onDelete('cascade');
            $table->foreignId('part_id')->constrained()->onDelete('cascade');
            $table->foreignId('technician_id')->constrained('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
