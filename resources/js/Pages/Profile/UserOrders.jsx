import React from "react";
import { Head } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";

const UserOrders = ({ orders = [] }) => {
    return (
        <>
            <Head title="Your Orders" />
            <div className="max-w-4xl mx-auto p-6">
                <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>
                {orders.length > 0 ? (
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <div key={order.id} className="p-4 border rounded-lg shadow-sm bg-white">
                                <h3 className="text-lg font-medium">Order ID: {order.id}</h3>
                                <p className="text-gray-600">Status: {order.OrderStatus}</p>
                                <p className="text-gray-600">Total: ${order.TotalAmount}</p>

                                <h4 className="font-semibold mt-2">Products:</h4>
                                <ul className="list-disc list-inside text-gray-700">
                                    {order.order_details?.map((detail) => (
                                        <li key={detail.id}>
                                            <strong>{detail.product?.ProductName || "Unknown Product"}</strong>
                                            - {detail.quantity}
                                        </li>
                                    ))}
                                </ul>
                                {order.OrderStatus !== 'Completed' && (
                                    <button
                                        onClick={() => confirmReceipt(order.id)}
                                        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                    >
                                        Confirm Receipt
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">You have no orders yet.</p>
                )}
            </div>
        </>
    );
};


const confirmReceipt = (orderId) => {
    Inertia.post(`/orders/${orderId}/confirm-receipt`, {}, {
        onSuccess: () => {
            Inertia.reload({ only: ["orders"] });
        },
        onError: (error) => {
            // แสดงข้อผิดพลาด หรือข้อความเตือน
            console.error(error);
        }
    });
};



export default UserOrders;
