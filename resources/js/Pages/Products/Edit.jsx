import React from "react";
import { Head, useForm, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const EditProduct = ({ store, product }) => {
    const { data, setData, patch, processing } = useForm({
        ProductName: product.ProductName, // ปรับให้ตรงกับ Laravel
        Price: product.Price,
        ProductDescription: product.ProductDescription,
    });

    const handleEditProduct = (e) => {
        e.preventDefault();

        // ส่งข้อมูลไปยัง Laravel สำหรับการแก้ไขสินค้า
        patch(route("products.update", product.id), {
            data, // ใช้ data ตรงๆ ไม่ต้องห่อใน object อีกที
            onSuccess: () => router.visit(route("stores.show", store.id)), // ใช้ router.visit() แทน navigate
        });
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Edit Product</h2>}
        >
            <Head title="Edit Product" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <div className="max-w-xl">
                            <h1 className="text-3xl font-semibold text-center mb-8">แก้ไขสินค้า</h1>
                            <form onSubmit={handleEditProduct}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 dark:text-gray-300">ชื่อสินค้า</label>
                                    <input
                                        type="text"
                                        name="ProductName"
                                        value={data.ProductName}
                                        onChange={(e) => setData("ProductName", e.target.value)}
                                        className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-gray-300"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 dark:text-gray-300">ราคา</label>
                                    <input
                                        type="number"
                                        name="Price"
                                        value={data.Price}
                                        onChange={(e) => setData("Price", e.target.value)}
                                        className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-gray-300"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 dark:text-gray-300">รายละเอียด</label>
                                    <textarea
                                        name="ProductDescription"
                                        value={data.ProductDescription}
                                        onChange={(e) => setData("ProductDescription", e.target.value)}
                                        className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-gray-300"
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                                    disabled={processing}
                                >
                                    แก้ไขสินค้า
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default EditProduct;
