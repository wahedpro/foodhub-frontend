"use client";

import { getAllOrders } from "@/src/services/admin.order.service";
import { Order } from "@/src/types/order";
import { useEffect, useState } from "react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    getAllOrders()
      .then(setOrders)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="p-6 text-gray-500">Loading orders...</p>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">All Orders</h1>
        <p className="text-sm text-gray-500 mt-1">
          View all customer orders
        </p>
      </div>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <div className="rounded border bg-white overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left">Order ID</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Address</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3 text-right">Items</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <>
                  {/* Order row */}
                  <tr key={order.id} className="border-t">
                    <td className="px-4 py-3 font-mono text-xs">
                      {order.id.slice(0, 8)}...
                    </td>

                    <td className="px-4 py-3">
                      <StatusBadge status={order.status} />
                    </td>

                    <td className="px-4 py-3">{order.address}</td>

                    <td className="px-4 py-3">
                      {new Date(order.createdAt).toLocaleString()}
                    </td>

                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() =>
                          setExpanded(
                            expanded === order.id ? null : order.id
                          )
                        }
                        className="text-indigo-600 text-xs hover:underline"
                      >
                        {expanded === order.id
                          ? "Hide"
                          : "View"}
                      </button>
                    </td>
                  </tr>

                  {/* Expanded items */}
                  {expanded === order.id && (
                    <tr className="bg-gray-50">
                      <td colSpan={5} className="px-6 py-4">
                        <div className="space-y-3">
                          {order.items.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center gap-4"
                            >
                              <img
                                src={item.meal.image}
                                className="h-12 w-12 rounded object-cover"
                              />
                              <div className="flex-1">
                                <p className="font-medium">
                                  {item.meal.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  ৳ {item.meal.price} ×{" "}
                                  {item.quantity}
                                </p>
                              </div>
                              <p className="text-sm font-medium">
                                ৳{" "}
                                {item.meal.price *
                                  item.quantity}
                              </p>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* =========================
   Status Badge
========================= */
function StatusBadge({
  status,
}: {
  status: Order["status"];
}) {
  const color =
    status === "DELIVERED"
      ? "bg-green-100 text-green-700"
      : status === "PREPARING"
      ? "bg-yellow-100 text-yellow-700"
      : status === "CANCELLED"
      ? "bg-red-100 text-red-700"
      : "bg-gray-100 text-gray-700";

  return (
    <span
      className={`rounded px-2 py-1 text-xs font-medium ${color}`}
    >
      {status}
    </span>
  );
}
