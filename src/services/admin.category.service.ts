import { Category } from "@/src/types/category";

const API = process.env.NEXT_PUBLIC_API_URL;

export const getCategories = async (): Promise<Category[]> => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API}/categories`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch categories");
  }

  return data.data;
};

export const createCategory = async (name: string) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API}/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to create category");
  }

  return data;
};

export const updateCategory = async (
  id: string,
  name: string
) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API}/categories/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to update category");
  }

  return data;
};

export const deleteCategory = async (id: string) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API}/categories/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to delete category");
  }

  return data;
};
