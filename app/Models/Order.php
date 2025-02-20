<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Order extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'OrderStatus',
        'OrderDate',
        'TotalAmount',
        'paymentID',
    ];

    public function user() {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function orderDetails() {
        return $this->hasMany(OrderDetail::class, 'id_order');
    }

    public function payment() {
        return $this->hasOne(Payment::class, 'id_order');
    }

    public function delivery() {
        return $this->hasOne(Delivery::class, 'id_order');
    }
}
