"use client";

import { createContext, useContext, useEffect, useReducer } from "react";

interface CartItem {
  mealId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  providerId: string;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "ADD"; payload: CartItem }
  | { type: "INCREASE"; payload: string }
  | { type: "DECREASE"; payload: string }
  | { type: "REMOVE"; payload: string }
  | { type: "CLEAR" }
  | { type: "SET_CART"; payload: CartItem[] };

const CartContext = createContext<any>(null);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "SET_CART":
      return { items: action.payload };

    case "ADD": {
      const existing = state.items.find(
        (i) => i.mealId === action.payload.mealId
      );

      if (existing) {
        return {
          items: state.items.map((i) =>
            i.mealId === action.payload.mealId
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }

      return { items: [...state.items, action.payload] };
    }

    case "INCREASE":
      return {
        items: state.items.map((i) =>
          i.mealId === action.payload
            ? { ...i, quantity: i.quantity + 1 }
            : i
        ),
      };

    case "DECREASE":
      return {
        items: state.items
          .map((i) =>
            i.mealId === action.payload
              ? { ...i, quantity: i.quantity - 1 }
              : i
          )
          .filter((i) => i.quantity > 0),
      };

    case "REMOVE":
      return {
        items: state.items.filter((i) => i.mealId !== action.payload),
      };

    case "CLEAR":
      return { items: [] };

    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  // ✅ Load cart from localStorage on first load
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      dispatch({
        type: "SET_CART",
        payload: JSON.parse(storedCart),
      });
    }
  }, []);

  // ✅ Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.items));
  }, [state.items]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};
