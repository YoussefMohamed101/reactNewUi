<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Client;
use App\Models\Manager;
use App\Models\Task;

class Project extends Model
{

    use HasFactory;
    protected $fillable = [
        'project_title',
        'project_type',
        'project_description',
        'project_start',
        'project_end',
        'project_status',
        'ProductOwner_id',
        'ProductManager_id',
        'client_id',
    ];
    function ProductOwner()
    {
        return $this->belongsTo(Manager::class, 'ProductOwner_id', 'id');
    }
    function ProductManager()
    {
        return $this->belongsTo(Manager::class, 'ProductManager_id', 'id');
    }
    function client()
    {
        return $this->belongsTo(Client::class, 'client_id', 'id');
    }
    function task()
    {
        return $this->hasMany(Task::class);
    }
}
