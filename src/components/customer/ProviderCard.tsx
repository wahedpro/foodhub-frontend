"use client";

import Link from "next/link";
import { Provider } from "@/src/types/provider";

const ProviderCard = ({ provider }: { provider: Provider }) => {
  return (
    <Link href={`/providers/${provider.id}`}>
      <div className="border rounded-lg p-5 hover:shadow-lg transition cursor-pointer">
        <h3 className="text-xl font-semibold">
          {provider.restaurant}
        </h3>

        <p className="text-sm text-gray-600">
          📍 {provider.address}
        </p>

        <p className="text-sm text-gray-600">
          📞 {provider.phone}
        </p>

        <p className="mt-2 text-sm font-medium">
          🍽️ Meals: {provider._count.meals}
        </p>
      </div>
    </Link>
  );
};

export default ProviderCard;