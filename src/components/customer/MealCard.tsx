import { Meal } from "@/src/types/meal";

const MealCard = ({ meal }: { meal: Meal }) => {
  return (
    <div className="border rounded p-4">
      <img
        src={meal.image}
        alt={meal.name}
        className="w-full h-40 object-cover rounded"
      />
      <h3 className="text-lg font-semibold mt-2">{meal.name}</h3>
      <p className="text-sm text-gray-600">{meal.description}</p>
      <p className="font-bold mt-1">৳ {meal.price}</p>
    </div>
  );
};

export default MealCard;
