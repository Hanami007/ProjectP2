import React from "react";
import { useForm } from "@inertiajs/inertia-react";

const PaymentPage = ({ order }) => {
    const { data, setData, post, processing } = useForm({ receipt: null });

    const handleUploadReceipt = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData("receipt", file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/payment/${order.id}/confirm`, {
            onSuccess: () => {
                alert("อัปโหลดหลักฐานการโอนเงินเรียบร้อย ");
            },
        });
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">
                 ชำระเงินสำหรับคำสั่งซื้อ #{order.id}
            </h1>

            <p className="text-lg font-bold text-gray-700 text-center mb-4">
                ยอดรวม: <span className="text-green-600">฿{parseFloat(order.TotalAmount).toFixed(2)}</span>
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <label className="block text-gray-600 font-medium">
                     อัพโหลดหลักฐานการโอนเงิน:
                </label>

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleUploadReceipt}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                />

                <button
                    type="submit"
                    disabled={processing || !data.receipt}
                    className={`w-full py-3 text-white rounded-lg transition ${
                        processing || !data.receipt
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-green-500 hover:bg-green-600"
                    }`}
                >
                    {processing ? " กำลังอัพโหลด..." : " ยืนยันการชำระเงิน"}
                </button>
            </form>
        </div>
    );
};

export default PaymentPage;
