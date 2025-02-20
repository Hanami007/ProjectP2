<?php
use App\Http\Controllers\StoreController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;

Route::get('/homepage', [ProductController::class, 'index'])->name('homepage.index');

Route::get('/cart', [CartController::class, 'index'])->name('cart.index'); // เส้นทางสำหรับแสดงหน้าตะกร้า
Route::post('/cart', [CartController::class, 'store'])->name('cart.store'); // เส้นทางสำหรับเพิ่มสินค้าในตะกร้า
Route::patch('/cart/update', [CartController::class, 'update'])->name('cart.update');
Route::delete('/cart/remove/{id}', [CartController::class, 'remove']);
Route::get('/cart/count', [CartController::class, 'count'])->name('cart.count'); // เส้นทางสำหรับนับจำนวนสินค้าในตะกร้า

Route::get('/products/{id}', [ProductController::class, 'show'])->name('products.show');

Route::get('stores/create', [StoreController::class, 'create'])->name('stores.create');
Route::post('stores', [StoreController::class, 'store'])->name('stores.store'); // Add this line
Route::get('stores/{id}', [StoreController::class, 'show'])->name('stores.show');
Route::get('stores', [StoreController::class, 'index'])->name('stores.index');

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
