<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Order extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'TotalAmount', 'OrderStatus', 'payment_method', 'payment_status'];
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function order_details()
    {

        return $this->hasMany(OrderDetail::class, 'order_id');
    }

    public function payment()
    {
        return $this->hasOne(Payment::class, 'id_order');
    }

    public function delivery()
    {
        return $this->hasOne(Delivery::class, 'id_order');
    }

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }
}
