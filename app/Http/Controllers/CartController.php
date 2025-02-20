<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class CartController extends Controller
{
    public function index()
    {
        Log::info('CartController@index');
        // ดึงข้อมูลสินค้าที่อยู่ในตะกร้า (รวมถึงของผู้ใช้ที่ไม่ได้ล็อกอิน)
        $cartItems = Cart::where(function ($query) {
            if (Auth::check()) {
                $query->where('user_id', Auth::id());
            } else {
                $query->where('session_id', session()->getId());
            }
        })
            ->with('product')
            ->get();

        return Inertia::render('Homepage/cart', ['cartItems' => $cartItems]);
    }

    public function store(Request $request)
    {
        Log::info('CartController@store');
        try {
            Log::info('Request Data: ', $request->all());

            // ตรวจสอบความถูกต้องของข้อมูลที่ส่งมา
            $validated = $request->validate([
                'product_id' => 'required|exists:products,id',
                'quantity' => 'required|integer|min:1',
            ]);

            // ถ้าไม่ได้ล็อกอิน ให้ใช้ session_id แทน user_id
            $userId = Auth::check() ? Auth::id() : null;
            $sessionId = session()->getId();

            // ตรวจสอบว่าสินค้านี้อยู่ในตะกร้าแล้วหรือไม่
            $cartItem = Cart::where(function ($query) use ($userId, $sessionId) {
                if ($userId) {
                    $query->where('user_id', $userId);
                } else {
                    $query->where('session_id', $sessionId);
                }
            })
                ->where('product_id', $validated['product_id'])
                ->first();

            if ($cartItem) {
                // ถ้ามีสินค้าอยู่แล้วให้เพิ่มจำนวน
                $cartItem->increment('quantity', $validated['quantity']);
            } else {
                // ถ้าไม่มี ให้เพิ่มสินค้าใหม่ลงตะกร้า
                Cart::create([
                    'user_id' => $userId,
                    'session_id' => $userId ? null : $sessionId, // ใช้ session_id ถ้าไม่ได้ล็อกอิน
                    'product_id' => $validated['product_id'],
                    'quantity' => $validated['quantity'],
                ]);
            }

            return response()->json(['message' => 'เพิ่มสินค้าในตะกร้าเรียบร้อยแล้ว'], 200);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['message' => 'เกิดข้อผิดพลาด'], 500);
        }
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $userId = Auth::check() ? Auth::id() : null;
        $sessionId = session()->getId();

        $cartItem = Cart::where(function ($query) use ($userId, $sessionId) {
            if ($userId) {
                $query->where('user_id', $userId);
            } else {
                $query->where('session_id', $sessionId);
            }
        })
            ->where('product_id', $validated['product_id'])
            ->first();

        if ($cartItem) {
            $cartItem->update(['quantity' => $validated['quantity']]);
        }

        return response()->json(['message' => 'อัปเดตตะกร้าสินค้าเรียบร้อยแล้ว']);
    }

    public function remove($id)
    {
        $userId = Auth::check() ? Auth::id() : null;
        $sessionId = session()->getId();

        Cart::where(function ($query) use ($userId, $sessionId) {
            if ($userId) {
                $query->where('user_id', $userId);
            } else {
                $query->where('session_id', $sessionId);
            }
        })
            ->where('product_id', $id)
            ->delete();

        return response()->json(['message' => 'ลบสินค้าออกจากตะกร้าเรียบร้อยแล้ว']);
    }

    public function count()
    {
        $userId = Auth::check() ? Auth::id() : null;
        $sessionId = session()->getId();

        $count = Cart::where(function ($query) use ($userId, $sessionId) {
            if ($userId) {
                $query->where('user_id', $userId);
            } else {
                $query->where('session_id', $sessionId);
            }
        })
            ->count();

        return response()->json(['count' => $count]);
    }
}
