<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use App\Models\Store;

class ProductController extends Controller
{
    public function index()
    {
        // Fetch all products with related store data
        $products = Product::with('store')->get();

        // Send data to the Homepage/index view
        return Inertia::render('Homepage/index', [
            'products' => $products
        ]);
    }

    public function show($id)
    {
        // Fetch the product with related store data
        $product = Product::with('store')->findOrFail($id);
        return Inertia::render('Homepage/ProductDetail', ['product' => $product]);
    }

    public function create()
    {
        $stores = Store::all(); // ดึงข้อมูลร้านค้าทั้งหมด
        return Inertia::render('Products/Create', ['stores' => $stores]);
    }

    // บันทึกข้อมูลสินค้า
    public function store(Request $request)
    {
        Log::info('ข้อมูลที่ต้องการบันทึก');
        // การตรวจสอบข้อมูล
        $validated = $request->validate([
            'id_stores' => 'required|exists:stores,id',
            'ProductName' => 'required|string|max:255',
            'Price' => 'required|numeric|min:0',
            'Stock' => 'required|integer|min:0',
            'ProductType' => 'required|string',
            'ProductStatus' => 'required|string',
            'ProductDescription' => 'nullable|string',
            'ProductImage' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // การจัดการรูปภาพ
        $imagePath = null;
        if ($request->hasFile('ProductImage')) {
            $imagePath = $request->file('ProductImage')->store('product_images', 'public');
        }

        // บันทึกข้อมูลลงฐานข้อมูล
        Product::create([
            'id_stores' => $validated['id_stores'],
            'ProductName' => $validated['ProductName'],
            'Price' => $validated['Price'],
            'Stock' => $validated['Stock'],
            'ProductType' => $validated['ProductType'],
            'ProductStatus' => $validated['ProductStatus'],
            'ProductDescription' => $validated['ProductDescription'],
            'ProductImage' => $imagePath,
            // 'ProductRating' ใช้ค่า default = 0
            // 'CreatedAt' ใช้ timestamp อัตโนมัติ
        ]);

        return redirect()->route('mystore')->with('success', 'สร้างสินค้าสำเร็จ');
    }
}
