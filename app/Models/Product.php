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
        'ProductImage',
        'ProductDescription',
        'id_stores',
    ];

    public function store()
    {
        return $this->belongsTo(Store::class, 'id_stores');
    }
}
