import { usePage } from "@inertiajs/react";

const OrderTracking = () => {
  const { orders } = usePage().props; // รับข้อมูลจาก Laravel

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center text-blue-600">คำสั่งซื้อของคุณ</h2>

      <div className="mt-6">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.id} className="mb-6 p-4 border rounded-lg bg-gray-100">
              <h3 className="text-lg font-bold text-blue-700">คำสั่งซื้อ #{order.id}</h3>
              <p><strong>สถานะ:</strong> {order.OrderStatus}</p>
              <p><strong>วันที่สั่งซื้อ:</strong> {order.OrderDate}</p>
              <p><strong>ยอดรวม:</strong> {order.TotalAmount} บาท</p>

              <h4 className="mt-3 font-semibold text-blue-600">รายการสินค้า:</h4>
              <ul className="list-disc pl-5">
                {order.products.length > 0 ? (
                  order.products.map((product) => (
                    <li key={product.id}>
                      {product.name} (x{product.quantity})
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500">ไม่มีสินค้าในคำสั่งซื้อนี้</p>
                )}
              </ul>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">ไม่มีคำสั่งซื้อของคุณ</p>
        )}
      </div>
    </div>
  );
};

export default OrderTracking;
