export interface ProviderProfile {
  id: string;
  restaurant: string;
  address: string;
  phone: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "CUSTOMER" | "PROVIDER" | "ADMIN";
  providerProfile: ProviderProfile | null;
}
