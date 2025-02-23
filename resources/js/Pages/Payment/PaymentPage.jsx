import React from "react";
import { Inertia } from "@inertiajs/inertia";
import { useForm } from "@inertiajs/inertia-react";

const PaymentPage = ({ order }) => {
    const { data, setData, post, processing } = useForm({
        receipt: null,
    });

    const handleUploadReceipt = (e) => {
        setData("receipt", e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/payment/${order.id}/confirm`, {
            onSuccess: () => {
                // Redirect ไปยังหน้าสถานะคำสั่งซื้อ
            },
        });
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-semibold mb-6">ชำระเงินสำหรับคำสั่งซื้อ #{order.id}</h1>
            <p>ยอดรวม: ฿{parseFloat(order['TotalAmount']).toFixed(2)}</p>            <form onSubmit={handleSubmit} className="mt-4">
                <label className="block mb-2">อัพโหลดหลักฐานการโอนเงิน:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleUploadReceipt}
                    className="border p-2 rounded"
                />
                <button
                    type="submit"
                    disabled={processing || !data.receipt}
                    className="mt-4 bg-green-500 text-white py-2 px-6 rounded-full hover:bg-green-600 disabled:bg-gray-400"
                >
                    {processing ? "กำลังอัพโหลด..." : "ยืนยันการชำระเงิน"}
                </button>
            </form>
        </div>
    );
};

export default PaymentPage;
