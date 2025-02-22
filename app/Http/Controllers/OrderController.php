<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

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
                $totalAmount += $product->Price * $item['quantity'];
            }
        }

        // Create the order and include the totalAmount
        $order = Order::create([
            'user_id' => $user->id,
            'OrderStatus' => 'pending',
            'OrderDate' => now(),
            'TotalAmount' => $totalAmount,
        ]);

        // Create order details
        foreach ($orderData as $item) {
            OrderDetail::create([
                'order_id' => $order->id,
                'product_id' => $item['product_id'],
                'quantity' => $item['quantity'],
                'unit_price' => Product::find($item['product_id'])->Price,
            ]);
        }

        return response()->json(['message' => 'Order placed successfully', 'orderId' => $order->id], 201);
    }

    public function showPayment(Order $order)
    {
        return Inertia::render('Orders/Payment', [
            'order' => $order,
        ]);
    }
}
