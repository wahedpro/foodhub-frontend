import { getMealById } from "@/src/services/meal.service";
import { notFound } from "next/navigation";

const MealDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  // ✅ params কে await করতে হবে
  const { id } = await params;

  const meal = await getMealById(id);

  if (!meal) {
    notFound();
  }

  console.log(meal)

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold">{meal.name}</h1>
      <p>{meal.description}</p>
      <p className="font-bold mt-2">৳ {meal.price}</p>
    </div>
  );
};

export default MealDetailsPage;
