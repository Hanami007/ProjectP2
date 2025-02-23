// UserOrders.jsx
import React from "react";
import { Head } from "@inertiajs/react";

const UserOrders = ({ orders }) => {
    return (
        <>
            <Head title="Your Orders" />
            <div className="container">
                <h2>Your Orders</h2>
                {orders.length > 0 ? (
                    <div>
                        {orders.map((order) => (
                            <div key={order.id} className="order-item">
                                <h3>Order ID: {order.id}</h3>
                                <p>Status: {order.order_status}</p>
                                <p>Total: ${order.total_amount}</p>

                                <h4>Products:</h4>
                                <ul>
                                    {order.order_details.map((detail) => (
                                        <li key={detail.id}>
                                            <strong>{detail.product.product_name}</strong>
                                            - Quantity: {detail.quantity}
                                            - ${detail.unit_price} each
                                        </li>
                                    ))}
                                </ul>

                                <h4>Delivery Info:</h4>
                                {order.deliveries.map((delivery) => (
                                    <p key={delivery.id}>
                                        Shipper: {delivery.shipper_name}
                                        | Status: {delivery.delivery_status}
                                        | Delivered: {delivery.delivery_date ? 'Yes' : 'No'}
                                    </p>
                                ))}

                                {/* Confirm Receipt Button */}
                                {!order.deliveries.some(delivery => delivery.delivery_status === 'received') && (
                                    <button onClick={() => confirmReceipt(order.id)}>
                                        Confirm Receipt
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>You have no orders yet.</p>
                )}
            </div>
        </>
    );
};

const confirmReceipt = (orderId) => {
    // ส่งคำขอยืนยันการรับสินค้า
    Inertia.post(`/orders/${orderId}/confirm-receipt`, {
        orderId,
    });
};

export default UserOrders;
