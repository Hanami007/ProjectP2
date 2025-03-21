<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Store extends Model
{
    use HasFactory;

    protected $table = 'stores';

    protected $fillable = [
        'StoreName',
        'ownerName',
        'PhoneNumber',
        'Address',
        'Rating',
        'OpenDate',
        'Stock',
        'StoreStatus',
        "Picture",
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function products()
    {
        return $this->hasMany(Product::class, 'id_stores');
    }


}
