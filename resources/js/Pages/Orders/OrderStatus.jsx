import React from "react";
import { Link } from "@inertiajs/inertia-react";

const OrderConfirmation = ({ order }) => {
    if (!order || Object.keys(order).length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50 p-6">
                <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center transform transition-transform hover:scale-105">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">ไม่พบข้อมูลคำสั่งซื้อ</h1>
                    <Link
                        href="/homepage"
                        className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-8 rounded-full hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg hover:shadow-xl"
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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50 p-6">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl w-full transform transition-transform hover:scale-102">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">ขอบคุณสำหรับการสั่งซื้อ</h1>
                    <p className="text-lg text-gray-600">หมายเลขคำสั่งซื้อ: <span className="font-semibold text-blue-500">#{orderId}</span></p>
                </div>

                {/* สถานะคำสั่งซื้อและการชำระเงิน */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
                        <p className="text-gray-600">สถานะคำสั่งซื้อ:</p>
                        <p className="text-xl font-semibold text-gray-800">
                            {orderStatus === "pending" ? "รอดำเนินการ" : "จัดส่งแล้ว"}
                        </p>
                    </div>
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
                        <p className="text-gray-600">สถานะการชำระเงิน:</p>
                        <p className={`text-xl font-semibold ${paymentStatus === "paid" ? "text-green-600" : "text-yellow-600"}`}>
                            {paymentStatus === "paid" ? "ชำระเงินแล้ว" : "รอชำระเงิน"}
                        </p>
                    </div>
                </div>

                {/* รายการสินค้า */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">รายการสินค้า</h2>
                    {orderDetails.length > 0 ? (
                        <div className="space-y-4">
                            {orderDetails.map((detail, index) => (
                                <div key={detail?.id || index} className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg hover:shadow-md transition-shadow">
                                    <div className="flex items-center space-x-4">
                                        <img
                                            src={detail.product?.ProductImage
                                                ? `/storage/${detail.product.ProductImage}`
                                                : "default_image_url.jpg"
                                            }
                                            alt={detail.product?.ProductName}
                                            className="w-16 h-16 object-cover rounded-lg"
                                        />
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800">
                                                {detail.product?.ProductName ?? "ไม่ทราบชื่อสินค้า"}
                                            </h3>
                                            <p className="text-sm text-gray-600">รหัสสินค้า: {detail.product?.id || 'N/A'}</p>
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

                {/* ยอดรวมทั้งสิ้น */}
                <div className="border-t pt-6 mb-8">
                    <div className="flex justify-between items-center text-2xl font-bold text-gray-800">
                        <span>ยอดรวมทั้งสิ้น:</span>
                        <span className="text-green-600">฿{Number(totalAmount).toFixed(2)}</span>
                    </div>
                </div>

                {/* ปุ่มกลับสู่หน้าหลัก */}
                <div className="text-center">
                    <Link
                        href="/homepage"
                        className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-10 rounded-full hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg hover:shadow-xl"
                    >
                        กลับสู่หน้าหลัก
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmation;
