import React, { useState } from "react";
import { Link } from "@inertiajs/inertia-react";
import { useForm } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

const CartItem = ({ item, onQuantityChange }) => {
    const [itemQuantity, setItemQuantity] = useState(item.quantity);

    const handleIncrement = () => {
        const newQuantity = itemQuantity + 1;
        setItemQuantity(newQuantity);
        onQuantityChange(item.product.id, newQuantity);
    };

    const handleDecrement = () => {
        if (itemQuantity > 1) {
            const newQuantity = itemQuantity - 1;
            setItemQuantity(newQuantity);
            onQuantityChange(item.product.id, newQuantity);
        }
    };

    return (
        <div className="flex items-center justify-between border-b py-4">
            <div className="flex items-center space-x-4">
                <img
                    src={item.product.ProductImage || "default.jpg"}
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
                <span>{itemQuantity}</span>
                <button
                    onClick={handleIncrement}
                    className="px-3 py-1 bg-gray-300 rounded"
                >
                    +
                </button>
            </div>
            <div className="">
                <button onClick={() => Inertia.delete(`/cart/${item.product.id}`)} className="text-red-500">
                    ลบ
                </button>
            </div>
        </div>
    );
};

const CartPage = ({ cartItems, message }) => {
    const [quantities, setQuantities] = useState(
        Object.fromEntries(cartItems.map(item => [item.product.id, item.quantity]))
    );

    const { data, setData, post, processing } = useForm({
        quantities: quantities
    });

    const handleQuantityChange = (productId, newQuantity) => {
        setQuantities(prev => ({
            ...prev,
            [productId]: newQuantity
        }));
    };

    const calculateTotal = () => {
        return cartItems
            .reduce(
                (sum, item) =>
                    sum + parseFloat(item.product.Price) * quantities[item.product.id],
                0
            )
            .toFixed(2);
    };

    const handleCheckout = () => {
        const orderItems = Object.entries(quantities).map(([product_id, quantity]) => ({
            product_id: parseInt(product_id),
            quantity
        }));

        post('/orders', {
            orderItems: orderItems
        }, {
            onSuccess: (page) => {
                const orderId = page.props.orderId;
                window.location.href = `/orders/${orderId}/payment`;
            },
        });
    };

    React.useEffect(() => {
        setData('orderItems', Object.entries(quantities).map(([product_id, quantity]) => ({
            product_id: parseInt(product_id),
            quantity
        })));
    }, [quantities]);

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto p-6 text-center">
                <h1 className="text-3xl font-semibold mb-6">ตะกร้าสินค้า</h1>
                <p className="text-gray-600">{message || 'ไม่มีสินค้าในตะกร้า'}</p>
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
                        onQuantityChange={handleQuantityChange}
                    />
                ))}

                <div className="text-right mt-6">
                    <h3 className="text-xl font-semibold">ยอดรวม: ฿{calculateTotal()}</h3>
                    <button
                        onClick={handleCheckout}
                        disabled={processing}
                        className="mt-4 inline-block bg-green-500 text-white py-2 px-6 rounded-full hover:bg-green-600 disabled:bg-gray-400"
                    >
                        {processing ? 'กำลังดำเนินการ...' : 'ดำเนินการชำระเงิน'}
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
