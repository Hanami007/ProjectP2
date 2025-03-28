<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail, //ตรวจสอบว่าผู้ใช้ยืนยันอีเมลหรือไม่
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,  // เพิ่มการอัปเดตเบอร์โทรศัพท์
            'address' => $request->address,  // เพิ่มการอัปเดตที่อยู่
        ]);

        if ($request->user()->isDirty('email')) { //ตรวจสอบการแก้ไขอีเมล
            $request->user()->email_verified_at = null; //ถ้ามีการแก้ไข e จะถูกเปลี่ยนเป็น Null
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'], //ตรวจสอบรหัสผ่านปัจจุบันของผู้ใช้
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    public function userOrders()
    {
        $user = Auth::user();
        // ดึงข้อมูลคำสั่งซื้อและรายละเอียดสินค้าที่ผู้ใช้ทำ
        $orders = $user->orders()->with('orderDetails.product', 'delivery')->get();

        return Inertia::render('Profile/UserOrders', [
            'orders' => $orders,
        ]);
    }




}
