<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function index()
    {
        // ดึงข้อมูลตะกร้าสินค้าของผู้ใช้ปัจจุบัน
        $cartItems = Cart::with('product')
            ->where('user_id', auth::id())
            ->get();

        return Inertia::render('Homepage/cart', [
            'cartItems' => $cartItems,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        // ตรวจสอบว่ามีสินค้านี้ในตะกร้าหรือไม่
        $cart = Cart::where('user_id', auth::id())
            ->where('product_id', $validated['product_id'])
            ->first();

        if ($cart) {
            // อัพเดทจำนวนสินค้าหากมีอยู่แล้ว
            $cart->update([
                'quantity' => $cart->quantity + $validated['quantity'],
            ]);
        } else {
            // สร้างรายการใหม่หากยังไม่มี
            Cart::create([
                'user_id' => auth::id(),
                'product_id' => $validated['product_id'],
                'quantity' => $validated['quantity'],
            ]);
        }

        return redirect()->back()->with('success', 'เพิ่มสินค้าลงตะกร้าเรียบร้อยแล้ว');
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        Cart::where('user_id', auth::id())
            ->where('product_id', $validated['product_id'])
            ->update(['quantity' => $validated['quantity']]);

        return redirect()->back();
    }

    public function remove($id)
    {
        Cart::where('user_id', auth::id())
            ->where('product_id', $id)
            ->delete();

        return redirect()->back();
    }

    public function count()
    {
        $count = Cart::where('user_id', auth::id())->sum('quantity');

        return response()->json(['count' => $count]);
    }

    public function increment(Request $request)
    {

        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        $cart = Cart::where('user_id', auth::id())
            ->where('product_id', $validated['product_id'])
            ->first();

        if ($cart) {
            $cart->update([
                'quantity' => $cart->quantity + 1,
            ]);
            return response()->json([
                'message' => 'เพิ่มจำนวนสินค้าเรียบร้อย',
                'new_quantity' => $cart->quantity
            ]);
        }

        return response()->json(['error' => 'ไม่พบสินค้าในตะกร้า'], 404);
    }

    public function decrement(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        $cart = Cart::where('user_id', auth::id())
            ->where('product_id', $validated['product_id'])
            ->first();


        if (!$cart) {
            return response()->json(['error' => 'ไม่พบสินค้าในตะกร้า'], 404);
        }

        if ($cart->quantity > 1) {
            $cart->update([
                'quantity' => $cart->quantity - 1,
            ]);
            return response()->json([
                'message' => 'ลดจำนวนสินค้าเรียบร้อย',
                'new_quantity' => $cart->quantity
            ]);
        } else {
            $cart->delete();
            return response()->json([
                'message' => 'ลบสินค้าออกจากตะกร้าเรียบร้อย',
                'new_quantity' => 0
            ]);
        }
    }
}
