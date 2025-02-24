import React, { useState, useEffect } from "react";
import { Link, useForm } from "@inertiajs/inertia-react";
import axios from "axios";
import CartIcon from "../../Components/CartIcon";

const ProductDetail = ({ product, initialCartCount }) => {
    console.log(product); // Log the product data for debugging

    const price =
        typeof product.Price === "number"
            ? product.Price.toFixed(2)
            : parseFloat(product.Price).toFixed(2);
    const { post } = useForm();
    const [processing, setProcessing] = useState(false);
    const [cartCount, setCartCount] = useState(initialCartCount);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        axios.get(`/reviews/${product.id}`).then((response) => {
            setReviews(response.data);
        });
    }, [product.id]);

    const addToCart = async (productId) => {
        setProcessing(true);
        console.log("เพิ่มสินค้า ID:", productId);

        try {
            const response = await axios.post("/cart", {
                product_id: productId,
                quantity: 1,
            });

            alert("เพิ่มสินค้าลงตะกร้าเรียบร้อยแล้ว");
            setCartCount(cartCount + 1);
        } catch (error) {
            console.error("เกิดข้อผิดพลาด:", error);
            alert("เกิดข้อผิดพลาดในการเพิ่มสินค้า");
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-semibold text-gray-800">{product.ProductName}</h1>
                <CartIcon cartCount={cartCount} />
            </div>

            {/* Product Details Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Product Image */}
                <div className="bg-white shadow-lg rounded-lg p-4 flex justify-center">
                    <img
                        src={product.ProductImage ? `/storage/${product.ProductImage}` : "default_image_url.jpg"}
                        alt={product.ProductName}
                        className="w-full h-auto object-cover rounded-lg shadow-md"
                    />
                </div>

                {/* Product Info */}
                <div className="p-6 space-y-4 bg-white shadow-lg rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-800">{product.ProductName}</h3>
                    <p className="text-xl font-bold text-green-600">฿{price}</p>
                    <p className="text-gray-600">Stock: {product.Stock}</p>
                    <p className="text-gray-600">Category: {product.ProductType}</p>
                    <p className="text-gray-600">Status: {product.ProductStatus}</p>
                    <p className="text-gray-700">{product.ProductDescription}</p>

                    <button
                        onClick={() => addToCart(product.id)}
                        disabled={processing}
                        className="mt-4 inline-block w-full sm:w-auto bg-green-500 text-white py-3 px-6 rounded-md hover:bg-green-600 transition-all duration-300"
                    >
                        {processing ? "กำลังเพิ่ม..." : "เพิ่มลงในตะกร้า"}
                    </button>

                    <Link
                        href="/homepage"
                        className="mt-4 w-full block text-center bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 transition-all duration-300"
                    >
                        กลับสู่หน้าหลัก
                    </Link>
                </div>
            </div>

            {/* Store Information Section */}
            <div className="mt-10 bg-white shadow-lg rounded-lg p-6 text-center">
                <Link
                    href={route("stores.show", product.store.id)}
                    className="inline-block"
                >
                    <img
                        src={product.store.Picture ? `/storage/${product.store.Picture}` : "/images/default_image_url.jpg"}
                        alt={product.store.StoreName}
                        className="w-32 h-32 object-cover rounded-full mx-auto mb-6 border-4 border-gray-100 shadow-lg"
                    />
                </Link>
                <div className="mt-6">
                    <Link
                        href={route("stores.show", product.store.id)}
                        className="text-xl font-semibold text-blue-600 hover:underline"
                    >
                        {product.store.StoreName}
                    </Link>
                    <p className="text-gray-600 mt-2">
                        ⏰ เวลาเปิด-ปิด: {product.store.OpeningHours || "ไม่ระบุ"}
                    </p>
                    <p className="text-gray-600 mt-1">
                        ⭐ รีวิวร้านค้า: {product.store.Reviews || "ยังไม่มีรีวิว"}
                    </p>
                </div>

                {/* Email Contact */}
                <div className="mt-6">
                    <a
                        href={`mailto:${product.store.StoreEmail}`}
                        className="inline-block bg-gray-700 text-white py-2 px-6 rounded-full hover:bg-gray-800 transition duration-200"
                    >
                        ✉️ ส่งอีเมล
                    </a>
                </div>

                {/* Show More Products */}
                {product.store.Products && product.store.Products.length > 0 && (
                    <div className="mt-10">
                        <h3 className="text-lg font-semibold text-center mb-6">
                            🛒 สินค้าอื่น ๆ ของร้าน
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                            {product.store.Products.map((item, index) => (
                                <div key={index} className="bg-white shadow-lg rounded-lg p-4 text-center">
                                    <img
                                        src={item.ProductImage ? `/storage/${item.ProductImage}` : "default_image_url.jpg"}
                                        alt={item.ProductName}
                                        className="w-full h-48 object-cover rounded-lg shadow-md"
                                    />
                                    <p className="mt-4 text-gray-900 font-semibold">{item.ProductName}</p>
                                    <p className="text-green-600 font-bold">฿{item.Price}</p>
                                    <Link
                                        href={`/product/${item.id}`}
                                        className="mt-2 inline-block bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all duration-300"
                                    >
                                        ดูรายละเอียด
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetail;
