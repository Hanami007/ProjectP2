<?php
namespace App\Http\Controllers;
use App\Models\Order;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function showPendingOrders()
    {
        // ดึงข้อมูลคำสั่งซื้อที่มีสถานะเป็น 'pending'
        $orders = Order::with(['user', 'products']) // ดึงข้อมูลผู้ใช้และสินค้า
            ->where('OrderStatus', 'pending')
            ->get();


        // ส่งข้อมูลไปยังหน้า React
        return Inertia::render('Orders/OrderPending', [
            'orders' => $orders
        ]);
    }

    public function status($order_id)
    {
        $order = Order::with('order_details.product')->findOrFail($order_id);
        return Inertia::render('Orders/OrderStatus', ['order' => $order]);
    }

    public function show($id)
{
    $order = Order::with('user', 'order_details.product') // ใช้ eager loading ดึงข้อมูลจาก product
        ->find($id);

    if (!$order) {
        return response()->json(['message' => 'Order not found'], 404);
    }

    return Inertia::render('Orders/OrderDetail', [
        'order' => [
            'id' => $order->id,
            'user_id' => $order->user_id,
            'TotalAmount' => (float) $order->TotalAmount,
            'OrderStatus' => $order->OrderStatus,
            'payment_status' => $order->payment_status,
            'orderDetails' => $order->order_details->map(function ($detail) {
                // ดึงราคาจาก products
                $product = $detail->product; // ดึงข้อมูล product ที่เชื่อมโยงกับ order_detail
                return [
                    'id' => $detail->id,
                    'product_id' => $detail->product_id,
                    'Quantity' => $detail->quantity,
                    'UnitPrice' => (float) $product->Price, // ดึงราคาจาก table product
                    'product' => [
                        'ProductName' => $product->ProductName ?? 'Unknown' // ดึงชื่อสินค้าจาก product
                    ]
                ];
            }),
            'user' => [
                'name' => $order->user->Name,
                'address' => $order->user->Address // เพิ่มที่อยู่ของผู้ใช้
            ]
        ]
    ]);
}


    // ฟังก์ชันอัปเดตสถานะคำสั่งซื้อ
    public function updateOrderStatus(Order $order)
    {
        $order->update([
            'status' => 'completed', // เปลี่ยนสถานะคำสั่งซื้อเป็น completed
        ]);

        return redirect()->route('orders.pending');
    }

    public function showDetail($id)
    {
        $order = Order::with(['user', 'orderDetails.product'])->findOrFail($id);

        return Inertia::render('OrderDetail', [
            'order' => $order
        ]);
    }
    public function index()
    {
        $orders = Order::with('order_details.product')->get(); // ดึงข้อมูลคำสั่งซื้อทั้งหมดพร้อมกับรายละเอียดสินค้า

        return Inertia::render('Orders/OrderPending ', [
            'orders' => $orders
        ]);
    }

    public function confirmReceipt($orderId)
{
    $order = Order::findOrFail($orderId);

    // อัปเดตสถานะการจัดส่งเป็น received
    $order->update(['OrderStatus' => 'Completed']);

    return redirect()->back()->with('success', 'Order has been confirmed.');
}

public function destroy(Order $order)
{
    // ตรวจสอบสิทธิ์การลบคำสั่งซื้อ
    if ($order->user_id != auth()->id()) {
        abort(403, 'Unauthorized action.');
    }

    // ลบคำสั่งซื้อ
    $order->delete();

    // ส่งข้อความกลับหลังจากลบสำเร็จ
    return redirect()->route('profile.orders')->with('success', 'Order deleted successfully.');
}


}
