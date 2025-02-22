import { ShoppingCart } from "lucide-react";
import { Link } from "@inertiajs/react";  // ใช้ Link จาก Inertia.js

const FloatingCart = () => {
  return (
    <Link
      href="/cart"  // ตั้งค่าลิงก์ให้ไปที่หน้า Cart
      className="fixed bottom-5 right-5 bg-blue-500 text-white p-3 rounded-full shadow-lg cursor-pointer hover:bg-blue-600 transition"
    >
      <ShoppingCart size={24} />
    </Link>
  );
};

export default FloatingCart;
