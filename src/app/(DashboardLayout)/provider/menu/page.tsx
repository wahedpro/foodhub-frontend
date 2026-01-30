"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/src/providers/AuthProvider";
import { getMeals } from "@/src/services/meal.service";
import { Meal } from "@/src/types/meal";
import MealFormModal from "@/src/components/provider/MealFormModal";
import DeleteConfirmModal from "@/src/components/provider/DeleteConfirmModal";
import { deleteMeal } from "@/src/services/meal.service";

export default function ProviderMenuPage() {
  const { user } = useAuth();

  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [mealToDelete, setMealToDelete] = useState<Meal | null>(null);

  // reusable fetch function
  const fetchMeals = useCallback(async () => {
    if (!user?.id) return;

    try {
      setLoading(true);
      const allMeals = await getMeals();

      // ✅ correct frontend filter
      const providerMeals = allMeals.filter(
        (meal) => meal.provider.userId === user.id,
      );

      setMeals(providerMeals);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);

  const openAddModal = () => {
    setMode("add");
    setSelectedMeal(null);
    setModalOpen(true);
  };

  const openEditModal = (meal: Meal) => {
    setMode("edit");
    setSelectedMeal(meal);
    setModalOpen(true);
  };

  const openDeleteModal = (meal: Meal) => {
    setMealToDelete(meal);
    setDeleteOpen(true);
  };

  const handleDelete = async () => {
    if (!mealToDelete) return;

    try {
      setDeleteLoading(true);
      await deleteMeal(mealToDelete.id);
      setDeleteOpen(false);
      setMealToDelete(null);
      fetchMeals(); // refresh list
    } catch (err) {
      console.error(err);
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return <p className="text-gray-500">Loading meals...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">My Menu</h1>
        <button
          onClick={openAddModal}
          className="rounded bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700"
        >
          + Add Meal
        </button>
      </div>

      {/* Table / Empty */}
      {meals.length === 0 ? (
        <p className="text-gray-500">You haven’t added any meals yet.</p>
      ) : (
        <div className="overflow-x-auto rounded border bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-3">Meal</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {meals.map((meal) => (
                <tr key={meal.id} className="border-t">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={meal.image}
                        alt={meal.name}
                        className="h-10 w-10 rounded object-cover"
                      />
                      <div>
                        <p className="font-medium">{meal.name}</p>
                        <p className="text-xs text-gray-500">
                          {meal.description}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-3">{meal.category?.name}</td>
                  <td className="px-4 py-3">৳ {meal.price}</td>

                  <td className="px-4 py-3 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(meal)}
                      className="rounded border px-3 py-1 text-xs hover:bg-gray-50"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => openDeleteModal(meal)}
                      className="rounded border border-red-300 px-3 py-1 text-xs text-red-600 hover:bg-red-50"
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

      {/* ✅ MODAL MUST BE INSIDE JSX */}
      <MealFormModal
        open={modalOpen}
        mode={mode}
        initialData={selectedMeal}
        onClose={() => setModalOpen(false)}
        onSuccess={fetchMeals}
      />
      <DeleteConfirmModal
        open={deleteOpen}
        title="Delete meal"
        description={`Are you sure you want to delete "${mealToDelete?.name}"?`}
        loading={deleteLoading}
        onCancel={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
