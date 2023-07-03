<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\staff_levels;
use App\Models\Project;
use App\Models\Task;

class Manager extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'staff_level_id'

    ];

    function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
    function staff_level()
    {
        return $this->belongsTo(StaffLevel::class);
    }
    function project()
    {
        return $this->hasMany(Project::class);
    }
    function task()
    {
        return $this->hasMany(Task::class);
    }
}
