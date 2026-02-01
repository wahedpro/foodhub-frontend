"use client";

import { useAuth } from "@/src/providers/AuthProvider";
import { useCart } from "@/src/providers/CartContext";
import { useRouter } from "next/navigation";

interface Meal {
  id: string;
  name: string;
  price: number;
  image: string;
  providerId: string;
}

const AddToCartButton = ({ meal }: { meal: Meal }) => {
  const { user } = useAuth();
  const { dispatch } = useCart();
  const router = useRouter();

  const handleAddToCart = () => {
    // 🔐 Login required
    if (!user) {
      router.push("/login");
      return;
    }

    dispatch({
      type: "ADD",
      payload: {
        mealId: meal.id,
        name: meal.name,
        price: meal.price,
        image: meal.image,
        providerId: meal.providerId,
        quantity: 1,
      },
    });
  };

  return (
    <button
      onClick={handleAddToCart}
      className="mt-5 px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;