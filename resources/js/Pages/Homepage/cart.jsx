import React from "react";
import { Link, useForm } from "@inertiajs/inertia-react";
import axios from "axios"; // Added missing import

const CartPage = ({ cartItems }) => {
    const { post, patch, delete: destroy } = useForm();

    const updateQuantity = (item, quantity) => {
        if (quantity < 1) return;
        patch("/cart/update", { product_id: item.product.id, quantity });
    };

    const removeFromCart = (item) => {
        destroy(`/cart/remove/${item.product.id}`);
    };

    // Use the Inertia methods consistently instead of mixing with direct Axios calls
    const incrementQuantity = (item) => {
        updateQuantity(item, item.quantity + 1);
    };

    const decrementQuantity = (item) => {
        if (item.quantity > 1) {
            updateQuantity(item, item.quantity - 1);
        } else {
            removeFromCart(item);
        }
    };

    const total = cartItems
        .reduce(
            (sum, item) => sum + parseFloat(item.product.Price) * item.quantity,
            0
        )
        .toFixed(2);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-semibold text-center mb-6">
                ตะกร้าสินค้า
            </h1>
            {cartItems.length === 0 ? (
                <p className="text-center text-gray-600">ไม่มีสินค้าในตะกร้า</p>
            ) : (
                <div className="bg-white shadow-lg rounded-lg p-6">
                    {cartItems.map((item) => (
                        <div
                            key={item.product.id}
                            className="flex items-center justify-between border-b py-4"
                        >
                            <div className="flex items-center space-x-4">
                                <img
                                    src={
                                        item.product.ProductImage ||
                                        "default.jpg"
                                    }
                                    alt={item.product.ProductName}
                                    className="w-16 h-16 object-cover rounded-full"
                                />
                                <div>
                                    <h2 className="text-lg font-semibold">
                                        {item.product.ProductName}
                                    </h2>
                                    <p className="text-green-600 font-bold">
                                        ฿
                                        {parseFloat(item.product.Price).toFixed(
                                            2
                                        )}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => decrementQuantity(item)}
                                    className="px-3 py-1 bg-gray-300 rounded"
                                >
                                    -
                                </button>
                                <span>{item.quantity}</span>
                                <button
                                    onClick={() => incrementQuantity(item)}
                                    className="px-3 py-1 bg-gray-300 rounded"
                                >
                                    +
                                </button>
                            </div>
                            <button
                                onClick={() => removeFromCart(item)}
                                className="text-red-500"
                            >
                                ลบ
                            </button>
                        </div>
                    ))}
                    <div className="text-right mt-6">
                        <h3 className="text-xl font-semibold">
                            ยอดรวม: ฿{total}
                        </h3>
                        <Link
                            href="/checkout"
                            className="mt-4 inline-block bg-green-500 text-white py-2 px-6 rounded-full hover:bg-green-600"
                        >
                            ดำเนินการชำระเงิน
                        </Link>
                    </div>
                </div>
            )}
            <Link
                href="/homepage"
                className="mt-6 block text-center text-blue-500 hover:underline"
            >
                กลับสู่หน้าหลัก
            </Link>
        </div>
    );
};

export default CartPage;
