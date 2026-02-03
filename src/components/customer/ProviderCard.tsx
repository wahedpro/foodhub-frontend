"use client";

import Link from "next/link";
import { Provider } from "@/src/types/provider";

const ProviderCard = ({ provider }: { provider: Provider }) => {
  return (
    <Link href={`/providers/${provider.id}`}>
      <div className="flex border rounded-lg p-5 hover:shadow-sm transition cursor-pointer">
        <div>
          <h3 className="text-xl font-semibold">{provider.restaurant}</h3>

          <p className="text-sm text-gray-600">📍 {provider.address}</p>

          <p className="text-sm text-gray-600">📞 {provider.phone}</p>

          <p className="mt-2 text-sm font-medium">
            🍽️ Meals: {provider._count.meals}
          </p>
        </div>
        <img
          src="https://cdn-icons-png.flaticon.com/512/9425/9425742.png"
          alt=""
          className="w-24 h-24 mx-auto mt-2"
        />
      </div>
    </Link>
  );
};

export default ProviderCard;
