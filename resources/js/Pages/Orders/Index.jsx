import React from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Orders = ({ orders }) => {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Orders
                </h2>
            }
        >
            <Head title="Orders" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <div className="max-w-xl">
                            <h1 className="text-3xl font-semibold text-center mb-8">
                                รายการสั่งซื้อ
                            </h1>
                            <div className="space-y-4">
                                {orders.map((order) => (
                                    <div key={order.id} className="flex flex-col space-y-4">
                                        <div className="flex items-center">
                                            <span className="font-medium text-gray-700 dark:text-gray-300">Order ID:</span>
                                            <span className="ml-2 text-gray-900 dark:text-gray-100">{order.id}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="font-medium text-gray-700 dark:text-gray-300">สถานะคำสั่งซื้อ:</span>
                                            <span className="ml-2 text-gray-900 dark:text-gray-100">{order.OrderStatus}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="font-medium text-gray-700 dark:text-gray-300">วันที่สั่งซื้อ:</span>
                                            <span className="ml-2 text-gray-900 dark:text-gray-100">{order.OrderDate}</span>
                                        </div>

                                        {/* แสดงข้อมูลผู้ส่ง */}
                                        <div className="mt-4">
                                            {order.delivery && (
                                                <>
                                                    <div className="flex items-center">
                                                        <span className="font-medium text-gray-700 dark:text-gray-300">ชื่อผู้ส่ง:</span>
                                                        <span className="ml-2 text-gray-900 dark:text-gray-100">{order.delivery.ShipperName}</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="font-medium text-gray-700 dark:text-gray-300">เบอร์โทรผู้ส่ง:</span>
                                                        <span className="ml-2 text-gray-900 dark:text-gray-100">{order.delivery.Phone}</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="font-medium text-gray-700 dark:text-gray-300">หมายเลขติดตาม:</span>
                                                        <span className="ml-2 text-gray-900 dark:text-gray-100">{order.delivery.TrackingNumber}</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="font-medium text-gray-700 dark:text-gray-300">สถานะการจัดส่ง:</span>
                                                        <span className="ml-2 text-gray-900 dark:text-gray-100">{order.delivery.DeliveryStatus}</span>
                                                    </div>
                                                </>
                                            )}
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

export default Orders;
