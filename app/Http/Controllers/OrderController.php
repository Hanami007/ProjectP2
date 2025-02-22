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

        $cartItems = Cart::where('user_id', $user->id)->with('product')->get();

        return Inertia::render('Homepage/Cart', [
            'cartItems' => $cartItems,
            'message' => 'ไม่มีสินค้าในตะกร้า',
            'userWallet' => $user->wallet_balance,
        ]);
    }

    public function store(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'User not authenticated'], 401);
        }

        $orderData = $request->input('orderItems');
        $totalAmount = $request->input('totalAmount');
        $paymentMethod = $request->input('paymentMethod');

        // Check if orderData is not null or empty
        if (is_null($orderData) || empty($orderData)) {
            return response()->json(['message' => 'No items in the cart'], 400);
        }

        // Check if payment method is selected
        if (is_null($paymentMethod) || empty($paymentMethod)) {
            return response()->json(['message' => 'Payment method not selected'], 400);
        }

        // Check if user has enough balance in wallet
        if ($paymentMethod === 'wallet' && $totalAmount > $user->wallet_balance) {
            return response()->json(['message' => 'Insufficient balance in wallet'], 400);
        }

        // Create the order and include the totalAmount
        $order = Order::create([
            'user_id' => $user->id,
            'OrderStatus' => $paymentMethod === 'wallet' ? 'complete' : 'pending',
            'OrderDate' => now(),
            'TotalAmount' => $totalAmount,
        ]);


        // Deduct amount from wallet if payment method is wallet
        if ($paymentMethod === 'wallet') {
            $user->wallet_balance -= $totalAmount;
            $user->save();
        }

        // Clear the cart after creating the order
        Cart::where('user_id', $user->id)->delete();

        return response()->json(['message' => 'Order placed successfully', 'orderId' => $order->id], 201);
    }
    public function showPayment(Order $order)
    {
        return Inertia::render('Orders/Payment', [
            'order' => $order,
        ]);
    }
}
