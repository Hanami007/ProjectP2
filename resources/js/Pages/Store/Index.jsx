// resources/js/Pages/Orders/OrderPending.jsx
import React from 'react';
import { Inertia } from '@inertiajs/inertia-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const OrderPending = ({ orders, auth }) => {
    // ฟังก์ชันที่ใช้ในการอัปเดตสถานะคำสั่งซื้อ
    const handleOrderUpdate = (orderId) => {
        Inertia.put(`/orders/${orderId}/update`, { status: 'completed' });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-center text-2xl font-bold mb-6 text-gray-700">
                    รายการคำสั่งซื้อที่รอดำเนินการ
                </h1>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-3 border border-gray-300 text-left">Order ID</th>
                                <th className="px-4 py-3 border border-gray-300 text-left">Customer</th>
                                <th className="px-4 py-3 border border-gray-300 text-center">Total Amount</th>
                                <th className="px-4 py-3 border border-gray-300 text-center">สถานะการจัดส่ง</th>
                                <th className="px-4 py-3 border border-gray-300 text-center">สถานะการชำระเงิน</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length > 0 ? (
                                orders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50 transition">
                                        <td className="border px-4 py-3">{order.id}</td>
                                        <td className="border px-4 py-3">{order.user_id}</td>
                                        <td className="border px-4 py-3 text-center">${order.TotalAmount}</td>
                                        <td className="border px-4 py-3 text-center">{order.OrderStatus}</td>
                                        <td className="border px-4 py-3 text-center">{order.payment_status}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-4 text-gray-500">
                                        ไม่มีคำสั่งซื้อที่รอดำเนินการ
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default OrderPending;
