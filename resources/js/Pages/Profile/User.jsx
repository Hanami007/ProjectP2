import React from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const User = ({ user }) => {
    const walletBalance = user.wallet_balance ? parseFloat(user.wallet_balance).toFixed(2) : '0.00';

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    User Profile
                </h2>
            }
        >
            <Head title="User Profile" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <div className="max-w-xl">

                            <h1 className="text-3xl font-semibold text-center mb-8">
                                ข้อมูลผู้ใช้
                            </h1>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <span className="font-medium text-gray-700 dark:text-gray-300">ชื่อ:</span>
                                    <span className="ml-2 text-gray-900 dark:text-gray-100">{user.Name}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="font-medium text-gray-700 dark:text-gray-300">อีเมล:</span>
                                    <span className="ml-2 text-gray-900 dark:text-gray-100">{user.Email}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="font-medium text-gray-700 dark:text-gray-300">เบอร์โทรศัพท์:</span>
                                    <span className="ml-2 text-gray-900 dark:text-gray-100">{user.Phone}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="font-medium text-gray-700 dark:text-gray-300">ที่อยู่:</span>
                                    <span className="ml-2 text-gray-900 dark:text-gray-100">{user.Address}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="font-medium text-gray-700 dark:text-gray-300">วันที่สมัครสมาชิก:</span>
                                    <span className="ml-2 text-gray-900 dark:text-gray-100">{new Date(user.created_at).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="font-medium text-gray-700 dark:text-gray-300">วันที่แก้ไขข้อมูลล่าสุด:</span>
                                    <span className="ml-2 text-gray-900 dark:text-gray-100">{new Date(user.updated_at).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default User;
