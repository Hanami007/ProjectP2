<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use Inertia\Inertia;

class OrderDetailController extends Controller
{
    public function getOrderDetails($orderId)
    {
        $order = Order::with('orderDetails.product')->find($orderId);

        if (!$order) {
            return response()->json(['message' => 'ไม่พบคำสั่งซื้อ'], 404);
        }

        return response()->json([
            'order_id' => $order->id,
            'total' => $order->TotalAmount, // ตรวจสอบให้แน่ใจว่าใช้ชื่อฟิลด์ที่ถูกต้อง
            'status' => $order->OrderStatus,
            'items' => $order->orderDetails->map(function ($detail) {
                return [
                    'product_name' => $detail->product->ProductName ?? 'Unknown',
                    'quantity' => $detail->quantity,
                    'price' => (float) $detail->price
                ];
            })
        ]);
    }
    
}

