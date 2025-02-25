import React from "react";
import { Head } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const UserOrders = ({ orders = [] }) => {
    return (
        <AuthenticatedLayout> {/* ใช้ layout นี้ห่อหุ้มเนื้อหาของ UserOrders */}
            <Head title="Your Orders" />
            <div className="max-w-6xl mx-auto p-6 bg-blue-50 rounded-lg shadow-md">
                <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-gray-900 mb-8">Your Orders</h2>
                {orders.length > 0 ? (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div
                                key={order.id}
                                className="p-6 bg-white rounded-lg shadow-lg dark:bg-gray-700 transition-transform transform hover:scale-105"
                            >
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                                    Order ID: {order.id}
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300">Status: {order.OrderStatus}</p>
                                <p className="text-gray-700 dark:text-gray-300">Total: ${order.TotalAmount}</p>

                                <h4 className="font-semibold mt-4 text-gray-900 dark:text-gray-100">Products:</h4>
                                <ul className="list-disc list-inside text-gray-700 dark:text-gray-200">
                                    {order.order_details?.map((detail) => (
                                        <li key={detail.id} className="mt-2">
                                            <strong>{detail.product?.ProductName || "Unknown Product"}</strong> - {detail.quantity}
                                        </li>
                                    ))}
                                </ul>

                                {/* ปุ่ม Confirm Receipt */}
                                {order.OrderStatus !== 'Completed' && (
                                    <button
                                        onClick={() => confirmReceipt(order.id)}
                                        className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-md shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
                                    >
                                        Confirm Receipt
                                    </button>
                                )}

                                {/* ปุ่ม Delete Order */}
                                {order.OrderStatus === 'Completed' && (
                                    <button
                                        onClick={() => deleteOrder(order.id, order.OrderStatus)}
                                        className="mt-3 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                                    >
                                        Delete Order
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-center">You have no orders yet.</p>
                )}
            </div>
        </AuthenticatedLayout>
    );
};

// ฟังก์ชันการยืนยันการรับสินค้า
const confirmReceipt = (orderId) => {
    Inertia.post(`/orders/${orderId}/confirm-receipt`, {}, {
        onSuccess: () => {
            Inertia.reload({ only: ["orders"] });
        },
        onError: (error) => {
            console.error(error);
        }
    });
};

// ฟังก์ชันการลบคำสั่งซื้อ
const deleteOrder = (orderId, orderStatus) => {
    if (orderStatus !== 'Completed') {
        alert('You can only delete orders with status "Completed".');
        return;
    }

    if (window.confirm('Are you sure you want to delete this order?')) {
        Inertia.delete(route('orders.destroy', orderId), {
            onSuccess: () => {
                Inertia.reload({ only: ['orders'] }); // รีเฟรชข้อมูลคำสั่งซื้อ
            },
            onError: (error) => {
                console.error(error);
            }
        });
    }
};

export default UserOrders;
