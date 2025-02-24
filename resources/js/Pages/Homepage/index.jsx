import React, { useState, useEffect } from "react";
import { Link, Head } from "@inertiajs/react";
import { Search, ShoppingCart, Eye } from "lucide-react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import FloatingCart from "@/components/FloatingCart";

const ProductCard = ({ product, onAddToCart }) => (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-[1.02] overflow-hidden">
        <div className="relative group">
            <img
                src={product.ProductImage ? `/storage/${product.ProductImage}` : "default_image_url.jpg"}
                alt={product.ProductName}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
        </div>
        <div className="p-5">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.ProductName}</h3>
            <p className="text-blue-600 font-bold text-2xl mb-4">
                ฿{typeof product.Price === "number" ? product.Price.toFixed(2) : product.Price}
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
                <button
                    onClick={() => onAddToCart(product.id)}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center justify-center gap-2"
                >
                    <ShoppingCart size={18} />
                    <span>Add to Cart</span>
                </button>
                <Link
                    href={`/products/${product.id}`}
                    className="flex-1 bg-blue-50 text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-100 transition-all duration-200 flex items-center justify-center gap-2"
                >
                    <Eye size={18} />
                    <span>Details</span>
                </Link>
            </div>
        </div>
    </div>
);

const FeaturedProduct = ({ product, onAddToCart }) => (
    <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-2xl">
        <div className="flex flex-col md:flex-row items-center gap-8">
            <img
                src={product.ProductImage ? `/storage/${product.ProductImage}` : "default_image_url.jpg"}
                alt={product.ProductName}
                className="w-64 h-64 object-cover rounded-2xl shadow-lg"
            />
            <div className="flex-1 text-center md:text-left">
                <h2 className="text-4xl font-bold mb-4">{product.ProductName}</h2>
                <p className="text-blue-100 mb-2">Featured Product</p>
                <p className="text-3xl font-bold mb-6">
                    ฿{typeof product.Price === "number" ? product.Price.toFixed(2) : product.Price}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={() => onAddToCart(product.id)}
                        className="bg-white text-blue-600 py-2 px-6 rounded-lg hover:bg-blue-50 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                        <ShoppingCart size={18} />
                        <span>Add to Cart</span>
                    </button>
                    <Link
                        href={`/products/${product.id}`}
                        className="bg-blue-700 text-white py-2 px-6 rounded-lg hover:bg-blue-800 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                        <Eye size={18} />
                        <span>View Details</span>
                    </Link>
                </div>
            </div>
        </div>
    </div>
);

const Homepage = ({ products }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [currentProductIndex, setCurrentProductIndex] = useState(0);

    useEffect(() => {
        let filtered = products;
        if (searchTerm) {
            filtered = filtered.filter(
                (product) =>
                    product.ProductName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.ProductType.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        setFilteredProducts(filtered);
    }, [searchTerm, products]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentProductIndex((prevIndex) =>
                prevIndex + 1 >= filteredProducts.length ? 0 : prevIndex + 1
            );
        }, 5000);
        return () => clearInterval(interval);
    }, [filteredProducts]);

    const addToCart = async (productId) => {
        try {
            await axios.post("/cart", { product_id: productId, quantity: 1 });
            alert("เพิ่มสินค้าลงตะกร้าเรียบร้อยแล้ว");
        } catch (error) {
            console.error("เกิดข้อผิดพลาด:", error);
            alert("เกิดข้อผิดพลาดในการเพิ่มสินค้า");
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Online Shop" />
            <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Header & Search */}
                    <div className="mb-8">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                            <h1 className="text-4xl font-bold text-gray-900">
                                Online <span className="text-blue-600">Shop</span>
                            </h1>
                            <div className="relative w-full md:w-96">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Featured Product */}
                    {filteredProducts[currentProductIndex] && (
                        <div className="mb-12">
                            <FeaturedProduct
                                product={filteredProducts[currentProductIndex]}
                                onAddToCart={addToCart}
                            />
                        </div>
                    )}

                    {/* Product Grid */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">All Products</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onAddToCart={addToCart}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <FloatingCart />
        </AuthenticatedLayout>
    );
};

export default Homepage;
