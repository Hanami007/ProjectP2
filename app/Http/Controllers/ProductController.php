<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use App\Models\Store;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

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
        $store = Store::where('user_id', Auth::id())->first();
        if (!$store) {
            return redirect()->route('mystore')->with('error', 'คุณยังไม่มีร้านค้า กรุณาสร้างร้านค้าก่อน');
        }
        return Inertia::render('Products/Create', ['store' => $store]);
    }

    // บันทึกข้อมูลสินค้า
    public function store(Request $request)
    {
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
        ]);

        // Redirect ไปยังหน้าร้านค้า
        return redirect()->route('stores.show', $validated['id_stores'])->with('success', 'สร้างสินค้าสำเร็จ');
    }

    public function update(Request $request, Product $product)
    {
        // ตรวจสอบสิทธิ์การแก้ไขสินค้า
        $store = Store::where('user_id', Auth::id())->first();
        if (!$store || $product->id_stores != $store->id) {
            abort(403, 'You do not have permission to edit this product.');
        }

        // ตรวจสอบข้อมูลที่รับมา
        $validated = $request->validate([
            'ProductName' => 'required|string|max:255',
            'Price' => 'required|numeric|min:0',
            'ProductDescription' => 'nullable|string',
        ]);

        // อัพเดทข้อมูลสินค้า
        $product->update($validated);

        // ส่งกลับไปยังหน้าร้านค้าพร้อมข้อความสำเร็จ
        return redirect()->route('stores.show', $store->id)->with('success', 'อัพเดทสินค้าสำเร็จ');
    }

    public function edit($id)
    {
        $product = Product::with('store')->findOrFail($id);
        $store = $product->store;
        return Inertia::render('Products/Edit', ['product' => $product, 'store' => $store]);
    }
}
