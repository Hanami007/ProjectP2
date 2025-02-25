import React, { useState } from "react";
import { router, Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const Create = () => {
    const [formData, setFormData] = useState({
        storeName: "",
        ownerName: "",
        phoneNumber: "",
        address: "",
        Picture: null,
    });

    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);

        router.post("/stores", formData, {
            onSuccess: () => {
                console.log("Store created successfully");
            },
            onError: (errors) => {
                setErrors(errors);
                setProcessing(false);
            },
            onFinish: () => {
                setProcessing(false);
            },
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevData) => ({
            ...prevData,
            Picture: file,
        }));

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
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Create Store
                </h2>
            }
        >
            <Head title="Create Store" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h1 className="text-3xl font-semibold text-center mb-8">
                                สร้างร้านค้าใหม่
                            </h1>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="form-group">
                                    <label className="block text-sm font-medium text-gray-700">
                                        ชื่อร้านค้า:
                                    </label>
                                    <input
                                        type="text"
                                        name="storeName"
                                        value={formData.storeName}
                                        onChange={handleChange}
                                        required
                                        className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white text-black ${
                                            errors.storeName
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        }`}
                                    />
                                    {errors.storeName && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.storeName}
                                        </p>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label className="block text-sm font-medium text-gray-700">
                                        ชื่อเจ้าของร้าน:
                                    </label>
                                    <input
                                        type="text"
                                        name="ownerName"
                                        value={formData.ownerName}
                                        onChange={handleChange}
                                        required
                                        className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white text-black ${
                                            errors.ownerName
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        }`}
                                    />
                                    {errors.ownerName && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.ownerName}
                                        </p>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label className="block text-sm font-medium text-gray-700">
                                        หมายเลขโทรศัพท์:
                                    </label>
                                    <input
                                        type="text"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        required
                                        className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white text-black ${
                                            errors.phoneNumber
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        }`}
                                    />
                                    {errors.phoneNumber && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.phoneNumber}
                                        </p>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label className="block text-sm font-medium text-gray-700">
                                        ที่อยู่:
                                    </label>
                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        required
                                        className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white text-black ${
                                            errors.address
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        }`}
                                    />
                                    {errors.address && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.address}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="Picture"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        รูปภาพสินค้า
                                    </label>
                                    <input
                                        type="file"
                                        id="Picture"
                                        onChange={handleImageChange}
                                        accept="image/*"
                                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                    />
                                    {errors.Picture && (
                                        <div className="text-red-500 text-sm mt-1">
                                            {errors.Picture}
                                        </div>
                                    )}

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

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className={`w-full py-2 px-4 text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                                        processing
                                            ? "bg-indigo-400 cursor-not-allowed"
                                            : "bg-indigo-600 hover:bg-indigo-700"
                                    }`}
                                >
                                    {processing ? "กำลังสร้าง..." : "สร้างร้านค้า"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Create;
