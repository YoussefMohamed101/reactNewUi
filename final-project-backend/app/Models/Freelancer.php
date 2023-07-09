<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Task;

class Freelancer extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'Status',
        'balance',
        'task_id',
        'rate'
    ];
    protected $casts = [
        'rate' => 'integer',
    ];

    function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
    function task()
    {
        return $this->hasOne(Task::class, 'id', 'task_id');
    }
}
