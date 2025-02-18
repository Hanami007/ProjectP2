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
        $request->validate([
            'storeName' => 'required|string|max:255',
            'ownerName' => 'required|string|max:255',
            'phoneNumber' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            // เพิ่มการตรวจสอบค่า OpenDate ถ้าจำเป็น
        ]);

        $store = new Store();
        $store->StoreName = $request->storeName;
        $store->ownerName = $request->ownerName;
        $store->PhoneNumber = $request->phoneNumber;
        $store->Address = $request->address;
        $store->user_id = auth()->id();
        $store->Rating = 0; // ตั้งค่าเริ่มต้นให้กับ Rating
        $store->OpenDate = now(); // ตั้งค่าเริ่มต้นให้กับ OpenDate
        $store->save();

        return redirect()->route('stores.index')->with('success', 'Store created successfully.');
    }

    // เมธอดอื่นๆ...
}
