import { Meal } from "@/src/types/meal";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// GET ALL MEALS
export const getMeals = async (): Promise<Meal[]> => {
  const res = await fetch(`${API_URL}/meals`, {
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch meals");
  }

  return data.data as Meal[];
};

// CREATE MEAL (ADD)
type CreateMealPayload = {
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
};

export const createMeal = async (
  payload: CreateMealPayload
) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/v1/provider/meals`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to create meal");
  }

  return data;
};

// UPDATE MEAL
export const updateMeal = async (
  mealId: string,
  payload: CreateMealPayload
) => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${API_URL}/v1/provider/meals/${mealId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to update meal");
  }

  return data;
};

// delete Meal
export const deleteMeal = async (mealId: string) => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/provider/meals/${mealId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to delete meal");
  }

  return data;
};
