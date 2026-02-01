
// import MealCard from "@/src/components/customer/MealCard";
// import { getMeals } from "@/src/services/meal.service";

// const MealsPage = async () => {
//   const meals = await getMeals();

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//       {meals.map((meal) => (
//         <MealCard key={meal.id} meal={meal} />
//       ))}
//     </div>
//   );
// };

// export default MealsPage;

import { getMeals } from "@/src/services/meal.service";
import Link from "next/link";


const MealsPage = async () => {
  const meals = await getMeals();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Browse Meals</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {meals.map((meal: any) => (
          <Link
            key={meal.id}
            href={`/meals/${meal.id}`}   // ✅ IMPORTANT
            className="border rounded-lg overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={meal.image}
              alt={meal.name}
              className="h-48 w-full object-cover"
            />

            <div className="p-4">
              <h3 className="font-semibold text-lg">{meal.name}</h3>
              <p className="text-gray-500 text-sm line-clamp-2">
                {meal.description}
              </p>
              <p className="font-bold mt-2">৳ {meal.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MealsPage;
