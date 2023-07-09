<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Manager;

class ContactUs extends Model
{
    use HasFactory;

    protected $table = 'contact_us';

    protected $fillable = ['name', 'email', 'subject', 'Admin_id'];

    public function manager()
    {
        return $this->belongsTo(Manager::class);
    }
}
