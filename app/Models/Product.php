<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Product extends Model
{
    use HasFactory;
    protected $table = 'products';

    protected $fillable = [
        'ProductName',
        'Price',
        'Stock',
        'ProductType',
        'ProductStatus',
        'image',
        'ProductDescription',
        'id_stores',
    ];

    public function carts()
    {
        return $this->hasMany(Cart::class);
    }
    public function store()
    {
        return $this->belongsTo(Store::class, 'id_stores');
    }
}
