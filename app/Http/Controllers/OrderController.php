<?php
namespace App\Http\Controllers;

use App\Models\Order;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function status($order_id)
    {
        $order = Order::with('order_details.product')->findOrFail($order_id);
        return Inertia::render('OrderStatus', ['order' => $order]);
    }
}
