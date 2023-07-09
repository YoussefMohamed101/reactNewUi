<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentPaypal extends Model
{
    use HasFactory;

    protected $table = 'payment_paypals';

    protected $fillable = [
        'project_id',
        'client_id',
        'amount',
        'transaction_reference',
        'additional_data',
    ];
}
