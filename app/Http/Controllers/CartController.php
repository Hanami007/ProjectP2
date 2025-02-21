<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CartController extends Controller
{
    public function index()
    {
        // ดึงข้อมูลตะกร้าสินค้าของผู้ใช้ปัจจุบัน
        $cartItems = Cart::with('product')
            ->where('user_id', Auth::id())
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
        $cart = Cart::where('user_id', Auth::id())
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
                'user_id' => Auth::id(),
                'product_id' => $validated['product_id'],
                'quantity' => $validated['quantity'],
            ]);
        }

        return redirect()->back()->with('success', 'เพิ่มสินค้าลงตะกร้าเรียบร้อยแล้ว');
    }

    public function update(Request $request)
    {
        // บันทึก raw request content
        Log::info('Raw request content: ' . $request->getContent());
        Log::info('Request headers: ', $request->headers->all());
        Log::info('Request method: ' . $request->method());
        Log::info('Request all data: ', $request->all());

        try {

            // ตรวจสอบว่าข้อมูลมาถึงหรือไม่
            $data = $request->json()->all();
            Log::info('Received JSON data:', $data);
            if (!$request->has('product_id') || !$request->has('quantity')) {
                Log::warning('Missing required fields in update request');
                return response()->json(['error' => 'ข้อมูลไม่ครบถ้วน'], 400);
            }

            $validated = $request->validate([
                'product_id' => 'required|exists:products,id',
                'quantity' => 'required|integer|min:1',
            ]);

            // ดำเนินการอัพเดท...

        } catch (\Exception $e) {
            Log::error('Cart update error: ' . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function remove($id)
    {
        Cart::where('user_id', Auth::id())
            ->where('product_id', $id)
            ->delete();

            return Inertia::location(route('cart.index'));
    }

    public function count()
    {
        $count = Cart::where('user_id', Auth::id())->sum('quantity');

        return response()->json(['count' => $count]);
    }

    public function increment(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        Cart::where('user_id', Auth::id())
            ->where('product_id', $validated['product_id'])
            ->increment('quantity');

        $cart = Cart::where('user_id', Auth::id())
            ->where('product_id', $validated['product_id'])
            ->first();

        return response()->json([
            'message' => 'เพิ่มจำนวนสินค้าเรียบร้อย',
            'new_quantity' => $cart->quantity
        ]);

    }

    public function decrement(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        $cart = Cart::where('user_id', Auth::id())
            ->where('product_id', $validated['product_id'])
            ->first();

        if (!$cart) {
            return response()->json(['error' => 'ไม่พบสินค้าในตะกร้า'], 404);
        }

        if ($cart->quantity > 1) {
            $cart->decrement('quantity');
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
