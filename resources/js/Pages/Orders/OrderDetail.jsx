import React from 'react';
import { ChevronLeft, Package, User, MapPin, CreditCard } from 'lucide-react';
import { Link } from '@inertiajs/inertia-react';

const OrderDetail = ({ order = {
  id: "ORD-001",
  payment_status: "paid",
  TotalAmount: 299.99,
  user: {
    name: "John Doe",
    address: "123 Example St, City"
  },
  orderDetails: [
    {
      id: 1,
      product_id: "PROD-001",
      product: { ProductName: "Sample Product 1" },
      Quantity: 2,
      UnitPrice: 49.99
    },
    {
      id: 2,
      product_id: "PROD-002",
      product: { ProductName: "Sample Product 2" },
      Quantity: 1,
      UnitPrice: 199.99
    }
  ]
} }) => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Link
          href="/orders/pending"
          className="inline-flex items-center px-4 py-2 text-sm text-gray-700 hover:text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          กลับไปหน้าคำสั่งซื้อ
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">รายละเอียดคำสั่งซื้อ</h1>
      </div>

      {/* Order Summary Card */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <Package className="h-6 w-6 text-blue-500" />
          <h2 className="text-xl font-semibold text-gray-800">คำสั่งซื้อ #{order.id}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-500">
              <User className="h-4 w-4" />
              <span className="text-sm">ชื่อลูกค้า</span>
            </div>
            <div className="font-medium text-gray-800">{order.user.name || 'ไม่ระบุ'}</div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-500">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">ที่อยู่จัดส่ง</span>
            </div>
            <div className="font-medium text-gray-800">{order.user.address || 'ไม่ระบุที่อยู่'}</div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-500">
              <CreditCard className="h-4 w-4" />
              <span className="text-sm">สถานะการชำระเงิน</span>
            </div>
            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
              order.payment_status === 'paid'
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {order.payment_status === 'paid' ? 'ชำระเงินแล้ว' : 'รอการชำระเงิน'}
            </span>
          </div>

          <div className="space-y-2">
            <div className="text-sm text-gray-500">ยอดรวมทั้งหมด</div>
            <div className="text-xl font-bold text-green-600">
              ฿{order.TotalAmount.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      {/* Products Card */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800">รายการสินค้า</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">รหัสสินค้า</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">ชื่อสินค้า</th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-600">จำนวน</th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-600">ราคาต่อชิ้น</th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-600">ราคารวม</th>
              </tr>
            </thead>
            <tbody>
              {order.orderDetails && order.orderDetails.length > 0 ? (
                order.orderDetails.map((detail) => (
                  <tr key={detail.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-all">
                    <td className="px-6 py-4 text-gray-600">{detail.product_id}</td>
                    <td className="px-6 py-4 font-medium text-gray-800">{detail.product?.ProductName}</td>
                    <td className="px-6 py-4 text-right">{detail.Quantity}</td>
                    <td className="px-6 py-4 text-right">฿{detail.UnitPrice.toFixed(2)}</td>
                    <td className="px-6 py-4 text-right font-medium text-gray-800">
                      ฿{(detail.Quantity * detail.UnitPrice).toFixed(2)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    ไม่พบรายการสินค้า
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot className="bg-gray-50">
              <tr>
                <td colSpan="4" className="px-6 py-3 text-right font-medium text-gray-600">ยอดรวมทั้งหมด</td>
                <td className="px-6 py-3 text-right font-bold text-green-600">
                  ฿{order.TotalAmount.toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
