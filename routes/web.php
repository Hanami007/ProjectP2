<?php
use App\Http\Controllers\StoreController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\OrderController;

Route::middleware(['auth:sanctum', 'verified'])->get('/orders', [OrderController::class, 'index'])->name('orders.index');
Route::middleware(['auth:sanctum', 'verified'])->post('/orders', [OrderController::class, 'store'])->name('orders.store');
Route::middleware(['auth:sanctum', 'verified'])->get('/profile-detail', [UserController::class, 'show'])->name('profile.show');
Route::get('/homepage', [ProductController::class, 'index'])->name('homepage.index');

Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
Route::post('/cart', [CartController::class, 'store'])->name('cart.store');
Route::patch('/cart/update', [CartController::class, 'update'])->name('cart.update');
Route::delete('/cart/{id}', [CartController::class, 'remove'])->name('cart.remove');
Route::get('/cart/count', [CartController::class, 'count'])->name('cart.count');
Route::post('/cart/increment', [CartController::class, 'increment'])->name('cart.increment');
Route::post('/cart/decrement', [CartController::class, 'decrement'])->name('cart.decrement');

Route::get('/products/{id}', [ProductController::class, 'show'])->name('products.show');

Route::post('/reviews', [ReviewController::class, 'store'])->middleware('auth');
Route::get('/reviews/{productId}', [ReviewController::class, 'index']);

Route::get('stores/create', [StoreController::class, 'create'])->name('stores.create');
Route::post('stores', [StoreController::class, 'store'])->name('stores.store'); // Add this line
Route::get('stores/{id}', [StoreController::class, 'show'])->name('stores.show');
Route::get('stores', [StoreController::class, 'index'])->name('stores.index');
Route::middleware(['auth:sanctum', 'verified'])->get('/mystore', [StoreController::class, 'mystore'])->name('mystore');
Route::middleware(['auth:sanctum', 'verified'])->get('/user-store', [StoreController::class, 'userStore'])->name('user.store');
Route::middleware(['auth:sanctum', 'verified'])->delete('/stores/{id}', [StoreController::class, 'destroy'])->name('stores.destroy');

Route::middleware(['auth:sanctum', 'verified'])->post('/products', [ProductController::class, 'store'])->name('products.store');
Route::middleware(['auth:sanctum', 'verified'])->patch('/products/{id}', [ProductController::class, 'update'])->name('products.update');

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
