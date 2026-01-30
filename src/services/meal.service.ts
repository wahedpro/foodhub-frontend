import { Meal } from "../types/meal";

export const getMeals = async (): Promise<Meal[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/meals`,
    {
      cache: "no-store",
    }
  );

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || "Failed to fetch meals");
  }

  return json.data as Meal[];
};
