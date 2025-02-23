// resources/js/Pages/Orders/OrderPending.jsx
import React, { useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia-react';

const OrderPending = ({ orders }) => {

    // ฟังก์ชันที่ใช้ในการอัปเดตสถานะคำสั่งซื้อ
    const handleOrderUpdate = (orderId) => {
        Inertia.put(`/orders/${orderId}/update`, { status: 'completed' });
    };

    return (
        <div className="container">
            <h1 className="text-center text-2xl font-semibold mb-4">Pending Orders</h1>
            <table className="min-w-full table-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Order ID</th>
                        <th className="px-4 py-2">Customer</th>
                        <th className="px-4 py-2">Total Amount</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 ? (
                        orders.map((order) => (
                            <tr key={order.id}>
                                <td className="border px-4 py-2">{order.id}</td>
                                <td className="border px-4 py-2">{order.user_id}</td>
                                <td className="border px-4 py-2">${order.TotalAmount}</td>
                                <td className="border px-4 py-2">{order.OrderStatus}</td>
                                <td className="border px-4 py-2">
                                    {order.status === 'pending' && (
                                        <button
                                            onClick={() => handleOrderUpdate(order.id)}
                                            className="bg-green-500 text-white px-4 py-2 rounded"
                                        >
                                            Mark as Completed
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center py-4">No pending orders</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default OrderPending;
