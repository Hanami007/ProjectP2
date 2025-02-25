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
        return $this->hasOne(Payment::class, 'order_id');
    }


    public function delivery()
    {
        return $this->hasOne(Delivery::class, 'order_id');
    }

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function products()
    {
        return $this->belongsToMany(Product::class, 'order_details', 'order_id', 'product_id')
                    ->withPivot('Quantity', 'UnitPrice', 'Discount'); // รวมฟิลด์จากตารางตัวกลาง
    }
    public function orderDetails()
    {

        return $this->hasMany(OrderDetail::class, 'order_id');
    }
    public function deliveries()
    {
        return $this->hasMany(Delivery::class, 'order_id');
    }
}
