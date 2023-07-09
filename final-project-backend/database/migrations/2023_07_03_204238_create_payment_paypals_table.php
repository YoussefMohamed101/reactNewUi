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
        Schema::create('payment_paypals', function (Blueprint $table) {
            // $table->id();
            // $table->foreignId('user_id')->constrained()->cascadeOnUpdate()->onDelete('set null');
            // $table->foreignId('project_id')->constrained()->cascadeOnUpdate()->onDelete('set null');
            // $table->decimal('amount', 10, 2);
            // $table->string('transaction_reference');
            // $table->json('additional_data')->nullable();
            // $table->timestamps();
            $table->id();
            $table->unsignedBigInteger('project_id')->nullable();
            $table->foreign('project_id')->references('id')->on('projects')->onDelete('set null');
            $table->unsignedBigInteger('user_id')->nullable();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('set null'); 
            $table->decimal('amount', 10, 2);
            $table->string('transaction_reference');
            $table->json('additional_data')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payment_paypals');
    }
};
