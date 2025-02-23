import React from "react";
import { Link } from "@inertiajs/inertia-react";

const OrderConfirmation = ({ order }) => {
    if (!order || Object.keys(order).length === 0) {
        return (
            <div className="container mx-auto p-6">
                <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                    <h1 className="text-3xl font-semibold mb-4">ไม่พบข้อมูลคำสั่งซื้อ</h1>
                    <Link
                        href="/homepage"
                        className="inline-block bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600 transition-colors"
                    >
                        กลับสู่หน้าหลัก
                    </Link>
                </div>
            </div>
        );
    }

    // ข้อมูลคำสั่งซื้อ
    const orderId = order.id || 'N/A';
    const orderStatus = order.OrderStatus || 'pending';
    const paymentStatus = order.payment_status || 'pending';
    const totalAmount = order.TotalAmount || 0;
    const orderDetails = order.order_details || [];

    return (
        <div className="container mx-auto p-6">
            <div className="bg-white shadow-lg rounded-lg p-6">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-semibold">ขอบคุณสำหรับการสั่งซื้อ</h1>
                    <p className="text-lg text-gray-600 mt-2">หมายเลขคำสั่งซื้อ #{orderId}</p>
                </div>

                <div className="border-b pb-4">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">สถานะคำสั่งซื้อ:</span>
                        <span className="font-semibold">
                            {orderStatus === "pending" ? "รอดำเนินการ" : "จัดส่งแล้ว"}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">สถานะการชำระเงิน:</span>
                        <span className={`font-semibold ${paymentStatus === "paid" ? "text-green-600" : "text-yellow-600"}`}>
                            {paymentStatus === "paid" ? "ชำระเงินแล้ว" : "รอชำระเงิน"}
                        </span>
                    </div>
                </div>

                <div className="my-6">
                    <h2 className="text-xl font-semibold mb-4">รายการสินค้า</h2>
                    {orderDetails.length > 0 ? (
                        <div className="space-y-4">
                            {orderDetails.map((detail, index) => (
                                <div key={detail?.id || index} className="flex items-center justify-between border-b py-4">
                                    <div className="flex items-center space-x-4">
                                        <img
                                            src={detail.product?.ProductImage
                                                ? `/storage/${detail.product.ProductImage}`
                                                : "default_image_url.jpg"
                                            }
                                            alt={detail.product?.ProductName}
                                            className="w-16 h-16 object-cover rounded-full"
                                        />
                                        <div>
                                            <h3 className="text-lg font-semibold">
                                                {detail.product?.ProductName ?? "ไม่ทราบชื่อสินค้า"}
                                            </h3>

                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-gray-600">จำนวน: {detail.quantity || 0} ชิ้น</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-600 text-center">ไม่มีรายการสินค้า</p>
                    )}
                </div>

                <div className="border-t pt-4">
                    <div className="flex justify-between items-center text-xl font-semibold">
                        <span>ยอดรวมทั้งสิ้น:</span>
                        <span className="text-green-600">฿{Number(totalAmount).toFixed(2)}</span>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <Link
                        href="/homepage"
                        className="inline-block bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600 transition-colors"
                    >
                        กลับสู่หน้าหลัก
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmation;
