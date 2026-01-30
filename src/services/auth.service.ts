import { LoginPayload, LoginResponse, RegisterPayload } from "../types/auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const registerUser = async (payload: RegisterPayload) => {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Registration failed");
  }

  return data;
};

// for the login
export const loginUser = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data.data;
};

