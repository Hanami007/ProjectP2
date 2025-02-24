import React, { useState, useEffect } from "react";
import { Link, useForm } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { ShoppingBag, Minus, Plus, Trash2, ArrowLeft, CreditCard, Truck } from "lucide-react";

const CartItem = ({ item }) => {
  const handleQuantityUpdate = (newQuantity) => {
    if (newQuantity >= 1) {
      Inertia.put('/cart', { product_id: item.product.id, quantity: newQuantity }, {
        onError: (errors) => console.error(errors)
      });
    }
  };

  return (
    <div className="group relative flex flex-col gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20 overflow-hidden rounded-lg">
          <img
            src={item.product.ProductImage ? `/storage/${item.product.ProductImage}` : "default_image_url.jpg"}
            alt={item.product.ProductName}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="flex-1">
          <h2 className="font-semibold text-gray-800">{item.product.ProductName}</h2>
          <p className="text-lg font-bold text-blue-600">
            ฿{parseFloat(item.product.Price).toFixed(2)}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 sm:gap-6">
        <div className="flex items-center rounded-lg border border-gray-200 bg-gray-50 px-2">
          <button
            onClick={() => handleQuantityUpdate(item.quantity - 1)}
            disabled={item.quantity <= 1}
            className="p-2 text-gray-500 transition-colors hover:text-blue-600 disabled:text-gray-300"
          >
            <Minus size={16} />
          </button>
          <span className="w-12 text-center font-medium">{item.quantity}</span>
          <button
            onClick={() => handleQuantityUpdate(item.quantity + 1)}
            className="p-2 text-gray-500 transition-colors hover:text-blue-600"
          >
            <Plus size={16} />
          </button>
        </div>

        <button
          onClick={() => Inertia.delete(`/cart/${item.product.id}`)}
          className="rounded-full p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

const PaymentOption = ({ value, label, icon: Icon, selected, onChange }) => (
  <div
    onClick={() => onChange(value)}
    className={`cursor-pointer rounded-xl border p-4 transition-all ${
      selected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-200'
    }`}
  >
    <div className="flex items-center gap-3">
      <div className={`rounded-full p-2 ${selected ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
        <Icon size={20} />
      </div>
      <div className="flex-1">
        <p className="font-medium text-gray-900">{label}</p>
      </div>
      <div className={`h-4 w-4 rounded-full border ${selected ? 'border-4 border-blue-500' : 'border-gray-300'}`} />
    </div>
  </div>
);

const CartPage = ({ cartItems }) => {
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const { data, setData, post, processing } = useForm({
    payment_method: paymentMethod,
  });

  useEffect(() => {
    setData('payment_method', paymentMethod);
  }, [paymentMethod]);

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + parseFloat(item.product.Price) * item.quantity, 0).toFixed(2);
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-lg">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-gray-100 p-6">
              <ShoppingBag size={32} className="text-gray-400" />
            </div>
          </div>
          <h1 className="mb-2 text-xl font-semibold text-gray-900">Your cart is empty</h1>
          <p className="mb-6 text-gray-600">Looks like you haven't added any items yet</p>
          <Link
            href="/homepage"
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700"
          >
            <ArrowLeft size={16} />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-4xl px-4">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Shopping Cart</h1>
          <p className="mt-2 text-gray-600">{cartItems.length} items in your cart</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {cartItems.map((item) => (
              <CartItem key={item.product.id} item={item} />
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <h3 className="mb-4 text-lg font-semibold">Payment Method</h3>
              <div className="space-y-3">
                <PaymentOption
                  value="cod"
                  label="Cash on Delivery"
                  icon={Truck}
                  selected={paymentMethod === "cod"}
                  onChange={setPaymentMethod}
                />
                <PaymentOption
                  value="bank_transfer"
                  label="Bank Transfer"
                  icon={CreditCard}
                  selected={paymentMethod === "bank_transfer"}
                  onChange={setPaymentMethod}
                />
              </div>

              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>฿{calculateTotal()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>฿{calculateTotal()}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => post("/cart/checkout")}
                disabled={processing}
                className="mt-6 w-full rounded-full bg-blue-600 py-3 font-medium text-white transition-colors hover:bg-blue-700 disabled:bg-gray-400"
              >
                {processing ? "Processing..." : "Proceed to Checkout"}
              </button>
            </div>
          </div>
        </div>

        <Link
          href="/homepage"
          className="mt-8 inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft size={16} />
          <span>Continue Shopping</span>
        </Link>
      </div>
    </div>
  );
};

export default CartPage;
