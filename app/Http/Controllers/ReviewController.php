<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Review;
use Illuminate\Support\Facades\Auth;
class ReviewController extends Controller
{
    public function index($productId)
{
    $reviews = Review::where('product_id', $productId)
        ->with('user') // ดึงข้อมูลผู้ใช้ที่รีวิวด้วย
        ->latest()
        ->get();

    return response()->json($reviews);
}

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string',
        ]);

        Review::create([
            'product_id' => $request->product_id,
            'user_id' => auth::id(), // ใช้ ID ของผู้ใช้ที่ล็อกอินอยู่
            'rating' => $request->rating,
            'comment' => $request->comment,
        ]);

        return back()->with('success', 'รีวิวถูกบันทึกแล้ว!');
    }
}

