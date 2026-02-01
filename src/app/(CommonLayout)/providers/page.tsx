
import ProviderCard from "@/src/components/customer/ProviderCard";
import { getProviders } from "@/src/services/provider.service";

const ProvidersPage = async () => {
  const providers = await getProviders();

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        All Providers
      </h1>

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
