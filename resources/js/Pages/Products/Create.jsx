import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Create({ auth, store }) {
    const { data, setData, post, processing, errors } = useForm({
        id_stores: store.id, // ตั้งค่า ID ร้านค้าโดยอัตโนมัติ
        ProductName: '',
        Price: '',
        Stock: '',
        ProductType: '',
        ProductStatus: '',
        ProductDescription: '',
        ProductImage: null,
    });

    const [previewImage, setPreviewImage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('products.store'));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData('ProductImage', file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewImage(null);
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create New Product</h2>}
        >
            <Head title="Create Product" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Store Information */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        ร้านค้า: {store.StoreName} {/* แสดงชื่อร้านค้า */}
                                    </label>
                                    <input type="hidden" name="id_stores" value={store.id} />
                                </div>

                                {/* Product Name */}
                                <div>
                                    <label htmlFor="ProductName" className="block text-sm font-medium text-gray-700">
                                        ชื่อสินค้า
                                    </label>
                                    <input
                                        type="text"
                                        id="ProductName"
                                        value={data.ProductName}
                                        onChange={(e) => setData('ProductName', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        required
                                    />
                                    {errors.ProductName && <div className="text-red-500 text-sm mt-1">{errors.ProductName}</div>}
                                </div>

                                {/* Price */}
                                <div>
                                    <label htmlFor="Price" className="block text-sm font-medium text-gray-700">
                                        ราคา
                                    </label>
                                    <input
                                        type="number"
                                        id="Price"
                                        value={data.Price}
                                        onChange={(e) => setData('Price', e.target.value)}
                                        step="0.01"
                                        min="0"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        required
                                    />
                                    {errors.Price && <div className="text-red-500 text-sm mt-1">{errors.Price}</div>}
                                </div>

                                {/* Stock */}
                                <div>
                                    <label htmlFor="Stock" className="block text-sm font-medium text-gray-700">
                                        จำนวนสินค้า
                                    </label>
                                    <input
                                        type="number"
                                        id="Stock"
                                        value={data.Stock}
                                        onChange={(e) => setData('Stock', e.target.value)}
                                        min="0"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        required
                                    />
                                    {errors.Stock && <div className="text-red-500 text-sm mt-1">{errors.Stock}</div>}
                                </div>

                                {/* Product Type */}
                                <div>
                                    <label htmlFor="ProductType" className="block text-sm font-medium text-gray-700">
                                        ประเภทสินค้า
                                    </label>
                                    <input
                                        type="text"
                                        id="ProductType"
                                        value={data.ProductType}
                                        onChange={(e) => setData('ProductType', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        required
                                    />
                                    {errors.ProductType && <div className="text-red-500 text-sm mt-1">{errors.ProductType}</div>}
                                </div>

                                {/* Product Status */}
                                <div>
                                    <label htmlFor="ProductStatus" className="block text-sm font-medium text-gray-700">
                                        สถานะสินค้า
                                    </label>
                                    <input
                                        type="text"
                                        id="ProductStatus"
                                        value={data.ProductStatus}
                                        onChange={(e) => setData('ProductStatus', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        required
                                    />
                                    {errors.ProductStatus && <div className="text-red-500 text-sm mt-1">{errors.ProductStatus}</div>}
                                </div>

                                {/* Product Description */}
                                <div>
                                    <label htmlFor="ProductDescription" className="block text-sm font-medium text-gray-700">
                                        คำอธิบายสินค้า
                                    </label>
                                    <textarea
                                        id="ProductDescription"
                                        value={data.ProductDescription}
                                        onChange={(e) => setData('ProductDescription', e.target.value)}
                                        rows="4"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                    {errors.ProductDescription && <div className="text-red-500 text-sm mt-1">{errors.ProductDescription}</div>}
                                </div>

                                {/* Product Image */}
                                <div>
                                    <label htmlFor="ProductImage" className="block text-sm font-medium text-gray-700">
                                        รูปภาพสินค้า
                                    </label>
                                    <input
                                        type="file"
                                        id="ProductImage"
                                        onChange={handleImageChange}
                                        accept="image/*"
                                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                    />
                                    {errors.ProductImage && <div className="text-red-500 text-sm mt-1">{errors.ProductImage}</div>}

                                    {/* Image Preview */}
                                    {previewImage && (
                                        <div className="mt-2">
                                            <img
                                                src={previewImage}
                                                alt="Preview"
                                                className="w-32 h-32 object-cover rounded-md"
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <div>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
                                    >
                                        {processing ? 'กำลังสร้าง...' : 'สร้างสินค้า'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
