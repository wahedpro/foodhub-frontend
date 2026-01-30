export type Meal = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  providerId: string;
  categoryId: string;
  createdAt: string;
  category: {
    id: string;
    name: string;
  };
  provider: {
    id: string;
    userId: string;
    restaurant: string;
  };
};
