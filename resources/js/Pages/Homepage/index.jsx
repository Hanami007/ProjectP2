import React, { useState } from "react";
import { Link, Head } from "@inertiajs/react";
import axios from "axios";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Homepage = ({ products }) => {
    const [processing, setProcessing] = useState(false);

    const addToCart = async (productId) => {
        setProcessing(true);
        console.log("เพิ่มสินค้า ID:", productId);

        try {
            // เรียกใช้ method store ใน CartController
            const response = await axios.post('/cart', {
                product_id: productId,
                quantity: 1
            });

            alert('เพิ่มสินค้าลงตะกร้าเรียบร้อยแล้ว');
        } catch (error) {
            console.error("เกิดข้อผิดพลาด:", error);
            alert('เกิดข้อผิดพลาดในการเพิ่มสินค้า');
        } finally {
            setProcessing(false);
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Online Shop
                </h2>
            }
        >
            <Head title="Online Shop" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <header className="flex justify-between items-center py-6">
                                <div className="text-3xl font-bold">
                                    <Link href="/" className="text-black">Online Shop</Link>
                                </div>
                            </header>

                            <h1 className="text-3xl font-semibold text-center mb-8">
                                รายการสินค้า
                            </h1>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                                {products.map((product) => (
                                    <div
                                        key={product.id}
                                        className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
                                    >
                                        <img
                                            src={product.image_url || "default_image_url.jpg"}
                                            alt={product.ProductName}
                                            className="w-full h-64 object-cover"
                                        />
                                        <div className="p-4">
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                {product.ProductName}
                                            </h3>
                                            <p className="text-gray-600">
                                                ฿
                                                {typeof product.Price === "number"
                                                    ? product.Price.toFixed(2)
                                                    : product.Price}
                                            </p>
                                            <button
                                                onClick={() => addToCart(product.id)}
                                                disabled={processing}
                                                className="mt-4 inline-block bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors duration-200"
                                            >
                                                {processing ? "กำลังเพิ่ม..." : "เพิ่มลงในตะกร้า"}
                                            </button>
                                            <Link
                                                href={`/products/${product.id}`}
                                                className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-200"
                                            >
                                                ดูรายละเอียด
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Homepage;
