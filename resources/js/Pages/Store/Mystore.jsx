import React, { useState } from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import { Store, Package, Phone, MapPin, Edit2, Trash2, Plus, AlertCircle } from "lucide-react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const Mystore = ({ store, products }) => {
    const { delete: destroy, processing } = useForm();
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const handleDelete = () => {
        setShowDeleteConfirm(false);
        destroy(route("stores.destroy", store.id));
    };

    const StoreStats = () => (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500 dark:text-gray-400">สินค้าทั้งหมด</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{products?.length || 0}</p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500 dark:text-gray-400">ยอดขายวันนี้</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">฿0</p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500 dark:text-gray-400">คำสั่งซื้อที่รอ</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">0</p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500 dark:text-gray-400">รีวิวร้านค้า</p>
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">0</p>
            </div>
        </div>
    );

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-center space-x-2">
                    <Store className="w-6 h-6" />
                    <h2 className="text-2xl font-bold">My Store</h2>
                </div>
            }
        >
            <Head title="My Store" />

            <div className="py-6 px-4 sm:px-6">
                <div className="max-w-6xl mx-auto space-y-6">
                    {store ? (
                        <>
                            {/* Store Profile Card */}
                            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
                                <div className="relative h-32 bg-gradient-to-r from-blue-500 to-purple-600">
                                    <div className="absolute -bottom-16 left-6">
                                        <img
                                            src={store.Picture ? `/storage/${store.Picture}` : "/images/default_image.jpg"}
                                            alt={store.StoreName}
                                            className="w-32 h-32 object-cover rounded-xl border-4 border-white dark:border-gray-800 shadow-lg"
                                        />
                                    </div>
                                </div>

                                <div className="pt-20 px-6 pb-6">
                                    <div className="flex flex-wrap items-center justify-between gap-4">
                                        <div>
                                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                                {store.StoreName}
                                            </h1>
                                            <p className="text-gray-500 dark:text-gray-400">
                                                เจ้าของ: {store.ownerName}
                                            </p>
                                        </div>
                                        <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                                            store.StoreStatus === 'เปิด'
                                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                        }`}>
                                            {store.StoreStatus}
                                        </span>
                                    </div>

                                    <div className="mt-6 space-y-2">
                                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                                            <Phone className="w-5 h-5 mr-2" />
                                            <span>{store.PhoneNumber}</span>
                                        </div>
                                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                                            <MapPin className="w-5 h-5 mr-2" />
                                            <span>{store.Address}</span>
                                        </div>
                                    </div>

                                    <div className="mt-6 flex flex-wrap gap-3">
                                        <button
                                            onClick={() => setShowDeleteConfirm(true)}
                                            className="flex items-center px-4 py-2 text-red-600 bg-red-50 hover:bg-red-100
                                                     dark:bg-red-900/20 dark:hover:bg-red-900/40 dark:text-red-400
                                                     rounded-lg transition-colors"
                                            disabled={processing}
                                        >
                                            <Trash2 className="w-4 h-4 mr-2" />
                                            ลบร้านค้า
                                        </button>
                                        <Link
                                            href={route("products.create")}
                                            className="flex items-center px-4 py-2 text-white bg-blue-600 hover:bg-blue-700
                                                     dark:bg-blue-600 dark:hover:bg-blue-700 rounded-lg transition-colors"
                                        >
                                            <Plus className="w-4 h-4 mr-2" />
                                            เพิ่มสินค้า
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Store Stats */}
                            <StoreStats />

                            {/* Products Grid */}
                            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6">
                                <h2 className="text-xl font-semibold mb-6 flex items-center text-gray-900 dark:text-white">
                                    <Package className="w-5 h-5 mr-2" />
                                    รายการสินค้า
                                </h2>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {products && products.length > 0 ? (
                                        products.map((product) => (
                                            <div
                                                key={product.id}
                                                className="group bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
                                            >
                                                <div className="relative aspect-square">
                                                    <img
                                                        src={product.ProductImage ? `/storage/${product.ProductImage}` : "/images/default_product.jpg"}
                                                        alt={product.ProductName}
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-2">
                                                            <Link
                                                                href={route("products.edit", product.id)}
                                                                className="flex-1 flex items-center justify-center px-3 py-2 bg-white/90 rounded-lg text-gray-700 hover:bg-white transition-colors"
                                                            >
                                                                <Edit2 className="w-4 h-4 mr-1" />
                                                                แก้ไข
                                                            </Link>
                                                            <button
                                                                onClick={() => destroy(route("products.destroy", product.id))}
                                                                className="flex-1 flex items-center justify-center px-3 py-2 bg-red-500/90 rounded-lg text-white hover:bg-red-500 transition-colors"
                                                            >
                                                                <Trash2 className="w-4 h-4 mr-1" />
                                                                ลบ
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="p-4">
                                                    <h3 className="font-semibold text-gray-900 dark:text-white">
                                                        {product.ProductName}
                                                    </h3>
                                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                                                        {product.ProductDescription}
                                                    </p>
                                                    <p className="mt-2 text-lg font-bold text-blue-600 dark:text-blue-400">
                                                        ฿{product.Price}
                                                    </p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="col-span-full flex flex-col items-center justify-center p-8 text-gray-500 dark:text-gray-400">
                                            <AlertCircle className="w-12 h-12 mb-2" />
                                            <p>ไม่มีสินค้าในร้านนี้</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-12 text-center">
                            <Store className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
                            <p className="text-xl text-gray-500 dark:text-gray-400">
                                คุณยังไม่มีร้านค้า
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-sm w-full">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            ยืนยันการลบร้านค้า
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            คุณแน่ใจหรือไม่ว่าต้องการลบร้านค้านี้? การดำเนินการนี้ไม่สามารถยกเลิกได้
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 rounded-lg transition-colors"
                            >
                                ยกเลิก
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors"
                            >
                                ลบร้านค้า
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
};

export default Mystore;
