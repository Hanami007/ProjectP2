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
use App\Http\Controllers\WalletController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\OrderController;

Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
Route::post('/cart', [CartController::class, 'store'])->name('cart.store');
Route::put('/cart', [CartController::class, 'update'])->name('cart.update');
Route::delete('/cart/{id}', [CartController::class, 'destroy'])->name('cart.destroy');
Route::post('/cart/checkout', [CartController::class, 'checkout'])->name('cart.checkout');

Route::get('/payment/{order_id}', [PaymentController::class, 'paymentPage'])->name('payment.page');
Route::post('/payment/{order_id}/confirm', [PaymentController::class, 'confirmPayment'])->name('payment.confirm');

Route::get('/orders/pending', [OrderController::class, 'pendingOrders'])->name('orders.pending');
Route::put('/orders/{order}/update', [OrderController::class, 'updateOrderStatus'])->name('orders.update');
Route::get('/orders/{order}/status', [OrderController::class, 'status'])->name('orders.status');
Route::get('/orders/{order_id}', [OrderController::class, 'status'])->name('order.status');
Route::post('/orders', [OrderController::class, 'store'])->name('orders.store');
Route::get('/orders/{order}/payment', [OrderController::class, 'showPayment'])->name('orders.payment');
Route::get('/orders/{order}', [OrderController::class, 'show'])->name('orders.show');
Route::get('/orders/{id}', [OrderController::class, 'show'])->name('orders.show');
Route::get('/wallet/topup', [WalletController::class, 'showTopupForm'])->name('wallet.topup');

Route::get('/products/create', [ProductController::class, 'create'])->name('products.create');
Route::get('/homepage', [ProductController::class, 'index'])->name('homepage.index');
Route::get('/products/{id}', [ProductController::class, 'show'])->name('products.show');
Route::get('/products/{id}/edit', [ProductController::class, 'edit'])->name('products.edit');
Route::post('/products', [ProductController::class, 'store'])->name('products.store');
Route::patch('/products/{product}', [ProductController::class, 'update'])->name('products.update');
Route::delete('products/{id}', [ProductController::class, 'destroy'])->name('products.destroy');
Route::middleware(['auth:sanctum', 'verified'])->post('/products', [ProductController::class, 'store'])->name('products.store');

Route::middleware(['auth:sanctum', 'verified'])->get('/orders', [OrderController::class, 'index'])->name('orders.index');
Route::middleware(['auth:sanctum', 'verified'])->post('/orders', [OrderController::class, 'store'])->name('orders.store');
Route::middleware(['auth:sanctum', 'verified'])->get('/profile-detail', [UserController::class, 'show'])->name('profile.show');

Route::post('/reviews', [ReviewController::class, 'store'])->middleware('auth');
Route::get('/reviews/{productId}', [ReviewController::class, 'index']);

Route::get('stores/create', [StoreController::class, 'create'])->name('stores.create');
Route::post('stores', [StoreController::class, 'store'])->name('stores.store'); // Add this line
Route::get('stores/{id}', [StoreController::class, 'show'])->name('stores.show');
Route::get('stores', [StoreController::class, 'index'])->name('stores.index');
Route::delete('/products/{id}', [StoreController::class, 'destroyProduct'])->name('products.destroy');
Route::middleware(['auth:sanctum', 'verified'])->get('/mystore', [StoreController::class, 'mystore'])->name('mystore');
Route::middleware(['auth:sanctum', 'verified'])->get('/user-store', [StoreController::class, 'userStore'])->name('user.store');
Route::middleware(['auth:sanctum', 'verified'])->delete('/stores/{id}', [StoreController::class, 'destroy'])->name('stores.destroy');


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

require __DIR__ . '/auth.php';
