import { User } from "@/src/types/user";

const API = process.env.NEXT_PUBLIC_API_URL;

export const getAllUsers = async (): Promise<User[]> => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API}/admin/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch users");
  }

  return data.data;
};

export const updateUserStatus = async (
  userId: string,
  isActive: boolean
) => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${API}/admin/users/${userId}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ isActive }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to update status");
  }

  return data;
};
