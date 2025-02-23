<?php
namespace App\Http\Controllers;

use App\Models\Store;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class StoreController extends Controller
{
    // เมธอดอื่นๆ...

    public function index()
    {
        // ดึงข้อมูลร้านค้าทั้งหมด
        $stores = Store::all();

        // ส่งข้อมูลไปยังหน้าแสดงรายการร้านค้า
        return Inertia::render('Store/Index', [
            'stores' => $stores
        ]);
    }

    public function create()
    {
        // เพิ่มตรรกะสำหรับการสร้างร้านค้า
        return Inertia::render('Store/Create');
    }

    public function show($id)
    {
        $store = Store::findOrFail($id);
        $products = Product::where('id_stores', $id)->get();
        return Inertia::render('Store/Show', [
            'store' => $store,
            'products' => $products
        ]);
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'storeName' => 'required|string|max:255',
            'ownerName' => 'required|string|max:255',
            'phoneNumber' => 'required|string|max:20',
            'address' => 'required|string|max:500',
            'Picture' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $imagePath = null;
        if ($request->hasFile('Picture')) {
            $imagePath = $request->file('Picture')->store('store_images', 'public');
        }

        try {
            $store = Store::create([
                'StoreName' => $validated['storeName'],
                'ownerName' => $validated['ownerName'],
                'PhoneNumber' => $validated['phoneNumber'],
                'Address' => $validated['address'],
                'user_id' => Auth::id(),
                'Rating' => 0,
                'OpenDate' => now(),
                'Picture' => $imagePath,
            ]);

            return redirect()
                ->route('stores.show', $store->id)
                ->with('success', 'ร้านค้าถูกสร้างเรียบร้อยแล้ว');

        } catch (\Exception $e) {
            return back()
                ->withInput()
                ->with('error', 'เกิดข้อผิดพลาดในการสร้างร้านค้า กรุณาลองใหม่อีกครั้ง');
        }
    }

    public function mystore(Request $request)
    {
        $store = Store::where('user_id', $request->user()->id)->first();
        $products = $store ? Product::where('id_stores', $store->id)->get() : [];
        return Inertia::render('Store/Mystore', [
            'store' => $store,
            'products' => $products,
        ]);
    }

    public function userStore(Request $request)
    {
        return Store::where('user_id', $request->user()->id)->first();
    }

    public function destroy($id)
    {
        try {
            $store = Store::findOrFail($id);

            // ตรวจสอบสิทธิ์ผู้ใช้
            if ($store->user_id !== Auth::id()) {
                return redirect()->route('mystore')
                    ->with('error', 'คุณไม่มีสิทธิ์ลบร้านค้านี้');
            }

            // ดึงสินค้าทั้งหมดของร้าน
            $products = Product::where('id_stores', $store->id)->get();

            // ลบรูปภาพของสินค้าทั้งหมด
            foreach ($products as $product) {
                if ($product->ProductImage) {
                    Storage::delete('public/' . $product->ProductImage);
                }
            }

            // ลบสินค้าทั้งหมดของร้าน
            Product::where('id_stores', $store->id)->delete();

            // ลบร้านค้า
            $store->delete();

            return redirect()->route('mystore')
                ->with('success', 'ร้านค้าและสินค้าทั้งหมดถูกลบเรียบร้อยแล้ว');

        } catch (\Exception $e) {
            return redirect()->route('mystore')
                ->with('error', 'เกิดข้อผิดพลาดในการลบร้านค้า: ' . $e->getMessage());
        }
    }

    public function destroyProduct($id)
    {
        try {
            $product = Product::findOrFail($id);

            // ตรวจสอบสิทธิ์ผู้ใช้
            $store = Store::findOrFail($product->id_stores);
            if ($store->user_id !== Auth::id()) {
                return redirect()->back()
                    ->with('error', 'คุณไม่มีสิทธิ์ลบสินค้านี้');
            }

            // ลบรูปภาพสินค้า
            if ($product->ProductImage) {
                Storage::delete('public/' . $product->ProductImage);
            }

            // ลบสินค้า
            $product->delete();

            return redirect()->back()
                ->with('success', 'สินค้าถูกลบเรียบร้อยแล้ว');

        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'เกิดข้อผิดพลาดในการลบสินค้า: ' . $e->getMessage());
        }
    }


}
