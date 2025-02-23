<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
class OrderTranController extends Controller
{
    public function index()
    {
        // ดึงข้อมูลผู้ใช้ที่ล็อกอินอยู่
        $user = Auth::user();

        // ดึงออเดอร์ทั้งหมดของผู้ใช้ พร้อมข้อมูลการจัดส่ง
        $orders = Order::where('user_id', $user->id)
                       ->with('delivery')
                       ->get();
        return Inertia::render('Orders/index', [
            'orders' => $orders,
        ]);
    }
    public function show(Request $request, $order_id)
    {
        $order = Order::with('deliveries')->find($order_id);
        if (!$order) {
            abort(404);
        }

        return Inertia::render('Delivery/OrderDetail', [
            'order' => $order,
            'deliveries' => $order->deliveries,
        ]);
    }
}
