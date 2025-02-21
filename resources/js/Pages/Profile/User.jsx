import React from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const User = ({ user }) => {
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
                                    <span className="ml-2 text-gray-900 dark:text-gray-100">{user.name}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="font-medium text-gray-700 dark:text-gray-300">อีเมล:</span>
                                    <span className="ml-2 text-gray-900 dark:text-gray-100">{user.email}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="font-medium text-gray-700 dark:text-gray-300">เบอร์โทรศัพท์:</span>
                                    <span className="ml-2 text-gray-900 dark:text-gray-100">{user.phone}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="font-medium text-gray-700 dark:text-gray-300">ที่อยู่:</span>
                                    <span className="ml-2 text-gray-900 dark:text-gray-100">{user.address}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <div className="max-w-xl">
                            <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                                Update Password
                            </h2>
                            {/* Add your UpdatePasswordForm component here */}
                        </div>
                    </div>

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <div className="max-w-xl">
                            <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                                Delete Account
                            </h2>
                            {/* Add your DeleteUserForm component here */}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default User;
