export type OrderItem = {
  id: string;
  quantity: number;
  meal: {
    id: string;
    name: string;
    price: number;
    image: string;
    providerId: string;
  };
};

export type Order = {
  id: string;
  customerId: string;
  status: "PENDING" | "PREPARING" | "DELIVERED" | "CANCELLED";
  address: string;
  createdAt: string;
  items: OrderItem[];
};
