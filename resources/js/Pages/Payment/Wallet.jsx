import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Wallet = ({ user }) => {
    const [amount, setAmount] = useState('');
    const [processing, setProcessing] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);

        Inertia.post('/wallet/topup', { amount }, {
            onFinish: () => setProcessing(false),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    เติมเงินใน Wallet
                </h2>
            }
        >
            <Head title="เติมเงินใน Wallet" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <div className="max-w-xl">
                            <h1 className="text-3xl font-semibold text-center mb-8">
                                เติมเงินใน Wallet
                            </h1>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        จำนวนเงิน
                                    </label>
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                                        required
                                    />
                                </div>
                                <div className="text-right">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-block bg-green-500 text-white py-2 px-6 rounded-full hover:bg-green-600 disabled:bg-gray-400"
                                    >
                                        {processing ? 'กำลังดำเนินการ...' : 'เติมเงิน'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Wallet;
