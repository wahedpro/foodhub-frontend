// for the register
export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  role: "CUSTOMER" | "PROVIDER";
};

// for the login
export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "PROVIDER" | "CUSTOMER";
  };
};
