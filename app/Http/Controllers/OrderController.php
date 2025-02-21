<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Product;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        // ดึงคำสั่งซื้อของผู้ใช้
        $orders = Order::where('user_id', $user->id)->get();

        // ดึงสินค้าที่อยู่ในคำสั่งซื้อนั้น ๆ 
        foreach ($orders as $order) {
            $order->products = Product::where('order_id', $order->id)->get();
        }

        return Inertia::render('Order/index', [
            'orders' => $orders
        ]);
    }
}

