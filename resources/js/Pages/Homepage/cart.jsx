import React, { useState, useEffect } from "react";
import { Link, useForm } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

const CartItem = ({ item }) => {
    const handleQuantityUpdate = (newQuantity) => {
        if (newQuantity >= 1) {
            Inertia.put('/cart', { product_id: item.product.id, quantity: newQuantity }, {
                onError: (errors) => {
                    console.error(errors); // แสดง error ถ้ามีปัญหา
                }
            });
        }
    };

    const handleIncrement = () => {
        handleQuantityUpdate(item.quantity + 1);
    };

    const handleDecrement = () => {
        if (item.quantity > 1) {
            handleQuantityUpdate(item.quantity - 1);
        }
    };

    return (
        <div className="flex items-center justify-between border-b py-4">
            <div className="flex items-center space-x-4">
                <img
                    src={
                        item.product.ProductImage
                            ? `/storage/${item.product.ProductImage}`
                            : "default_image_url.jpg"
                    }
                    alt={item.product.ProductName}
                    className="w-16 h-16 object-cover rounded-full"
                />
                <div>
                    <h2 className="text-lg font-semibold">{item.product.ProductName}</h2>
                    <p className="text-green-600 font-bold">
                        ฿{parseFloat(item.product.Price).toFixed(2)}
                    </p>
                </div>
            </div>
            <div className="flex items-center space-x-2">
                <button
                    onClick={handleDecrement}
                    className="px-3 py-1 bg-gray-300 rounded"
                >
                    -
                </button>
                <span>{item.quantity}</span>
                <button
                    onClick={handleIncrement}
                    className="px-3 py-1 bg-gray-300 rounded"
                >
                    +
                </button>
            </div>
            <div>
                <button
                    onClick={() => Inertia.delete(`/cart/${item.product.id}`, {
                        onSuccess: () => Inertia.reload({ only: ['cartItems'] }),
                    })}
                    className="text-red-500"
                >
                    ลบ
                </button>
            </div>
        </div>
    );
};

const CartPage = ({ cartItems }) => {
    const [paymentMethod, setPaymentMethod] = useState("cod");

    const { data, setData, post, processing } = useForm({
        payment_method: paymentMethod,
    });

    useEffect(() => {
        setData('payment_method', paymentMethod);
    }, [paymentMethod]);

    const calculateTotal = () => {
        return cartItems
            .reduce((sum, item) => sum + parseFloat(item.product.Price) * item.quantity, 0)
            .toFixed(2);
    };

    const handleCheckout = () => {
        post("/cart/checkout");
    };

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto p-6 text-center">
                <h1 className="text-3xl font-semibold mb-6">ตะกร้าสินค้า</h1>
                <p className="text-gray-600">ไม่มีสินค้าในตะกร้า</p>
                <Link href="/homepage" className="mt-6 text-blue-500 hover:underline">
                    กลับสู่หน้าหลัก
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-semibold text-center mb-6">ตะกร้าสินค้า</h1>
            <div className="bg-white shadow-lg rounded-lg p-6">
                {cartItems.map((item) => (
                    <CartItem
                        key={item.product.id}
                        item={item}
                    />
                ))}

                <div className="mt-6">
                    <h3 className="text-xl font-semibold">เลือกวิธีการชำระเงิน:</h3>
                    <div className="flex space-x-4 mt-2">
                        <label>
                            <input
                                type="radio"
                                value="cod"
                                checked={paymentMethod === "cod"}
                                onChange={() => setPaymentMethod("cod")}
                            />
                            ปลายทาง (Cash on Delivery)
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="bank_transfer"
                                checked={paymentMethod === "bank_transfer"}
                                onChange={() => setPaymentMethod("bank_transfer")}
                            />
                            โอนเงิน (Bank Transfer)
                        </label>
                    </div>
                </div>

                <div className="text-right mt-6">
                    <h3 className="text-xl font-semibold">ยอดรวม: ฿{calculateTotal()}</h3>
                    <button
                        onClick={handleCheckout}
                        disabled={processing}
                        className="mt-4 inline-block bg-green-500 text-white py-2 px-6 rounded-full hover:bg-green-600 disabled:bg-gray-400"
                    >
                        {processing ? "กำลังดำเนินการ..." : "ดำเนินการชำระเงิน"}
                    </button>
                </div>
            </div>
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
