import { getMealById } from "@/src/services/meal.service";
import { notFound } from "next/navigation";

const MealDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const meal = await getMealById(id);
  if (!meal) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <img
        src={meal.image}
        alt={meal.name}
        className="w-full h-64 object-cover rounded mb-4"
      />

      <h1 className="text-3xl font-bold">{meal.name}</h1>
      <p className="text-gray-600">{meal.description}</p>
      <p className="font-bold mt-2">৳ {meal.price}</p>
    </div>
  );
};

export default MealDetailsPage;
