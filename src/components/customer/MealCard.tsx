"use client";

import Link from "next/link";
import { Meal } from "@/src/types/meal";

const MealCard = ({ meal }: { meal: Meal }) => {
  return (
    <Link href={`/meals/${meal.id}`} className="block">
      <div className="border rounded p-4 cursor-pointer hover:shadow-sm transition">
        <img
          src={meal.image}
          alt={meal.name}
          className="w-full h-64 object-cover rounded"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.png";
          }}
        />
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mt-2">{meal.name}</h3>
            <p className="text-sm text-gray-600">{meal.description}</p>
          </div>
          <p className="font-bold mt-1">৳ {meal.price}</p>
        </div>
      </div>
    </Link>
  );
};

export default MealCard;
