"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/src/providers/AuthProvider";

interface OrderItem {
  quantity: number;
  meal: {
    price: number;
  };
}

interface Order {
  id: string;
  status: string;
  address: string;
  createdAt: string;
  items: OrderItem[];
}

const MyOrdersPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // Auth guard
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/orders`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch orders");
        }

        const result = await res.json();

        //  IMPORTANT FIX HERE
        setOrders(result.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="p-10 text-center text-lg">
        Loading your orders...
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-2xl font-bold mb-4">
          You have no orders yet 📦
        </h2>
        <Link
          href="/meals"
          className="px-4 py-2 bg-[#e10101] text-white rounded hover:bg-[#99040d]"
        >
          Browse Meals
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-2 py-8">
       <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-gray-900">
            My Orders
          </h2>
          <p className="mt-2 text-gray-600">
            View and manage your previous orders
          </p>
        </div>

      <div className="space-y-4">
        {orders.map((order) => {
          const totalPrice = order.items.reduce(
            (sum, item) => sum + item.meal.price * item.quantity,
            0
          );

          return (
            <div
              key={order.id}
              className="border rounded p-2 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold text-[12px] md:text-sm">
                  Order ID:{" "}
                  <span className="text-gray-600">
                    {order.id}
                  </span>
                </p>
                <p className="text-sm text-gray-500 text-[12px] md:text-sm">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
                <p className="mt-1 text-[12px] md:text-sm">
                  Status:{" "}
                  <span className="px-2 py-1 text-[12px] md:text-sm bg-blue-100 text-blue-700 rounded text-sm">
                    {order.status}
                  </span>
                </p>
                <p className="text-sm text-gray-600 mt-1 text-[12px] md:text-sm">
                  Address: {order.address}
                </p>
              </div>

              <div className="flex flex-col justify-center gap-2">
                <p className="font-bold mb-2">
                  ৳ {totalPrice}
                </p>
                <Link
                  href={`/orders/${order.id}`}
                  className="px-4 py-2 text-[10px] flex md:text-sm bg-[#e10101] text-white rounded hover:bg-[#99040d]"
                >
                  View Details
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrdersPage;
