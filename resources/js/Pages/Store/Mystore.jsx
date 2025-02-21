import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Mystore = ({ store, products }) => {
    const { delete: destroy, post, patch, processing } = useForm();
    const [editingProduct, setEditingProduct] = useState(null);

    const handleDelete = () => {
        if (confirm('คุณแน่ใจหรือไม่ว่าต้องการลบร้านค้านี้?')) {
            destroy(route('stores.destroy', store.id));
        }
    };

    const handleAddProduct = (e) => {
        e.preventDefault();
        post(route('products.store'), {
            data: {
                name: e.target.name.value,
                price: e.target.price.value,
                description: e.target.description.value,
                id_stores: store.id,
            },
        });
    };

    const handleEditProduct = (e) => {
        e.preventDefault();
        patch(route('products.update', editingProduct.id), {
            data: {
                name: e.target.name.value,
                price: e.target.price.value,
                description: e.target.description.value,
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
                                        <span className="font-medium text-gray-700 dark:text-gray-300">ชื่อร้านค้า:</span>
                                        <span className="ml-2 text-gray-900 dark:text-gray-100">{store.StoreName}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="font-medium text-gray-700 dark:text-gray-300">เจ้าของร้าน:</span>
                                        <span className="ml-2 text-gray-900 dark:text-gray-100">{store.ownerName}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="font-medium text-gray-700 dark:text-gray-300">เบอร์โทรศัพท์:</span>
                                        <span className="ml-2 text-gray-900 dark:text-gray-100">{store.PhoneNumber}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="font-medium text-gray-700 dark:text-gray-300">ที่อยู่:</span>
                                        <span className="ml-2 text-gray-900 dark:text-gray-100">{store.Address}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="font-medium text-gray-700 dark:text-gray-300">สถานะร้านค้า:</span>
                                        <span className="ml-2 text-gray-900 dark:text-gray-100">{store.StoreStatus}</span>
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
                                        <h2 className="text-2xl font-semibold text-center mb-4">เพิ่มสินค้า</h2>
                                        <form onSubmit={handleAddProduct}>
                                            <div className="mb-4">
                                                <label className="block text-gray-700 dark:text-gray-300">ชื่อสินค้า</label>
                                                <input type="text" name="name" className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-gray-300" required />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-gray-700 dark:text-gray-300">ราคา</label>
                                                <input type="number" name="price" className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-gray-300" required />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-gray-700 dark:text-gray-300">รายละเอียด</label>
                                                <textarea name="description" className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-gray-300"></textarea>
                                            </div>
                                            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700" disabled={processing}>
                                                เพิ่มสินค้า
                                            </button>
                                        </form>
                                    </div>
                                    <div className="mt-6">
                                        <h2 className="text-2xl font-semibold text-center mb-4">สินค้าของฉัน</h2>
                                        {products && products.length > 0 ? (
                                            products.map((product) => (
                                                <div key={product.id} className="mb-4">
                                                    <div className="flex justify-between items-center">
                                                        <div>
                                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{product.name}</h3>
                                                            <p className="text-gray-700 dark:text-gray-300">{product.description}</p>
                                                            <p className="text-gray-700 dark:text-gray-300">ราคา: {product.price}</p>
                                                        </div>
                                                        <div>
                                                            <button
                                                                onClick={() => setEditingProduct(product)}
                                                                className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 focus:outline-none focus:bg-yellow-700 mr-2"
                                                            >
                                                                แก้ไข
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-center text-gray-500 dark:text-gray-400">ไม่มีสินค้า</p>
                                        )}
                                    </div>
                                    {editingProduct && (
                                        <div className="mt-6">
                                            <h2 className="text-2xl font-semibold text-center mb-4">แก้ไขสินค้า</h2>
                                            <form onSubmit={handleEditProduct}>
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 dark:text-gray-300">ชื่อสินค้า</label>
                                                    <input type="text" name="name" defaultValue={editingProduct.name} className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-gray-300" required />
                                                </div>
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 dark:text-gray-300">ราคา</label>
                                                    <input type="number" name="price" defaultValue={editingProduct.price} className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-gray-300" required />
                                                </div>
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 dark:text-gray-300">รายละเอียด</label>
                                                    <textarea name="description" defaultValue={editingProduct.description} className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-gray-300"></textarea>
                                                </div>
                                                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700" disabled={processing}>
                                                    บันทึกการแก้ไข
                                                </button>
                                            </form>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <p className="text-center text-gray-500 dark:text-gray-400">คุณยังไม่มีร้านค้า</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Mystore;
