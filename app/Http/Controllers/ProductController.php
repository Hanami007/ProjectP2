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

    public function store(Request $request)
    {
        // Validate incoming request
        $request->validate([
            'ProductName' => 'required|string|max:255',
            'Price' => 'required|numeric',
            'Stock' => 'required|integer',
            'ProductType' => 'required|string',
            'ProductStatus' => 'required|string',
            'id_stores' => 'required|exists:stores,id', // ตรวจสอบให้แน่ใจว่า id_stores ต้องมีค่าและเชื่อมโยงกับ store ที่มีอยู่
        ]);

        // Create a new product
        $product = new Product();
        $product->ProductName = $request->ProductName;
        $product->Price = $request->Price;
        $product->Stock = $request->Stock;
        $product->ProductType = $request->ProductType;
        $product->ProductStatus = $request->ProductStatus;
        $product->id_stores = $request->id_stores; // เชื่อมโยงกับร้านที่ถูกเลือก
        $product->ProductImage = $request->ProductImage; // ถ้ามีการอัพโหลดภาพสินค้า
        $product->ProductDescription = $request->ProductDescription;
        $product->ProductRating = 0; // เริ่มต้นการให้คะแนน
        $product->save();

        // Redirect to the store's page or show a success message
        return redirect()->route('stores.show', ['store' => $request->id_stores])
            ->with('success', 'Product added successfully!');
    }



    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'description' => 'nullable|string',
        ]);

        $product = Product::findOrFail($id);
        $product->update([
            'name' => $request->name,
            'price' => $request->price,
            'description' => $request->description,
        ]);

        return redirect()->route('products.show', $product->id);
    }
    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return redirect()->route('stores.show', $product->store_id);
    }
    public function create()
    {
        return Inertia::render('Store/ProductCreate');
    }

}
