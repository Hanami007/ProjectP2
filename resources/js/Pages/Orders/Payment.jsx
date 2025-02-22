import React from 'react';
import { Head } from '@inertiajs/inertia-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Payment = ({ order }) => {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    ชำระเงิน
                </h2>
            }
        >
            <Head title="ชำระเงิน" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <div className="max-w-xl">
                            <h1 className="text-3xl font-semibold text-center mb-8">
                                ชำระเงินสำหรับ Order #{order.id}
                            </h1>
                            <p className="text-lg text-center mb-4">
                                ยอดรวม: ฿{parseFloat(order.total_amount).toFixed(2)}
                            </p>
                            <p className="text-lg text-center mb-4">
                                วิธีการชำระเงิน: {order.payment_method === 'wallet' ? 'M1D3 Wallet' : 'ชำระเงินปลายทาง'}
                            </p>
                            {/* เพิ่มฟอร์มหรือปุ่มสำหรับการชำระเงินตามวิธีการชำระเงินที่เลือก */}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Payment;
