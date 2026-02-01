"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/src/providers/CartContext";
import { useAuth } from "@/src/providers/AuthProvider";

const CheckoutPage = () => {
  const { state, dispatch } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const totalPrice = state.items.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );

  // 🔐 Guard
  if (!user) {
    router.push("/login");
    return null;
  }

  if (state.items.length === 0) {
    router.push("/cart");
    return null;
  }

  const handlePlaceOrder = async () => {
    if (!address.trim()) {
      alert("Please enter delivery address");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            address,
            items: state.items.map((item: any) => ({
              mealId: item.mealId,
              quantity: item.quantity,
            })),
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Order failed");
      }

      const data = await res.json();

      // ✅ Clear cart after success
      dispatch({ type: "CLEAR" });

      // ✅ Redirect to order tracking / success page
      router.push(`/orders/${data.id}`);
    } catch (error) {
      alert("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {/* Address */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">
          Delivery Address
        </label>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          rows={3}
          className="w-full border rounded p-3"
          placeholder="Enter your full address"
        />
      </div>

      {/* Order Summary */}
      <div className="border rounded p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

        <div className="space-y-2">
          {state.items.map((item: any) => (
            <div
              key={item.mealId}
              className="flex justify-between text-sm"
            >
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>৳ {item.price * item.quantity}</span>
            </div>
          ))}
        </div>

        <hr className="my-4" />

        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>৳ {totalPrice}</span>
        </div>
      </div>

      {/* Place Order */}
      <button
        onClick={handlePlaceOrder}
        disabled={loading}
        className="w-full py-3 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
};

export default CheckoutPage;
