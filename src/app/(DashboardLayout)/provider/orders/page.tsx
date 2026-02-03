"use client";

import { useAuth } from "@/src/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ProviderOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);


  const { user } = useAuth();
    const router = useRouter();
  
    useEffect(() => {
      if (!user) {
        router.push("/login");
      }
    }, [user, router]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/provider/orders`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const data = await res.json();
    setOrders(data.data);
  };

  const updateStatus = async (orderId: string, status: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/provider/orders/${orderId}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ status }),
      }
    );

    if (res.ok) {
      toast.success("Order status updated");
      fetchOrders();
    } else {
      toast.error("Failed to update order");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">
        Incoming Orders
      </h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border rounded p-4 bg-white"
          >
            <p className="font-medium">
              Customer: {order.customer.name}
            </p>
            <p className="text-sm text-gray-500">
              Status: {order.status}
            </p>

            <ul className="mt-2 text-sm">
              {order.items.map((item: any) => (
                <li key={item.id}>
                  {item.meal.name} × {item.quantity}
                </li>
              ))}
            </ul>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() =>
                  updateStatus(order.id, "PREPARING")
                }
                className="px-3 py-1 bg-yellow-500 text-white rounded"
              >
                Preparing
              </button>

              <button
                onClick={() =>
                  updateStatus(order.id, "READY")
                }
                className="px-3 py-1 bg-blue-500 text-white rounded"
              >
                Ready
              </button>

              <button
                onClick={() =>
                  updateStatus(order.id, "DELIVERED")
                }
                className="px-3 py-1 bg-green-600 text-white rounded"
              >
                Delivered
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
