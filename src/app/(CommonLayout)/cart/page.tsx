"use client";

import { useCart } from "@/src/providers/CartContext";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const { state, dispatch } = useCart();
  const router = useRouter();

  const totalPrice = state.items.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0,
  );

  if (state.items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty 🛒</h2>
        <button
          onClick={() => router.push("/meals")}
          className="px-4 py-2 bg-[#e10101] text-white rounded hover:bg-[#99040d]"
        >
          Browse Meals
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-6 px-2">
       <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-gray-900">
            Your Cart
          </h2>
          <p className="mt-2 text-gray-600">
            Review and manage your selected meals
          </p>
        </div>

      <div className="space-y-4">
        {state.items.map((item: any) => (
          <div
            key={item.mealId}
            className="flex items-center justify-between border p-2 rounded"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />

              <div>
                <h3 className="font-semibold text-sm md:text-xl">{item.name}</h3>
                <p className="text-gray-500">৳ {item.price}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                disabled={item.quantity === 1}
                onClick={() =>
                  dispatch({ type: "DECREASE", payload: item.mealId })
                }
                className={`px-3 py-1 rounded ${
                  item.quantity === 1
                    ? "bg-gray-200 cursor-not-allowed"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              >
                −
              </button>

              <span className="font-semibold">{item.quantity}</span>

              <button
                onClick={() =>
                  dispatch({ type: "INCREASE", payload: item.mealId })
                }
                className="px-3 py-1 bg-gray-300 rounded"
              >
                +
              </button>
            </div>

            <button
              onClick={() => dispatch({ type: "REMOVE", payload: item.mealId })}
              className="text-red-500 font-semibold"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <h2 className="text-xl font-bold">Total: ৳ {totalPrice}</h2>

        <button
          onClick={() => router.push("/checkout")}
          className="px-6 py-2 bg-[#e10101] text-white rounded hover:bg-[#99040d]"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
