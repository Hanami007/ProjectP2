import { Link } from "@inertiajs/react";

export default function Show({ store, products }) {
    return (
        <div className="max-w-5xl mx-auto p-8 bg-white rounded-xl shadow-xl border border-gray-200">
            {/* Store Header Section */}
            <div className="flex flex-col items-center mb-8">
                <div className="relative">
                    <div className="absolute inset-0 bg-indigo-100 rounded-full blur-md opacity-70"></div>
                    <img
                        src={
                            store.Picture
                                ? `/storage/${store.Picture}`
                                : "/images/default_image_url.jpg"
                        }
                        alt={store.StoreName}
                        className="relative w-40 h-40 object-cover rounded-full border-4 border-indigo-500 shadow-lg"
                    />
                </div>
                <h1 className="text-4xl font-bold mt-6 text-indigo-700">
                    {store.StoreName}
                </h1>
                <div className="flex items-center mt-2 text-gray-600">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                    </svg>
                    <p>{store.Address}</p>
                </div>
                <div className="flex items-center mt-2">
                    <div className="flex items-center bg-yellow-50 px-4 py-1 rounded-full">
                        <span className="text-yellow-600 font-semibold mr-1">
                            {store.Rating}
                        </span>
                        <span className="text-yellow-400">★★★★★</span>
                    </div>
                    <span className={`ml-4 px-4 py-1 rounded-full text-sm font-medium ${
                        store.StoreStatus === 'เปิด'
                            ? 'bg-green-100 text-green-800 border border-green-300'
                            : 'bg-red-100 text-red-800 border border-red-300'
                    }`}>
                        {store.StoreStatus}
                    </span>
                </div>
            </div>

            {/* Products Section */}
            <div className="relative">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 inline-block border-b-2 border-indigo-400 pb-2">
                    รายการสินค้า
                </h2>
                <div className="absolute top-0 right-0">
                    <span className="text-sm text-gray-500">
                        จำนวนสินค้า: {products.length} รายการ
                    </span>
                </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <Link
                        key={product.id}
                        href={route("products.show", product.id)}
                        className="group"
                    >
                        <div className="h-full p-4 bg-white border border-gray-200 rounded-lg shadow-md group-hover:shadow-xl group-hover:border-indigo-200 transition-all duration-300 flex flex-col">
                            <div className="flex-1 flex flex-col items-center">
                                <div className="w-full h-48 overflow-hidden rounded-lg mb-4">
                                    <img
                                        src={
                                            product.ProductImage
                                                ? `/storage/${product.ProductImage}`
                                                : "/images/default_product.jpg"
                                        }
                                        alt={product.ProductName}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                </div>
                                <div className="w-full text-center">
                                    <h3 className="font-bold text-lg text-gray-800 group-hover:text-indigo-600 transition-colors">
                                        {product.ProductName}
                                    </h3>
                                    <p className="text-indigo-600 font-bold mt-2 text-xl">
                                        ฿{product.Price.toLocaleString()}
                                    </p>
                                    <div className="flex justify-between mt-2 text-sm">
                                        <span className="text-gray-600">
                                            คงเหลือ: <span className={`font-medium ${product.Stock > 10 ? 'text-green-600' : 'text-orange-600'}`}>{product.Stock}</span>
                                        </span>
                                        <span className="bg-gray-100 px-2 py-1 rounded text-gray-600">
                                            {product.ProductType}
                                        </span>
                                    </div>
                                    <p className="text-gray-500 text-sm line-clamp-2 mt-3 text-left">
                                        {product.Description}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-4 w-full">
                                <div className="text-center py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                    ดูรายละเอียด →
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Back Button */}
            <div className="mt-10 text-center">
                <Link
                    href={route("homepage.index")}
                    className="inline-flex items-center px-6 py-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-medium rounded-full transition-colors"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                    </svg>
                    กลับสู่หน้าแรก
                </Link>
            </div>
        </div>
    );
}
