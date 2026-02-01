"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/src/providers/AuthProvider";
import ReviewForm from "@/src/components/customer/ReviewForm";

interface OrderItem {
  id: string;
  quantity: number;
  meal: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
}

interface Order {
  id: string;
  status: string;
  address: string;
  createdAt: string;
  items: OrderItem[];
  customer: {
    name: string;
    email: string;
  };
}

const OrderDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  // Auth guard
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        if (!res.ok) {
          throw new Error("Order not found");
        }

        const result = await res.json();

        //  IMPORTANT: unwrap data
        setOrder(result.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOrder();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="p-10 text-center text-lg">Loading order details...</div>
    );
  }

  if (!order) {
    return <div className="p-10 text-center text-red-500">Order not found</div>;
  }

  const totalPrice = order.items.reduce(
    (sum, item) => sum + item.meal.price * item.quantity,
    0,
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Order Details</h1>

      {/* Order Info */}
      <div className="mb-6 space-y-1">
        <p>
          <span className="font-semibold">Order ID:</span> {order.id}
        </p>
        <p>
          <span className="font-semibold">Status:</span>{" "}
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded">
            {order.status}
          </span>
        </p>
        <p>
          <span className="font-semibold">Delivery Address:</span>{" "}
          {order.address}
        </p>
        <p className="text-sm text-gray-500">
          Ordered on: {new Date(order.createdAt).toLocaleString()}
        </p>
      </div>

      {/* Items */}
      <div className="border rounded p-4">
        <h2 className="text-xl font-semibold mb-4">Ordered Items</h2>

        <div className="space-y-4">
          {order.items.map((item) => (
            <div key={item.id} className="border-b pb-4 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={item.meal.image}
                    alt={item.meal.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="font-semibold">{item.meal.name}</p>
                    <p className="text-sm text-gray-500">
                      ৳ {item.meal.price} × {item.quantity}
                    </p>
                  </div>
                </div>

                <p className="font-semibold">
                  ৳ {item.meal.price * item.quantity}
                </p>
              </div>

              {/* ⭐ Review only if delivered */}
              {order.status === "DELIVERED" && (
                <ReviewForm mealId={item.meal.id} />
              )}
            </div>
          ))}
        </div>

        <hr className="my-4" />

        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>৳ {totalPrice}</span>
        </div>
      </div>

      {/* Customer (optional, nice touch) */}
      <div className="mt-6 text-sm text-gray-600">
        <p>
          <span className="font-semibold">Customer:</span> {order.customer.name}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {order.customer.email}
        </p>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
