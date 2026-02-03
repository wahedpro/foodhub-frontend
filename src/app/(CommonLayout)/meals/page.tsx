import { getMeals } from "@/src/services/meal.service";
import Link from "next/link";

const MealsPage = async () => {
  const meals = await getMeals();

  return (
    <div className="mx-auto w-[90%] py-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-semibold text-gray-900">Browse Meals</h2>
        <p className="mt-2 text-gray-600">Explore all the delicious meals</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {meals.map((meal: any) => (
          <Link
            key={meal.id}
            href={`/meals/${meal.id}`}
            className="border rounded-lg overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={meal.image}
              alt={meal.name}
              className="h-48 w-full object-cover"
            />

            <div className="p-4 flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{meal.name}</h3>
                <p className="text-gray-500 text-sm line-clamp-2">
                  {meal.description}
                </p>
              </div>
              <p className="font-bold mt-2">৳ {meal.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MealsPage;
