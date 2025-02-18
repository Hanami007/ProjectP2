<?php
// filepath: /C:/Work/vs/backend-jojo/ProjectP2/app/Http/Controllers/CartController.php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CartController extends Controller
{
    public function index()
    {
        // Ensure the user is authenticated
        if (!Auth::check()) {
            return redirect()->route('login')->with('error', 'You must be logged in to view the cart.');
        }

        // Fetch the cart items with related product data
        $cartItems = Cart::where('user_id', Auth::id())
                        ->with('product')
                        ->get();

        return Inertia::render('Homepage/cart', ['cartItems' => $cartItems]);
    }

    public function store(Request $request)
    {
        // Ensure the user is authenticated
        if (!Auth::check()) {
            return redirect()->route('login')->with('error', 'You must be logged in to add items to the cart.');
        }

        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        // Add the product to the cart
        Cart::create([
            'user_id' => Auth::id(),
            'product_id' => $validated['product_id'],
            'quantity' => $validated['quantity'],
        ]);

        return redirect()->back()->with('success', 'Product added to cart!');
    }

    public function update(Request $request)
    {
        // Ensure the user is authenticated
        if (!Auth::check()) {
            return redirect()->route('login')->with('error', 'You must be logged in to update the cart.');
        }

        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        // Update the cart item quantity
        $cartItem = Cart::where('user_id', Auth::id())
                        ->where('product_id', $validated['product_id'])
                        ->first();

        if ($cartItem) {
            $cartItem->update(['quantity' => $validated['quantity']]);
        }

        return redirect()->back()->with('success', 'Cart updated!');
    }

    public function remove($id)
    {
        // Ensure the user is authenticated
        if (!Auth::check()) {
            return redirect()->route('login')->with('error', 'You must be logged in to remove items from the cart.');
        }

        // Remove the cart item
        Cart::where('user_id', Auth::id())
            ->where('product_id', $id)
            ->delete();

        return redirect()->back()->with('success', 'Item removed from cart!');
    }
}
