import React from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const User = ({ user }) => {
    const walletBalance = user.wallet_balance ? parseFloat(user.wallet_balance).toFixed(2) : '0.00';

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-200">
                    User Profile
                </h2>
            }
        >
            <Head title="User Profile" />

            <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 py-16">
                <div className="mx-auto max-w-7xl space-y-10 sm:px-6 lg:px-8">
                    {/* Profile Card */}
                    <div className="bg-white p-8 rounded-xl shadow-2xl dark:bg-gray-800 dark:shadow-2xl transition-transform transform hover:scale-105">
                        <div className="max-w-3xl mx-auto">
                            <h1 className="text-3xl font-extrabold text-center text-gray-900 dark:text-gray-100 mb-8">
                                ข้อมูลผู้ใช้
                            </h1>

                            {/* User Name */}
                            <div className="text-center mb-6">
                                <span className="text-4xl font-semibold text-gray-800 dark:text-gray-100">
                                    {user.Name}
                                </span>
                            </div>

                            {/* User Information Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                                {/* Email */}
                                <div className="bg-gray-100 p-6 rounded-lg dark:bg-gray-700 shadow-lg hover:shadow-2xl transition-shadow">
                                    <span className="block text-sm font-medium text-gray-600 dark:text-gray-400">อีเมล:</span>
                                    <span className="block text-lg font-semibold text-gray-800 dark:text-gray-100 mt-2">
                                        {user.Email}
                                    </span>
                                </div>

                                {/* Phone */}
                                <div className="bg-gray-100 p-6 rounded-lg dark:bg-gray-700 shadow-lg hover:shadow-2xl transition-shadow">
                                    <span className="block text-sm font-medium text-gray-600 dark:text-gray-400">เบอร์โทรศัพท์:</span>
                                    <span className="block text-lg font-semibold text-gray-800 dark:text-gray-100 mt-2">
                                        {user.Phone || 'ไม่ระบุ'}
                                    </span>
                                </div>

                                {/* Address */}
                                <div className="bg-gray-100 p-6 rounded-lg dark:bg-gray-700 shadow-lg hover:shadow-2xl transition-shadow">
                                    <span className="block text-sm font-medium text-gray-600 dark:text-gray-400">ที่อยู่:</span>
                                    <span className="block text-lg font-semibold text-gray-800 dark:text-gray-100 mt-2">
                                        {user.Address || 'ไม่ระบุที่อยู่'}
                                    </span>
                                </div>

                                {/* Registration Date */}
                                <div className="bg-gray-100 p-6 rounded-lg dark:bg-gray-700 shadow-lg hover:shadow-2xl transition-shadow">
                                    <span className="block text-sm font-medium text-gray-600 dark:text-gray-400">วันที่สมัครสมาชิก:</span>
                                    <span className="block text-lg font-semibold text-gray-800 dark:text-gray-100 mt-2">
                                        {new Date(user.created_at).toLocaleDateString('th-TH')}
                                    </span>
                                </div>

                                {/* Last Updated Date */}
                                <div className="bg-gray-100 p-6 rounded-lg dark:bg-gray-700 shadow-lg hover:shadow-2xl transition-shadow">
                                    <span className="block text-sm font-medium text-gray-600 dark:text-gray-400">วันที่แก้ไขข้อมูลล่าสุด:</span>
                                    <span className="block text-lg font-semibold text-gray-800 dark:text-gray-100 mt-2">
                                        {new Date(user.updated_at).toLocaleDateString('th-TH')}
                                    </span>
                                </div>

                                {/* Wallet Balance */}
                                <div className="bg-gray-100 p-6 rounded-lg dark:bg-gray-700 shadow-lg hover:shadow-2xl transition-shadow">
                                    <span className="block text-sm font-medium text-gray-600 dark:text-gray-400">ยอดเงินในกระเป๋า:</span>
                                    <span className="block text-lg font-semibold text-gray-800 dark:text-gray-100 mt-2">
                                        {walletBalance} บาท
                                    </span>
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
