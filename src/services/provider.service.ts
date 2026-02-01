import { Provider } from "../types/provider";


const API = "http://localhost:4000/api/providers";

export const getProviders = async (): Promise<Provider[]> => {
  const res = await fetch(API, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch providers");
  }

  const json = await res.json();
  return json.data;
};
