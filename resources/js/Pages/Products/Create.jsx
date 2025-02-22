import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const ProductCreate = () => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        image: null,
        id_stores: '',
    });

    const [preview, setPreview] = useState(null);
    const [processing, setProcessing] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, image: file });

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("🚀 ส่งข้อมูลไปยัง Backend"); // เพิ่มบรรทัดนี้
        console.log(route('products.store'));


        const form = new FormData();
        form.append('name', formData.name);
        form.append('price', formData.price);
        form.append('description', formData.description);
        form.append('image', formData.image);
        form.append('id_stores', formData.id_stores);

        router.post(route('products.store'), form, {
            forceFormData: true, // บังคับใช้ FormData
            onFinish: () => setProcessing(false),
        });
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold">เพิ่มสินค้าใหม่</h2>}>
            <Head title="เพิ่มสินค้า" />
            <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
                <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
                    {/* ชื่อสินค้า */}
                    <div>
                        <label className="block text-gray-700 font-medium">ชื่อสินค้า</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
                        />
                    </div>

                    {/* ราคา */}
                    <div>
                        <label className="block text-gray-700 font-medium">ราคา</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
                        />
                    </div>

                    {/* รายละเอียด */}
                    <div>
                        <label className="block text-gray-700 font-medium">รายละเอียด</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
                        ></textarea>
                    </div>

                    {/* อัปโหลดรูปภาพ */}
                    <div>
                        <label className="block text-gray-700 font-medium">อัปโหลดรูปภาพ</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
                        />
                        {preview && <img src={preview} alt="Preview" className="mt-2 h-32 object-cover rounded-lg" />}
                    </div>

                    {/* ปุ่มบันทึก */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
                    >
                        {processing ? 'กำลังบันทึก...' : 'บันทึกสินค้า'}
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
};

export default ProductCreate;
