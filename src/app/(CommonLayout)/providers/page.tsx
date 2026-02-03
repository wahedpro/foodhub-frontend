
import ProviderCard from "@/src/components/customer/ProviderCard";
import { getProviders } from "@/src/services/provider.service";

const ProvidersPage = async () => {
  const providers = await getProviders();

  return (
    <div className="w-[90%] mx-auto py-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-semibold text-gray-900">All Providers</h2>
        <p className="mt-2 text-gray-600">Explore all the delicious providers</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {providers.map((provider) => (
          <ProviderCard
            key={provider.id}
            provider={provider}
          />
        ))}
      </div>
    </div>
  );
};

export default ProvidersPage;
