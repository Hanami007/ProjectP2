import React, { useState, useEffect } from "react";
import { Link, Head } from "@inertiajs/react";
import axios from "axios";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import FloatingCart from "@/components/FloatingCart";

const Homepage = ({ products }) => {
    const [searchTerm, setSearchTerm] = useState(""); // เก็บคำค้นหา
    const [filteredProducts, setFilteredProducts] = useState(products);

    // ฟังก์ชันกรองสินค้าตามคำค้นหา
    useEffect(() => {
        let filtered = products;

        // ค้นหาจากชื่อสินค้าและประเภทสินค้า
        if (searchTerm) {
            filtered = filtered.filter(
                (product) =>
                    product.ProductName.toLowerCase().includes(
                        searchTerm.toLowerCase()
                    ) ||
                    product.ProductType.toLowerCase().includes(
                        searchTerm.toLowerCase()
                    )
            );
        }

        setFilteredProducts(filtered);
    }, [searchTerm, products]);

    const addToCart = async (productId) => {
        console.log("เพิ่มสินค้า ID:", productId);
        try {
            await axios.post("/cart", { product_id: productId, quantity: 1 });
            alert("เพิ่มสินค้าลงตะกร้าเรียบร้อยแล้ว");
        } catch (error) {
            console.error("เกิดข้อผิดพลาด:", error);
            alert("เกิดข้อผิดพลาดในการเพิ่มสินค้า");
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
                                    <Link href="/" className="text-black">
                                        Online Shop
                                    </Link>
                                </div>
                            </header>

                            {/* ฟังก์ชันค้นหา */}
                            <div className="mb-6">
                                <input
                                    type="text"
                                    placeholder="ค้นหาสินค้า..."
                                    className="w-full px-4 py-2 border rounded-md"
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                />
                            </div>

                            <h1 className="text-3xl font-semibold text-center mb-8">
                                รายการสินค้า
                            </h1>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                                {filteredProducts.map((product) => (
                                    <div
                                        key={product.id}
                                        className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
                                    >
                                        <img
                                            src={
                                                product.ProductImage
                                                    ? `/storage/${product.ProductImage}`
                                                    : "default_image_url.jpg"
                                            }
                                            alt={product.ProductName}
                                            className="w-32 h-32 object-cover rounded-full mx-auto"
                                        />
                                        <div className="p-4">
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                {product.ProductName}
                                            </h3>
                                            <p className="text-gray-600">
                                                ฿
                                                {typeof product.Price ===
                                                "number"
                                                    ? product.Price.toFixed(2)
                                                    : product.Price}
                                            </p>
                                            <button
                                                onClick={() =>
                                                    addToCart(product.id)
                                                }
                                                className="mt-4 inline-block bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors duration-200"
                                            >
                                                เพิ่มลงในตะกร้า
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
            <FloatingCart />
        </AuthenticatedLayout>
    );
};

export default Homepage;
