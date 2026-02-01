import { getProviderById } from "@/src/services/provider.service";
import { notFound } from "next/navigation";
import MealCard from "@/src/components/customer/MealCard";

const ProviderDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const provider = await getProviderById(id);

  if (!provider ) {
    notFound();
  }

 const meals = provider.meals;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Provider Info */}
      <div className="border rounded-lg p-6">
        <h1 className="text-3xl font-bold">{provider.restaurant}</h1>
        <p className="text-gray-600 mt-2">📍 {provider.address}</p>
        <p className="text-gray-600">📞 {provider.phone}</p>
      </div>

      {/* Meals */}
      <h2 className="text-2xl font-semibold mb-4">Meals from this provider</h2>

      {meals.length === 0 ? (
        <p>No meals found for this provider</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {meals.map((meal) => (
            <MealCard key={meal.id} meal={meal} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProviderDetailsPage;
