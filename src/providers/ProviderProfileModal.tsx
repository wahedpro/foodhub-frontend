"use client";

import { useState } from "react";
import { toast } from "sonner";

interface ProviderProfileModalProps {
  open: boolean;
  onSuccess: (profile: any) => void;
}

export default function ProviderProfileModal({
  open,
  onSuccess,
}: ProviderProfileModalProps) {
  const [restaurant, setRestaurant] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = async () => {
    if (!restaurant || !address || !phone) {
      toast.warning("All fields are required");
      return;
    }

    setLoading(true);


    try {
      const res = await fetch(
        'http://localhost:4000/api/provider/profile',
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            restaurant,
            address,
            phone,
          }),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(
          result.message || "Failed to create provider profile"
        );
      }

      toast.success("Provider profile created successfully");
      onSuccess(result.data);
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold">
          Complete Provider Profile
        </h2>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="Restaurant name"
            value={restaurant}
            onChange={(e) => setRestaurant(e.target.value)}
            className="w-full rounded border px-3 py-2"
          />

          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full rounded border px-3 py-2"
          />

          <input
            type="text"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded border px-3 py-2"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-5 w-full rounded bg-indigo-600 py-2 text-white disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save & Continue"}
        </button>
      </div>
    </div>
  );
}
