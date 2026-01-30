export type User = {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "PROVIDER" | "CUSTOMER";
  isActive: boolean;
};
