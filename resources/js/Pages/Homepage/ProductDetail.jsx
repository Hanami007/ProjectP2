import React, { useState } from "react";
import { Link } from "@inertiajs/inertia-react";
import { ShoppingCart, Clock, Star, ArrowLeft, Share2, Heart } from "lucide-react";

const ProductDetail = ({ product, initialCartCount }) => {
  const [processing, setProcessing] = useState(false);
  const [cartCount, setCartCount] = useState(initialCartCount);
  const [isWishlist, setIsWishlist] = useState(false);

  const price = Number(product.Price).toFixed(2);

  const addToCart = (productId) => {
    setProcessing(true);
    setTimeout(() => {
      alert("เพิ่มสินค้าลงตะกร้าเรียบร้อยแล้ว");
      setCartCount(cartCount + 1);
      setProcessing(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/homepage" className="flex items-center text-gray-700 hover:text-gray-900">
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="hidden sm:inline">กลับสู่หน้าหลัก</span>
          </Link>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Share2 className="w-5 h-5 text-gray-600" />
            </button>
            <Link href="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-600" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold rounded-full px-2">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Product Gallery and Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="relative">
            <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-lg">
              <img
                src={product.ProductImage ? `/storage/${product.ProductImage}` : "/images/default.jpg"}
                alt={product.ProductName}
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={() => setIsWishlist(!isWishlist)}
              className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md"
            >
              <Heart
                className={`w-6 h-6 ${isWishlist ? "fill-red-500 text-red-500" : "text-gray-400"}`}
              />
            </button>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.ProductName}</h1>
              <div className="flex items-center space-x-2">
                <span className="text-3xl font-bold text-green-600">฿{price}</span>
                {product.Stock < 10 && (
                  <span className="text-sm text-red-500">เหลือสินค้าเพียง {product.Stock} ชิ้น</span>
                )}
              </div>
            </div>

            <div className="space-y-4 bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center space-x-2">
                <div className="w-24 text-gray-500">หมวดหมู่</div>
                <div className="font-medium">{product.ProductType}</div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-24 text-gray-500">สถานะ</div>
                <div className="font-medium">{product.ProductStatus}</div>
              </div>
              <div className="border-t pt-4">
                <p className="text-gray-700 leading-relaxed">{product.ProductDescription}</p>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => addToCart(product.id)}
                disabled={processing}
                className="w-full bg-green-500 text-white py-4 px-6 rounded-xl font-semibold hover:bg-green-600
                         transition-all duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed
                         flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>{processing ? "กำลังเพิ่ม..." : "เพิ่มลงในตะกร้า"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Store Info Card */}
        <div className="mt-12 bg-white rounded-2xl shadow-sm p-6">
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link href={route("stores.show", product.store.id)}>
              <img
                src={product.store.Picture ? `/storage/${product.store.Picture}` : "/images/default_store.jpg"}
                alt={product.store.StoreName}
                className="w-24 h-24 object-cover rounded-full border-4 border-gray-50 shadow-sm"
              />
            </Link>
            <div className="flex-1 text-center sm:text-left">
              <Link
                href={route("stores.show", product.store.id)}
                className="text-xl font-semibold text-gray-900 hover:text-blue-600"
              >
                {product.store.StoreName}
              </Link>
              <div className="mt-2 space-y-1 text-sm text-gray-600">
                <div className="flex items-center justify-center sm:justify-start">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>เวลาเปิด-ปิด: {product.store.OpeningHours || "ไม่ระบุ"}</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start">
                  <Star className="w-4 h-4 mr-2" />
                  <span>รีวิวร้านค้า: {product.store.Reviews || "ยังไม่มีรีวิว"}</span>
                </div>
              </div>
            </div>
            <Link
              href={route("stores.show", product.store.id)}
              className="px-6 py-2 border-2 border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50
                       transition-colors duration-200 whitespace-nowrap"
            >
              ดูร้านค้า
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
