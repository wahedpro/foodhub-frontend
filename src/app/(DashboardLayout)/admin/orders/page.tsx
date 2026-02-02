"use client";

import { useEffect, useState } from "react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/orders`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await res.json();
      setOrders(data.data);
    } catch (err) {
      console.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-6">Loading orders...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">
        All Orders
      </h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border rounded bg-white p-4"
          >
            <div className="flex justify-between">
              <div>
                <p className="font-medium">
                  Customer: {order.customer.name}
                </p>
                <p className="text-sm text-gray-500">
                  {order.customer.email}
                </p>
              </div>

              <span className="text-sm font-semibold">
                {order.status}
              </span>
            </div>

            <ul className="mt-3 text-sm">
              {order.items.map((item: any) => (
                <li key={item.id}>
                  🍽️ {item.meal.name} × {item.quantity}  
                  <span className="text-gray-500">
                    {" "}
                    ({item.meal.provider.restaurant})
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-2 text-sm text-gray-600">
              📍 Address: {order.address}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
