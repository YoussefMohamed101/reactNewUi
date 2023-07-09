<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Manager;
use App\Models\Freelancer;
use App\Models\Employee;
use App\Models\Project;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_id',
        'product_manager_id',
        'task_title',
        'task_description',
        'task_start',
        'task_end',
        'task_status',
        'price'
    ];

    function project()
    {
        return $this->belongsTo(Project::class);
    }

    function ProductManager()
    {
        return $this->belongsTo(Manager::class, 'product_manager_id', 'id');
    }

    function freelancer()
    {
        return $this->belongsTo(Freelancer::class);
    }

    function employee()
    {
        return $this->belongsTo(Employee::class);
    }
}
