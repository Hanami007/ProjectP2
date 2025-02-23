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
        $order = Order::with('order_details.product')->find($id); // ใช้ชื่อความสัมพันธ์ 'order_details'

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        return response()->json([
            'id' => $order->id,
            'TotalAmount' => (float) $order->TotalAmount, // แปลงเป็น float
            'OrderStatus' => $order->OrderStatus,
            'payment_status' => $order->payment_status,
            'orderDetails' => $order->order_details->map(function ($detail) {
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

    public function pendingOrders()
    {
        $orders = Order::where('OrderStatus', 'pending')->get();
        return Inertia::render('Store/OrderPending', [
            'orders' => $orders,
        ]);
    }

    // ฟังก์ชันอัปเดตสถานะคำสั่งซื้อ
    public function updateOrderStatus(Order $order)
    {
        $order->update([
            'status' => 'completed', // เปลี่ยนสถานะคำสั่งซื้อเป็น completed
        ]);

        return redirect()->route('orders.pending');
    }
}
