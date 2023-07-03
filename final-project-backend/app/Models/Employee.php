<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
// use App\Models\StaffLevel;
use App\Models\User;
use App\Models\Task;

class Employee extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'staff_level_id',
        'task_id',
        // 'deductions'
    ];

    function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    function task()
    {
        return $this->hasOne(Task::class, 'id', 'task_id');
    }

    function staff_level()
    {
        return $this->belongsTo(StaffLevel::class);
    }
}
