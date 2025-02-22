<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\OrderDetail;
use App\Models\Order;

class OrderDetailController extends Controller
{
    // ดึงข้อมูล OrderDetail ตาม order_id
    public function getOrderDetails($orderId)
    {
        $order = Order::with('details.product')->find($orderId);

        if (!$order) {
            return response()->json(['message' => 'ไม่พบคำสั่งซื้อ'], 404);
        }

        return response()->json([
            'order_id' => $order->id,
            'total' => $order->total,
            'status' => $order->status,
            'items' => $order->details->map(function ($detail) {
                return [
                    'product_name' => $detail->product->name,
                    'quantity' => $detail->quantity,
                    'price' => $detail->price
                ];
            })
        ]);
    }
}
