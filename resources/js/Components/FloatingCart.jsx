import { ShoppingCart } from "lucide-react";
import { Link } from "@inertiajs/react";  // ใช้ Link จาก Inertia.js

const FloatingCart = () => {
  return (
    <Link
      href="/cart"
      className="fixed bottom-5 right-5 bg-blue-500 text-white p-3 rounded-full shadow-lg cursor-pointer hover:bg-blue-600 transition"
    >
      <ShoppingCart size={30} />
    </Link>
  );
};

export default FloatingCart;
