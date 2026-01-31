"use client";

import { useEffect, useState } from "react";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/src/services/admin.category.service";
import { Category } from "@/src/types/category";
import CategoryModal from "@/src/components/admin/CategoryModal";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [selected, setSelected] = useState<Category | null>(null);

  const fetchCategories = async () => {
    setLoading(true);
    const data = await getCategories();
    setCategories(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAdd = async (name: string) => {
    await createCategory(name);
    fetchCategories();
  };

  const handleEdit = async (name: string) => {
    if (!selected) return;
    await updateCategory(selected.id, name);
    fetchCategories();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this category?")) return;
    await deleteCategory(id);
    fetchCategories();
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Manage Categories</h1>
        <button
          onClick={() => {
            setMode("add");
            setSelected(null);
            setModalOpen(true);
          }}
          className="rounded bg-indigo-600 px-4 py-2 text-sm text-white"
        >
          + Add Category
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading categories...</p>
      ) : categories.length === 0 ? (
        <p className="text-gray-500">No categories found.</p>
      ) : (
        <div className="rounded border bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c) => (
                <tr key={c.id} className="border-t">
                  <td className="px-4 py-3">{c.name}</td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button
                      onClick={() => {
                        setMode("edit");
                        setSelected(c);
                        setModalOpen(true);
                      }}
                      className="rounded border px-3 py-1 text-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="rounded border border-red-300 px-3 py-1 text-xs text-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <CategoryModal
        open={modalOpen}
        mode={mode}
        initialName={selected?.name}
        onClose={() => setModalOpen(false)}
        onSubmit={mode === "add" ? handleAdd : handleEdit}
      />
    </div>
  );
}
