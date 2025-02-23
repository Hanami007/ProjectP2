import React from "react";
import { Link } from "@inertiajs/inertia-react";

const OrderStatus = ({ order }) => {
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-semibold mb-6">สถานะคำสั่งซื้อ #{order.id}</h1>
            <p>สถานะ: {order.OrderStatus === "pending" ? "รอดำเนินการ" : "จัดส่งแล้ว"}</p>
            <p>
                การชำระเงิน: {order.payment_status === "paid" ? "ชำระเงินแล้ว" : "รอชำระเงิน"}
            </p>
            <p>ยอดรวม: ฿{order.TotalAmount.toFixed(2)}</p>
            <h3 className="mt-4 text-xl">รายการสินค้า:</h3>
            <ul className="mt-2">
                {order.orderDetails.map((detail) => (
                    <li key={detail.id} className="border-b py-2">
                        {detail.product.ProductName} - จำนวน: {detail.Quantity} - ฿
                        {(detail.UnitPrice * detail.Quantity).toFixed(2)}
                    </li>
                ))}
            </ul>
            <Link href="/homepage" className="mt-6 block text-blue-500 hover:underline">
                กลับสู่หน้าหลัก
            </Link>
        </div>
    );
};

export default OrderStatus;
