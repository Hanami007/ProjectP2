<?php
namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Payment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    /**
     * แสดงตะกร้าสินค้า
     */
    public function index()
    {
        $user = Auth::user();
        if (!$user) {
            return redirect()->route('login');
        }

        $cartItems = Cart::where('user_id', $user->id)->with('product')->get();
        return Inertia::render('Homepage/Cart', [
            'cartItems' => $cartItems,
        ]);
    }

    /**
     * ดำเนินการชำระเงิน
     */
    public function checkout(Request $request)
    {
        $validated = $request->validate([
            'payment_method' => 'required|in:cod,bank_transfer',
        ]);

        $user = Auth::user();
        $cartItems = Cart::where('user_id', $user->id)->with('product')->get();

        if ($cartItems->isEmpty()) {
            return redirect()->back()->with('error', 'ตะกร้าสินค้าว่างเปล่า');
        }

        // คำนวณยอดรวม
        $calculatedTotal = $cartItems->sum(function ($item) {
            return $item->product->Price * $item->quantity;
        });

        // สร้างคำสั่งซื้อ
        $order = Order::create([
            'user_id' => $user->id,
            'OrderStatus' => 'pending',
            'TotalAmount' => $calculatedTotal,
            'payment_method' => $validated['payment_method'],
            'payment_status' => 'pending',
        ]);

        // บันทึกรายละเอียดคำสั่งซื้อ
        foreach ($cartItems as $item) {
            OrderDetail::create([
                'order_id' => $order->id,
                'product_id' => $item->product_id,
                'quantity' => $item->quantity,
                'unitprice' => $item->product->Price,
            ]);
        }

        // สร้างข้อมูลการชำระเงิน
        Payment::create([
            'order_id' => $order->id,
            'payment_method' => $validated['payment_method'],
            'payment_status' => 'pending',
            'payment_amount' => $calculatedTotal,
        ]);

        // ลบสินค้าออกจากตะกร้า
        Cart::where('user_id', $user->id)->delete();

        // เปลี่ยนเส้นทางตามวิธีการชำระเงิน
        if ($validated['payment_method'] === 'bank_transfer') {
            return redirect()->route('payment.page', ['order_id' => $order->id]);
        }

        return redirect()->route('order.status', ['order_id' => $order->id]);
    }

    /**
     * เพิ่มสินค้าลงในตะกร้า
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $cart = Cart::where('user_id', Auth::id())
            ->where('product_id', $validated['product_id'])
            ->first();

        if ($cart) {
            $cart->update([
                'quantity' => $cart->quantity + $validated['quantity'],
            ]);
        } else {
            Cart::create([
                'user_id' => Auth::id(),
                'product_id' => $validated['product_id'],
                'quantity' => $validated['quantity'],
            ]);
        }

        return redirect()->back()->with('success', 'เพิ่มสินค้าลงตะกร้าเรียบร้อยแล้ว');
    }

    /**
     * อัพเดทจำนวนสินค้าในตะกร้า
     */
    public function update(Request $request)
{
    $validated = $request->validate([
        'product_id' => 'required|exists:products,id',
        'quantity' => 'required|integer|min:1',
    ]);

    $cart = Cart::where('user_id', Auth::id())
        ->where('product_id', $validated['product_id'])
        ->first();

    if ($cart) {
        $cart->update([
            'quantity' => $validated['quantity'],
        ]);

        // Redirect ไปยังหน้า cart แทนการส่ง JSON response
        return redirect()->route('cart.index')->with('success', 'อัพเดทสินค้าลงตะกร้าเรียบร้อยแล้ว');
    }

    return redirect()->back()->with('error', 'ไม่พบสินค้านี้ในตะกร้า');
}
    /**
     * ลบสินค้าออกจากตะกร้า
     */
    public function destroy($id)
    {
        $cart = Cart::where('user_id', Auth::id())
            ->where('product_id', $id)
            ->first();

        if ($cart) {
            $cart->delete();

            return response()->json(['success' => true]);
        }

        return response()->json(['error' => 'ไม่พบสินค้านี้ในตะกร้า'], 404);
    }
}
