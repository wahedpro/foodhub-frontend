import { Meal } from "../types/meal";
import { Provider } from "../types/provider";

const API = process.env.NEXT_PUBLIC_API_URL;

export const getProviders = async (): Promise<Provider[]> => {
  const res = await fetch(`${API}/providers`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch providers");
  }

  const json = await res.json();
  return json.data;
};




// export const getProviderById = async (
//   id: string
// ): Promise<ProviderDetails | null> => {
//   const res = await fetch(
//     `${API}/providers/${id}`,
//     { cache: "no-store" }
//   );

//   if (res.status === 404) return null;
//   if (!res.ok) throw new Error("Failed to fetch provider");

//   const json = await res.json();

//   return {
//     ...json,
//     meals: Array.isArray(json.meals) ? json.meals : [],
//   };
// };

export const getProviderById = async (
  id: string
): Promise<ProviderDetails | null> => {
  const res = await fetch(`${API}/providers/${id}`, {
    cache: "no-store",
  });

  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to fetch provider");

  const json = await res.json();

  return json.data ?? json;
};