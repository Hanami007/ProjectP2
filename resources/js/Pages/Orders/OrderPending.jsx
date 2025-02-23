import React from 'react';
import { Link } from '@inertiajs/inertia-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';  // Import Layout

const OrderPending = ({ orders }) => {
    return (
        <AuthenticatedLayout>
            <div className="container mx-auto p-6">
                <h1 className="text-center text-3xl font-bold text-gray-800 mb-6">Pending Orders</h1>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700">
                                <th className="border px-6 py-3">Order ID</th>
                                <th className="border px-6 py-3">Customer</th>
                                <th className="border px-6 py-3">Total Amount</th>
                                <th className="border px-6 py-3">สถานะการจัดส่ง</th>
                                <th className="border px-6 py-3">สถานะการชำระเงิน</th>
                                <th className="border px-6 py-3 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {orders.length > 0 ? (
                                orders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50">
                                        <td className="border px-6 py-3">{order.id}</td>
                                        <td className="border px-6 py-3">{order.user_id || 'Unknown'}</td>
                                        <td className="border px-6 py-3 text-center text-green-600 font-semibold">
                                            ${order.TotalAmount}
                                        </td>
                                        <td className="border px-6 py-3 text-center">{order.OrderStatus}</td>
                                        <td className="border px-6 py-3 text-center">{order.payment_status}</td>
                                        <td className="border px-6 py-3 text-center">
                                            <Link
                                                href={`/orders/${order.id}`}
                                                className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all"
                                            >
                                                View Details
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-4 text-gray-500">No pending orders</td>
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
