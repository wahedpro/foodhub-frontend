
import MealCard from "@/src/components/customer/MealCard";
import { getMeals } from "@/src/services/meal.service";

const MealsPage = async () => {
  const meals = await getMeals();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {meals.map((meal) => (
        <MealCard key={meal.id} meal={meal} />
      ))}
    </div>
  );
};

export default MealsPage;
