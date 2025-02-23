import React, { useState } from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const Mystore = ({ store, products }) => {
    const { delete: destroy, post, patch, processing } = useForm();
    const [editingProduct, setEditingProduct] = useState(null);

    const handleDelete = () => {
        if (confirm("คุณแน่ใจหรือไม่ว่าต้องการลบร้านค้านี้?")) {
            destroy(route("stores.destroy", store.id));
        }
    };

    const handleAddProduct = (e) => {
        e.preventDefault();
        post(route("products.store"), {
            data: {
                ProductName: e.target.ProductName.value,
                Price: e.target.Price.value,
                ProductDescription: e.target.ProductDescription.value,
                id_stores: store.id,
            },
        });
    };

    const handleEditProduct = (e) => {
        e.preventDefault();
        patch(route("products.update", editingProduct.id), {
            data: {
                ProductName: e.target.elements.ProductName.value,
                Price: e.target.elements.Price.value,
                ProductDescription: e.target.elements.ProductDescription.value,
            },
        });
        setEditingProduct(null);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    My Store
                </h2>
            }
        >
            <Head title="My Store" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <div className="max-w-xl">
                            <h1 className="text-3xl font-semibold text-center mb-8">
                                ข้อมูลร้านค้าของฉัน
                            </h1>
                            {store ? (
                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <img
                                            src={
                                                store.Picture
                                                    ? `/storage/${store.Picture}`
                                                    : "/images/default_image_url.jpg" // ใช้ path ที่ถูกต้องสำหรับรูป default
                                            }
                                            alt={store.StoreName} // เปลี่ยนจาก alt={store.Picture} เป็น alt={store.StoreName}
                                            className="w-32 h-32 object-cover rounded-full mx-auto"
                                        />
                                    </div>
                                    <div className="flex items-center">
                                        <span className="font-medium text-gray-700 dark:text-gray-300">
                                            ชื่อร้านค้า:
                                        </span>
                                        <span className="ml-2 text-gray-900 dark:text-gray-100">
                                            {store.StoreName}
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="font-medium text-gray-700 dark:text-gray-300">
                                            เจ้าของร้าน:
                                        </span>
                                        <span className="ml-2 text-gray-900 dark:text-gray-100">
                                            {store.ownerName}
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="font-medium text-gray-700 dark:text-gray-300">
                                            เบอร์โทรศัพท์:
                                        </span>
                                        <span className="ml-2 text-gray-900 dark:text-gray-100">
                                            {store.PhoneNumber}
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="font-medium text-gray-700 dark:text-gray-300">
                                            ที่อยู่:
                                        </span>
                                        <span className="ml-2 text-gray-900 dark:text-gray-100">
                                            {store.Address}
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="font-medium text-gray-700 dark:text-gray-300">
                                            สถานะร้านค้า:
                                        </span>
                                        <span className="ml-2 text-gray-900 dark:text-gray-100">
                                            {store.StoreStatus}
                                        </span>
                                    </div>
                                    <div className="mt-6">
                                        <button
                                            onClick={handleDelete}
                                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700"
                                            disabled={processing}
                                        >
                                            ลบร้านค้า
                                        </button>
                                    </div>
                                    <div className="mt-6">
                                        <Link
                                            href={route("products.create")}
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            เพิ่มสินค้า
                                        </Link>
                                    </div>
                                    <div className="mt-6">
                                        <h2 className="text-xl font-semibold mb-4">
                                            Products:
                                        </h2>
                                        <div className="flex flex-wrap gap-4 justify-center">
                                            {products && products.length > 0 ? (
                                                products.map((product) => (
                                                    <div
                                                        key={product.id}
                                                        className="p-4 border border-gray-300 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center w-64"
                                                    >
                                                        <img
                                                            src={
                                                                product.ProductImage
                                                                    ? `/storage/${product.ProductImage}`
                                                                    : "default_image_url.jpg"
                                                            }
                                                            alt={
                                                                product.ProductName
                                                            }
                                                            className="w-32 h-32 object-cover rounded-full mx-auto"
                                                        />
                                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                                            {
                                                                product.ProductName
                                                            }
                                                        </h3>
                                                        <p className="text-gray-700 dark:text-gray-300">
                                                            {
                                                                product.ProductDescription
                                                            }
                                                        </p>
                                                        <p className="text-gray-700 dark:text-gray-300">
                                                            ราคา:{" "}
                                                            {product.Price}
                                                        </p>
                                                        <div className="mt-2 flex space-x-2">
                                                            <Link
                                                                href={route(
                                                                    "products.edit",
                                                                    product.id
                                                                )}
                                                                className="bg-blue-500 text-white py-1 px-3 rounded-full hover:bg-blue-600 transition duration-200"
                                                            >
                                                                แก้ไข
                                                            </Link>

                                                            <button
                                                                onClick={() =>
                                                                    destroy(
                                                                        route(
                                                                            "products.destroy",
                                                                            product.id
                                                                        )
                                                                    )
                                                                }
                                                                className="bg-red-500 text-white py-1 px-3 rounded-full hover:bg-red-600 transition duration-200"
                                                            >
                                                                ลบ
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-center text-gray-500">
                                                    ไม่มีสินค้าในร้านนี้
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    {editingProduct && (
                                        <div className="mt-6">
                                            <h2 className="text-2xl font-semibold text-center mb-4">
                                                แก้ไขสินค้า
                                            </h2>
                                            <form onSubmit={handleEditProduct}>
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 dark:text-gray-300">
                                                        ชื่อสินค้า
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="ProductName"
                                                        defaultValue={
                                                            editingProduct.ProductName
                                                        }
                                                        className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-gray-300"
                                                        required
                                                    />
                                                </div>
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 dark:text-gray-300">
                                                        ราคา
                                                    </label>
                                                    <input
                                                        type="number"
                                                        name="Price"
                                                        defaultValue={
                                                            editingProduct.Price
                                                        }
                                                        className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-gray-300"
                                                        required
                                                    />
                                                </div>
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 dark:text-gray-300">
                                                        รายละเอียด
                                                    </label>
                                                    <textarea
                                                        name="ProductDescription"
                                                        defaultValue={
                                                            editingProduct.ProductDescription
                                                        }
                                                        className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-gray-300"
                                                    ></textarea>
                                                </div>
                                                <button
                                                    type="submit"
                                                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700"
                                                    disabled={processing}
                                                >
                                                    บันทึกการแก้ไข
                                                </button>
                                            </form>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <p className="text-center text-gray-500 dark:text-gray-400">
                                    คุณยังไม่มีร้านค้า
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Mystore;
