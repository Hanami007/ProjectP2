<?php

namespace App\Http\Controllers;

use App\Models\Store;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
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
        // ดึงข้อมูลร้านค้าตาม ID
        $store = Store::findOrFail($id);

        // ดึงข้อมูลสินค้าที่เกี่ยวข้องกับร้านนี้
        $products = Product::where('id_stores', $store->id)->get();

        // ส่งข้อมูลไปยังหน้าแสดงรายละเอียดร้านค้า
        return Inertia::render('Store/Show', [  // เปลี่ยนเป็นหน้า Show
            'store' => $store,
            'products' => $products
        ]);
    }

    public function store(Request $request)
    {
        // Validate the incoming request
        $validated = $request->validate([
            'storeName' => 'required|string|max:255',
            'ownerName' => 'required|string|max:255',
            'phoneNumber' => 'nullable|string',
            'address' => 'required|string',
        ]);

        // Create a new store
        Store::create([
            'StoreName' => $validated['storeName'],
            'ownerName' => $validated['ownerName'],
            'PhoneNumber' => $validated['phoneNumber'],
            'Address' => $validated['address'],
            'user_id' => Auth::id(), // Assigning the current authenticated user
        ]);

        // Redirect or show a success message
        return redirect()->route('stores.index'); // Adjust the redirect path as needed
    }

    // เมธอดอื่นๆ...
}
