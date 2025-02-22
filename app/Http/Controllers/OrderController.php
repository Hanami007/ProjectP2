<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\OrderDetail;
use App\Models\Product;

class OrderController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        // ดึงข้อมูลคำสั่งซื้อของผู้ใช้ พร้อมข้อมูลจากตาราง 'delivery'
        $orders = Order::where('user_id', $user->id)
            ->with('delivery') // เชื่อมโยงกับตาราง 'delivery'
            ->get();

        return Inertia::render('Orders/Index', [
            'orders' => $orders
        ]);
    }
    public function store(Request $request)
    {
        $user = Auth::user();
        $orderData = $request->input('orderItems');

        // Check if orderData is not null or empty
        if (is_null($orderData) || empty($orderData)) {
            return response()->json(['message' => 'No items in the cart'], 400);
        }

        // Calculate the total amount by summing up the price * quantity for each item
        $totalAmount = 0;
        foreach ($orderData as $item) {
            $product = Product::find($item['product_id']);
            if ($product) {
                $totalAmount += $product->price * $item['quantity'];
            }
        }

        // Create the order and include the totalAmount
        $order = Order::create([
            'user_id' => $user->id,
            'status' => 'pending',
            'order_date' => now(),
            'total_amount' => $totalAmount,  // Add this line to set the total amount
        ]);

        // Create order details
        foreach ($orderData as $item) {
            OrderDetail::create([
                'order_id' => $order->id,
                'product_id' => $item['product_id'],
                'quantity' => $item['quantity'],
                'price' => Product::find($item['product_id'])->price,
            ]);
        }

        return response()->json(['message' => 'Order placed successfully'], 201);
    }


}
