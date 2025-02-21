<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Show the orders.
     */
    public function index(Request $request)
    {
        // ดึงข้อมูล orders จากฐานข้อมูล
        $orders = $request->user()->orders;

        return Inertia::render('Orders/Index', [
            'orders' => $orders,
        ]);
    }
}
