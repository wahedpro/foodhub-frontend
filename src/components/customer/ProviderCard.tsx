"use client";

import { Provider } from "@/src/types/provider";

const ProviderCard = ({ provider }: { provider: Provider }) => {
  return (
    <div className="border rounded-lg p-5 hover:shadow-lg transition">
      <h3 className="text-xl font-semibold">{provider.restaurant}</h3>

      <p className="text-sm text-gray-600 mt-1">
        📍 {provider.address}
      </p>

      <p className="text-sm text-gray-600">
        📞 {provider.phone}
      </p>

      <p className="mt-3 text-sm font-medium">
        🍽️ Meals: {provider._count.meals}
      </p>
    </div>
  );
};

export default ProviderCard;
