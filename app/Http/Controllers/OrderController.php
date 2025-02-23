<?php
namespace App\Http\Controllers;

use App\Models\Order;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function status($order_id)
    {
        $order = Order::with('order_details.product')->findOrFail($order_id);
        return Inertia::render('Orders/OrderStatus', ['order' => $order]);
    }
    public function show($id)
    {
        $order = Order::with(['orderDetails.product'])->find($id);

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        return response()->json([
            'id' => $order->id,
            'TotalAmount' => (float) $order->TotalAmount, // แปลงเป็น float
            'OrderStatus' => $order->OrderStatus,
            'payment_status' => $order->payment_status,
            'orderDetails' => $order->orderDetails->map(function ($detail) {
                return [
                    'id' => $detail->id,
                    'Quantity' => $detail->quantity,
                    'UnitPrice' => (float) $detail->price, // แปลงเป็น float
                    'product' => [
                        'ProductName' => $detail->product->ProductName ?? 'Unknown'
                    ]
                ];
            }),
        ]);
    }

}
