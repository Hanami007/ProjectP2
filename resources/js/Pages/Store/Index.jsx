import React from "react";
import { Link, Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Index({ stores }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    All Stores
                </h2>
            }
        >
            <Head title="All Stores" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h1 className="text-3xl font-semibold text-center mb-8">
                                รายการร้านค้า
                            </h1>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                                {stores.map((store) => (
                                    <div
                                        key={store.id}
                                        className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
                                    >
                                        {/* แสดงรูปภาพร้านค้า */}
                                        <img
                                            src={
                                                store.Picture
                                                    ? `/storage/${store.Picture}`
                                                    : "/images/default_image_url.jpg"  // ใช้ path ที่ถูกต้องสำหรับรูป default
                                            }
                                            alt={store.StoreName}  // เปลี่ยนจาก alt={store.Picture} เป็น alt={store.StoreName}
                                            className="w-32 h-32 object-cover rounded-full mx-auto"
                                        />
                                        <div className="p-4">
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                {store.StoreName}
                                            </h3>
                                            <Link
                                                href={route("stores.show", store.id)}
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
}
