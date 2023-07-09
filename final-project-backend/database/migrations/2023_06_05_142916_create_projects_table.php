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
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')->constrained()->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreignId('ProductOwner_id')->nullable()->cascadeOnUpdate()->constrained('managers')->onDelete('set null');
            $table->foreignId('ProductManager_id')->nullable()->cascadeOnUpdate()->constrained('managers')->onDelete('set null');
            $table->enum('project_type', ['mileStone', 'byProject'])->default('mileStone');
            $table->string('project_title');
            $table->index('project_title');
            $table->string('project_description');
            $table->date('project_start');
            $table->date('project_end');
            $table->decimal('budget', 10, 2)->default(0);
            $table->enum('project_status', ['notStarted', 'inProgress', 'completed'])->default('notStarted');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
