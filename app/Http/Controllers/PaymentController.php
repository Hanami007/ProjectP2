<?php
namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Payment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentController extends Controller
{
    public function paymentPage($order_id)
    {
        $order = Order::findOrFail($order_id);
        return Inertia::render('Payment/PaymentPage', ['order' => $order]);
    }

    public function confirmPayment(Request $request, $order_id)
    {
        $request->validate([
            'receipt' => 'required|image|max:2048', // ไฟล์ภาพขนาดไม่เกิน 2MB
        ]);

        $order = Order::findOrFail($order_id);
        $payment = Payment::where('order_id', $order_id)->first();

        // อัพโหลดหลักฐานการชำระเงิน
        if ($request->hasFile('receipt')) {
            $path = $request->file('receipt')->store('receipts', 'public');
            $payment->update([
                'receipt_image' => $path,
                'payment_status' => 'paid',
                'payment_date' => now(),
            ]);
            $order->update(['payment_status' => 'paid']);
        }

        return redirect()->route('order.status', ['order_id' => $order->id]);
    }
}
