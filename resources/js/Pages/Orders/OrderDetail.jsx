import React from 'react';
import { Link } from '@inertiajs/inertia-react';

const OrderDetail = ({ order }) => {
    return (
        <div className="container mx-auto p-6">
            {/* Header */}
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                Order Details
            </h1>

            {/* Order Summary */}
            <div className="bg-white shadow-lg rounded-xl p-6 mb-8 border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-700">Order ID: {order.id}</h2>
                <p className="text-gray-600">
                    <span className="font-medium">Customer:</span> {order.user_id || 'Unknown'}
                </p>
                <p className="text-gray-600">
                    <span className="font-medium">Payment Status:</span>
                    <span className={`ml-2 px-3 py-1 rounded-full text-white
                        ${order.payment_status === 'paid' ? 'bg-green-500' : 'bg-yellow-500'}`}>
                        {order.payment_status}
                    </span>
                </p>
                <p className="text-gray-600">
                    <span className="font-medium">Total Amount:</span>
                    <span className="text-lg font-semibold text-green-600"> ${order.TotalAmount}</span>
                </p>
            </div>

            {/* Product List Table */}
            <h2 className="text-xl font-semibold text-gray-700 mb-3">Products in this Order:</h2>
            <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
                <table className="w-full border-collapse text-sm text-left">
                    <thead>
                        <tr className="bg-blue-600 text-white text-center">
                            <th className="border px-6 py-3">Product ID</th>
                            <th className="border px-6 py-3">Product Name</th>
                            <th className="border px-6 py-3">Quantity</th>
                            <th className="border px-6 py-3">Unit Price</th>
                            <th className="border px-6 py-3">Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.orderDetails && order.orderDetails.length > 0 ? (
                            order.orderDetails.map((detail) => (
                                <tr key={detail.id} className="hover:bg-gray-100 text-center">
                                    <td className="border px-6 py-3">{detail.product_id || '-'}</td>
                                    <td className="border px-6 py-3">{detail.product?.ProductName || 'Unknown'}</td>
                                    <td className="border px-6 py-3 font-semibold text-gray-700">{detail.Quantity}</td>
                                    <td className="border px-6 py-3 text-blue-600 font-medium">
                                        ${detail.UnitPrice.toFixed(2)} {/* ใช้ UnitPrice ที่เป็นราคาของสินค้า */}
                                    </td>
                                    <td className="border px-6 py-3 text-green-600 font-semibold">
                                        ${(detail.Quantity * detail.UnitPrice).toFixed(2)}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-4 text-gray-500">No products in this order</td>
                            </tr>
                        )}
                    </tbody>

                </table>
            </div>

            {/* Back Button */}
            <div className="mt-6 text-center">
                <Link href="/orders/pending" className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all">
                    Back to Orders
                </Link>
            </div>
        </div>
    );
};

export default OrderDetail;
