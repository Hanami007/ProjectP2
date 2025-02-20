import React, { useState } from 'react';
import { router } from '@inertiajs/react';

const Create = () => {
  const [formData, setFormData] = useState({
    storeName: '',
    ownerName: '',
    phoneNumber: '',
    address: ''
  });
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    router.post('/stores', formData, {
      onSuccess: () => {
        // จัดการเมื่อสำเร็จ
        console.log('Store created successfully');
      },
      onError: (errors) => {
        // จัดการ error
        setErrors(errors);
        setProcessing(false);
      },
      onFinish: () => {
        setProcessing(false);
      }
    });
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">สร้างร้านค้าใหม่</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">ชื่อร้านค้า:</label>
          <input
            type="text"
            name="storeName"
            value={formData.storeName}
            onChange={handleChange}
            required
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              errors.storeName ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.storeName && (
            <p className="mt-1 text-sm text-red-600">{errors.storeName}</p>
          )}
        </div>

        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">ชื่อเจ้าของร้าน:</label>
          <input
            type="text"
            name="ownerName"
            value={formData.ownerName}
            onChange={handleChange}
            required
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              errors.ownerName ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.ownerName && (
            <p className="mt-1 text-sm text-red-600">{errors.ownerName}</p>
          )}
        </div>

        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">หมายเลขโทรศัพท์:</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.phoneNumber && (
            <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
          )}
        </div>

        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">ที่อยู่:</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              errors.address ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-600">{errors.address}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={processing}
          className={`w-full py-2 px-4 text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
            processing
              ? 'bg-indigo-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {processing ? 'กำลังสร้าง...' : 'สร้างร้านค้า'}
        </button>
      </form>
    </div>
  );
};

export default Create;
