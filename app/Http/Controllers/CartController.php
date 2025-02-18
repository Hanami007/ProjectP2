<?php
// filepath: /C:/Work/vs/backend-jojo/ProjectP2/app/Http/Controllers/CartController.php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CartController extends Controller
{
    public function index()
    {
        // ตรวจสอบว่าผู้ใช้ได้เข้าสู่ระบบหรือไม่
        if (!Auth::check()) {
            return redirect()->route('login')->with('error', 'คุณต้องเข้าสู่ระบบเพื่อดูตะกร้าสินค้า');
        }

        // ดึงข้อมูลสินค้าที่อยู่ในตะกร้าของผู้ใช้ที่เข้าสู่ระบบ พร้อมข้อมูลสินค้าที่เกี่ยวข้อง
        $cartItems = Cart::where('user_id', Auth::id())
                        ->with('product')
                        ->get();

        // ส่งข้อมูลไปยังหน้าแสดงผลตะกร้าสินค้า
        return Inertia::render('Homepage/cart', ['cartItems' => $cartItems]);
    }

    public function store(Request $request)
    {
        // ตรวจสอบว่าผู้ใช้ได้เข้าสู่ระบบหรือไม่
        if (!Auth::check()) {
            return redirect()->route('login')->with('error', 'คุณต้องเข้าสู่ระบบเพื่อเพิ่มสินค้าในตะกร้า');
        }

        // ตรวจสอบความถูกต้องของข้อมูลที่ส่งมา
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        // เพิ่มสินค้าลงในตะกร้า
        Cart::create([
            'user_id' => Auth::id(),
            'product_id' => $validated['product_id'],
            'quantity' => $validated['quantity'],
        ]);

        return redirect()->back()->with('success', 'เพิ่มสินค้าในตะกร้าเรียบร้อยแล้ว');
    }

    public function update(Request $request)
    {
        // ตรวจสอบว่าผู้ใช้ได้เข้าสู่ระบบหรือไม่
        if (!Auth::check()) {
            return redirect()->route('login')->with('error', 'คุณต้องเข้าสู่ระบบเพื่ออัปเดตตะกร้าสินค้า');
        }

        // ตรวจสอบความถูกต้องของข้อมูลที่ส่งมา
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        // อัปเดตจำนวนสินค้าที่อยู่ในตะกร้า
        $cartItem = Cart::where('user_id', Auth::id())
                        ->where('product_id', $validated['product_id'])
                        ->first();

        if ($cartItem) {
            $cartItem->update(['quantity' => $validated['quantity']]);
        }

        return redirect()->back()->with('success', 'อัปเดตตะกร้าสินค้าเรียบร้อยแล้ว');
    }

    public function remove($id)
    {
        // ตรวจสอบว่าผู้ใช้ได้เข้าสู่ระบบหรือไม่
        if (!Auth::check()) {
            return redirect()->route('login')->with('error', 'คุณต้องเข้าสู่ระบบเพื่อลบสินค้าออกจากตะกร้า');
        }

        // ลบสินค้าที่อยู่ในตะกร้า
        Cart::where('user_id', Auth::id())
            ->where('product_id', $id)
            ->delete();

        return redirect()->back()->with('success', 'ลบสินค้าออกจากตะกร้าเรียบร้อยแล้ว');
    }
}
