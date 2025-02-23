<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Product;
use App\Models\Cart;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        if (!$user) {
            return redirect()->route('login');
        }

        $orders = Order::where('user_id', $user->id)->with('orderDetails.product')->get();

        return Inertia::render('Orders/Index', [
            'orders' => $orders,
        ]);
    }

    public function store(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return redirect()->route('login');
        }

        $orderData = $request->input('orderItems');

        // ตรวจสอบว่ามีสินค้าใน orderItems หรือไม่
        if (empty($orderData) || !is_array($orderData)) {
            return Inertia::render('Homepage/Cart', [
                'cartItems' => Cart::where('user_id', $user->id)->with('product')->get(),
                'message' => 'No items in the cart',
            ]);
        }

        // คำนวณ totalAmount จากสินค้าใน orderItems
        $totalAmount = collect($orderData)->sum(function ($item) {
            $product = Product::find($item['product_id']);
            return $product ? ($product->price * $item['quantity']) : 0;
        });

        // ตรวจสอบว่าราคาถูกต้องหรือไม่
        if ($totalAmount <= 0) {
            return Inertia::render('Homepage/Cart', [
                'cartItems' => Cart::where('user_id', $user->id)->with('product')->get(),
                'message' => 'Total amount is invalid',
            ]);
        }

        // สร้างคำสั่งซื้อ (Order)
        $order = Order::create([
            'user_id' => $user->id,
            'OrderDate' => now(),
            'TotalAmount' => $totalAmount,
        ]);

        // สร้าง Order Details
        foreach ($orderData as $item) {
            $product = Product::find($item['product_id']);

            if ($product) {
                OrderDetail::create([
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'quantity' => $item['quantity'],
                    'unit_price' => $product->price,
                ]);
            }
        }

        // ล้างตะกร้าสินค้าหลังจากสร้างคำสั่งซื้อ
        Cart::where('user_id', $user->id)->delete();

        return redirect()->route('orders.showPayment', ['order' => $order->id]);
    }

    public function showPayment(Order $order)
    {
        return Inertia::render('Orders/Payment', [
            'order' => $order,
        ]);
    }
}
