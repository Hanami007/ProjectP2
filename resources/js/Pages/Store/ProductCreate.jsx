// resources/js/Pages/Store/ProductCreate.jsx
import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const ProductCreate = () => {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        price: '',
        description: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('products.store'), {
            data,
        });
    };

    return (
        <AuthenticatedLayout header={<h2>เพิ่มสินค้าใหม่</h2>}>
            <Head title="เพิ่มสินค้า" />
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>ชื่อสินค้า</label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>ราคา</label>
                    <input
                        type="number"
                        value={data.price}
                        onChange={(e) => setData('price', e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>รายละเอียด</label>
                    <textarea
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit" disabled={processing}>
                    บันทึกสินค้า
                </button>
            </form>
        </AuthenticatedLayout>
    );
};

export default ProductCreate;
