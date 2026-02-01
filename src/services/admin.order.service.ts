import { Order } from "../types/order";

const API = process.env.NEXT_PUBLIC_API_URL;

export const getAllOrders = async (): Promise<Order[]> => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API}/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const text = await res.text();
  let data;

  try {
    data = JSON.parse(text);
  } catch {
    console.error("Invalid JSON:", text);
    throw new Error("Server error");
  }

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch orders");
  }

  return data.data;
};
