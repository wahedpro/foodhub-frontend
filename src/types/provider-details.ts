import { Meal } from "./meal";

export type ProviderDetails = {
  id: string;
  restaurant: string;
  address: string;
  phone: string;
  meals: Meal[];
};