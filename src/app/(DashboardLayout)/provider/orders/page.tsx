"use client";

import { useEffect, useState, Fragment } from "react";
import { useAuth } from "@/src/providers/AuthProvider";
import { Order } from "@/src/types/order";
import { getAllOrders } from "@/src/services/admin.order.service";

/* =========================
   Normalize backend data
========================= */
function normalizeOrders(rawOrders: any[]): Order[] {
  return rawOrders.map((order) => ({
    ...order,
    items: order.items.map((item: any) => ({
      ...item,
      meal: {
        ...item.meal,
        providerId:
          item.meal.providerId ??
          item.meal.providerid,
      },
    })),
  }));
}

export default function ProviderOrdersPage() {
  const auth = useAuth();
  const user = auth.user;

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    if (!user || !user.id) return;

    const fetchOrders = async () => {
      try {
        const rawOrders = await getAllOrders();
        const allOrders = normalizeOrders(rawOrders);

        const providerOrders = allOrders.filter((order) =>
          order.items.some(
            (item) => item.meal.providerId === user.id
          )
        );

        setOrders(providerOrders);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (loading) {
    return (
      <p className="p-6 text-gray-500">
        Loading orders...
      </p>
    );
  }

  // ✅ HARD GUARD FOR JSX
  if (!user) {
    return (
      <p className="p-6 text-gray-500">
        Please log in to see your orders.
      </p>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">
          My Orders
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Orders placed for your meals
        </p>
      </div>

      {orders.length === 0 ? (
        <p className="text-gray-500">
          No orders found for your meals.
        </p>
      ) : (
        <div className="rounded border bg-white overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left">
                  Order ID
                </th>
                <th className="px-4 py-3">
                  Status
                </th>
                <th className="px-4 py-3">
                  Address
                </th>
                <th className="px-4 py-3">
                  Date
                </th>
                <th className="px-4 py-3 text-right">
                  Items
                </th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <Fragment key={order.id}>
                  {/* Order row */}
                  <tr className="border-t">
                    <td className="px-4 py-3 font-mono text-xs">
                      {order.id.slice(0, 8)}...
                    </td>

                    <td className="px-4 py-3">
                      <StatusBadge status={order.status} />
                    </td>

                    <td className="px-4 py-3">
                      {order.address}
                    </td>

                    <td className="px-4 py-3">
                      {new Date(
                        order.createdAt
                      ).toLocaleString()}
                    </td>

                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() =>
                          setExpanded(
                            expanded === order.id
                              ? null
                              : order.id
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
                      <td
                        colSpan={5}
                        className="px-6 py-4"
                      >
                        <div className="space-y-3">
                          {order.items
                            .filter(
                              (item) =>
                                item.meal.providerId ===
                                user.id
                            )
                            .map((item) => (
                              <div
                                key={item.id}
                                className="flex items-center gap-4"
                              >
                                <img
                                  src={item.meal.image}
                                  alt={item.meal.name}
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
                </Fragment>
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
