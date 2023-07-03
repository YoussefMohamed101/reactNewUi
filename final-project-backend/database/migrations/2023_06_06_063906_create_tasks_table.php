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
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained()->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreignId('product_manager_id')->nullable()->constrained('managers')->cascadeOnUpdate()->onDelete('set null');
            $table->string('task_title');
            $table->text('task_description');
            $table->dateTime('task_start');
            $table->dateTime('task_end');
            $table->decimal('price', 10, 2)->default(0);
            $table->enum('task_status', ['notStarted', 'inProgress', 'completed'])->default('notStarted');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
