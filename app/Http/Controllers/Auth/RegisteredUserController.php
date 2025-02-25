<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'phone' => 'nullable|string|max:255',
            'birthday' => 'nullable|date',
            'sex' => 'nullable|string|max:10',
            'address' => 'nullable|string|max:255',
            'picture' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // เก็บไฟล์ภาพถ้ามี
        $picturePath = null;
        if ($request->hasFile('picture')) {
            $picturePath = $request->file('picture')->store('profile_pictures', 'public');
        }

        // ใช้ Hash::make เพื่อเข้ารหัสรหัสผ่าน
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),  // แฮชรหัสผ่านที่นี่
            'phone' => $request->phone,  // แก้ไขจาก $request->hone เป็น $request->phone
            'birthday' => $request->birthday,
            'sex' => $request->sex,
            'address' => $request->address,
            'picture' => $picturePath,  // เพิ่มการเก็บ path ของรูปภาพ
        ]);

        // trigger event for registered user
        event(new Registered($user));

        // login user after registration
        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }
}
