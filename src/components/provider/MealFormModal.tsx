"use client";

import { useEffect, useState } from "react";
import { createMeal, updateMeal } from "@/src/services/meal.service";
import { Meal } from "@/src/types/meal";
import { getCategories } from "@/src/services/admin.category.service";
import { Category } from "@/src/types/category";

type Props = {
  open: boolean;
  mode: "add" | "edit";
  initialData?: Meal | null;
  onClose: () => void;
  onSuccess: () => void;
};

export default function MealFormModal({
  open,
  mode,
  initialData,
  onClose,
  onSuccess,
}: Props) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    categoryId: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch {
        console.error("Failed to load categories");
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData({
        name: initialData.name,
        description: initialData.description,
        price: String(initialData.price),
        image: initialData.image,
        categoryId: initialData.categoryId,
      });
    }

    if (mode === "add") {
      setFormData({
        name: "",
        description: "",
        price: "",
        image: "",
        categoryId: "",
      });
    }
  }, [mode, initialData]);

  if (!open) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        image: formData.image,
        categoryId: formData.categoryId,
      };

      if (mode === "add") {
        await createMeal(payload);
      } else if (mode === "edit" && initialData) {
        await updateMeal(initialData.id, payload);
      }

      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded bg-white p-6">
        <h2 className="text-xl font-semibold mb-4">
          {mode === "add" ? "Add Meal" : "Edit Meal"}
        </h2>

        {error && (
          <p className="mb-3 text-sm text-red-600">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="name"
            placeholder="Meal name"
            className="w-full rounded border px-3 py-2"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            className="w-full rounded border px-3 py-2"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <input
            name="price"
            type="number"
            placeholder="Price"
            className="w-full rounded border px-3 py-2"
            value={formData.price}
            onChange={handleChange}
            required
          />

          <input
            name="image"
            placeholder="Image URL"
            className="w-full rounded border px-3 py-2"
            value={formData.image}
            onChange={handleChange}
            required
          />

          {/* Category dropdown */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Category
            </label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className="w-full rounded border px-3 py-2"
              required
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded border px-4 py-2"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded bg-indigo-600 px-4 py-2 text-white"
            >
              {loading
                ? "Saving..."
                : mode === "add"
                ? "Add Meal"
                : "Update Meal"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}