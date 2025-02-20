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
        // Fetch reviews for the product
        axios.get(`/reviews/${product.id}`).then((response) => {
            setReviews(response.data);
        });
    }, [product.id]);

    const addToCart = async (productId) => {
        setProcessing(true);
        console.log("เพิ่มสินค้า ID:", productId);

        try {
            // เรียกใช้ method store ใน CartController
            const response = await axios.post("/cart", {
                product_id: productId,
                quantity: 1,
            });

            alert("เพิ่มสินค้าลงตะกร้าเรียบร้อยแล้ว");
            setCartCount(cartCount + 1); // เพิ่มจำนวนสินค้าในตะกร้า
        } catch (error) {
            console.error("เกิดข้อผิดพลาด:", error);
            alert("เกิดข้อผิดพลาดในการเพิ่มสินค้า");
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-semibold">
                    {product.ProductName}
                </h1>
                <CartIcon cartCount={cartCount} />
            </div>

            {/* Product Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Product Image */}
                <div className="bg-white shadow-lg rounded-lg p-4 flex justify-center">
                    <img
                        src={product.ProductImage || "default_image_url.jpg"}
                        alt={product.ProductName}
                    />
                </div>

                {/* Product Info */}
                <div className="p-4 space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                        {product.ProductName}
                    </h3>
                    <p className="text-xl font-bold text-green-600">฿{price}</p>
                    <p className="text-gray-600">Stock: {product.Stock}</p>
                    <p className="text-gray-600">
                        Category: {product.ProductType}
                    </p>
                    <p className="text-gray-600">
                        Status: {product.ProductStatus}
                    </p>
                    <p className="text-gray-600">
                        {product.ProductDescription}
                    </p>

                    <button
                        onClick={() => addToCart(product.id)}
                        disabled={processing}
                        className="mt-4 inline-block bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors duration-200"
                    >
                        {processing ? "กำลังเพิ่ม..." : "เพิ่มลงในตะกร้า"}
                    </button>

                    <Link
                        href="/homepage"
                        className="mt-4 w-full block text-center bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition duration-200"
                    >
                        กลับสู่หน้าหลัก
                    </Link>
                </div>
            </div>

            {/* Store Information */}
            <div className="mt-10 bg-white shadow-lg rounded-lg p-6">
                <img
                    src={product.store.Picture || "default_store_image.jpg"}
                    alt={product.store.StoreName}
                    className="w-32 h-32 mx-auto object-cover rounded-full border-4 border-gray-300"
                />
                {/* ข้อมูลเพิ่มเติมของร้านค้า */}
                <div className="mt-6 text-center">
                    <h3 className="text-xl font-semibold">
                        {product.store.StoreName}
                    </h3>
                    <p className="text-gray-600">
                        ⏰ เวลาเปิด-ปิด:{" "}
                        {product.store.OpeningHours || "ไม่ระบุ"}
                    </p>
                    <p className="text-gray-600">
                        ⭐ รีวิวร้านค้า:{" "}
                        {product.store.Reviews || "ยังไม่มีรีวิว"}
                    </p>
                </div>

                {/* ปุ่มติดต่อร้านค้า */}
                <div className="mt-4 flex justify-center space-x-4">
                    <a
                        href={`mailto:${product.store.StoreEmail}`}
                        className="bg-gray-700 text-white py-2 px-4 rounded-full hover:bg-gray-800 transition duration-200"
                    >
                        ✉️ ส่งอีเมล
                    </a>
                </div>

                {/* แสดงสินค้าของร้านเพิ่มเติม */}
                {product.store.Products &&
                    product.store.Products.length > 0 && (
                        <div className="mt-10">
                            <h3 className="text-lg font-semibold text-center mb-4">
                                🛒 สินค้าอื่น ๆ ของร้าน
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {product.store.Products.map((item, index) => (
                                    <div
                                        key={index}
                                        className="bg-white shadow-lg rounded-lg p-4 text-center"
                                    >
                                        <img
                                            src={
                                                item.ProductImage ||
                                                "default_product.jpg"
                                            }
                                            alt={item.ProductName}
                                            className="w-24 h-24 mx-auto object-cover rounded-full border-2 border-gray-300"
                                        />
                                        <p className="mt-2 text-gray-900 font-semibold">
                                            {item.ProductName}
                                        </p>
                                        <p className="text-green-600 font-bold">
                                            ฿{item.Price}
                                        </p>
                                        <Link
                                            href={`/product/${item.id}`}
                                            className="mt-2 inline-block bg-blue-500 text-white py-1 px-3 rounded-full hover:bg-blue-600 transition duration-200"
                                        >
                                            ดูรายละเอียด
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
            </div>

            {/* Product Thumbnails */}
            {product.ProductImages && product.ProductImages.length > 0 && (
                <div className="mt-6 flex justify-center gap-4">
                    {product.ProductImages.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={`product-thumbnail-${index}`}
                            className="w-20 h-20 object-cover rounded-full border-2 border-gray-300 cursor-pointer"
                        />
                    ))}
                </div>
            )}
            {/* ตารางรีวิวสินค้า */}
            <div className="mt-6 bg-white p-4 rounded-lg shadow">
                <h2 className="text-2xl font-semibold mb-4">รีวิวสินค้า</h2>

                {/* ถ้ามีรีวิว */}
                {reviews.length > 0 ? (
                    <div className="space-y-4">
                        {reviews.map((review) => (
                            <div key={review.id} className="border p-3 rounded">
                                <p className="font-semibold">
                                    {review.user.name}
                                </p>
                                <p className="text-yellow-500">
                                    ⭐ {review.rating} / 5
                                </p>
                                <p className="text-gray-600">
                                    {review.comment}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">
                        ยังไม่มีรีวิวสำหรับสินค้านี้
                    </p>
                )}
            </div>
        </div>
    );
};

export default ProductDetail;
