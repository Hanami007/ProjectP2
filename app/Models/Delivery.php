<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Delivery extends Model
{
    use HasFactory;
    protected $table = 'deliveries';

    protected $fillable = [
        'order_id',
        'ShipperName',
        'Email',
        'Phone',
        'TrackingNumber',
        'DeliveryStatus',
        'DeliveryDate',
        'Address',
    ];

    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id');
    }
}
