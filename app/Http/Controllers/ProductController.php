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
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'description' => 'nullable|string',
            'id_stores' => 'required|exists:stores,id',
        ]);

        Product::create([
            'name' => $validated['name'],
            'price' => $validated['price'],
            'description' => $validated['description'],
            'id_stores' => $validated['id_stores'],
        ]);

        return redirect()->route('mystore')->with('success', 'สินค้าถูกเพิ่มเรียบร้อยแล้ว');
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'description' => 'nullable|string',
        ]);

        $product = Product::findOrFail($id);
        $product->update($validated);

        return redirect()->route('mystore')->with('success', 'สินค้าถูกแก้ไขเรียบร้อยแล้ว');
    }
}
