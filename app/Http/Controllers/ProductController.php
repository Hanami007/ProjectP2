<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
        return Inertia::render('Products/Create');
    }

    public function store(Request $request)
{
    
    $request->validate([
        'name' => 'required|string|max:255',
        'price' => 'required|numeric',
        'description' => 'required|string',
        'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // ตรวจสอบไฟล์รูป
        'id_stores' => 'required|exists:stores,id', // ต้องมี store_id
    ]);

    $imagePath = null;
    if ($request->hasFile('image')) {
        $imagePath = $request->file('image')->store('products', 'public');
    }

    Product::create([
        'name' => $request->name,
        'price' => $request->price,
        'description' => $request->description,
        'image' => $imagePath,
        'id_stores' => $request->id_stores, // เก็บค่า id_stores
    ]);

    return redirect()->route('products.index')->with('success', 'เพิ่มสินค้าสำเร็จ!');
}

}
