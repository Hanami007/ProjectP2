<?php
namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
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

            return redirect()->back()->with('success', 'อัพเดทสินค้าลงตะกร้าเรียบร้อยแล้ว');
        }

        return redirect()->back()->with('error', 'ไม่พบสินค้านี้ในตะกร้า');
    }

    public function destroy($id)
    {
        $cart = Cart::where('user_id', Auth::id())
            ->where('product_id', $id)
            ->first();

        if ($cart) {
            $cart->delete();

            return redirect()->back()->with('success', 'ลบสินค้าจากตะกร้าเรียบร้อยแล้ว');
        }

        return redirect()->back()->with('error', 'ไม่พบสินค้านี้ในตะกร้า');
    }
}
