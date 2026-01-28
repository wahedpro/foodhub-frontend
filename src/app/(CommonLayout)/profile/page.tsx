"use client";

import { useState } from "react";

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "01700000000",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // API integration later
    setTimeout(() => {
      setLoading(false);
      alert("Profile updated successfully!");
    }, 800);
  };

  return (
    <div className="flex  flex-col items-center justify-center py-10">
      <h1 className="text-2xl font-semibold text-gray-900">Manage Profile</h1>
      <p className="mt-2 text-gray-600">Update your personal information</p>

      <div className="mt-5 rounded-xl bg-white p-6 border">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="text-sm text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 w-full rounded border px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              disabled
              value={formData.email}
              className="mt-1 w-full rounded border bg-gray-100 px-3 py-2 text-sm cursor-not-allowed"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 w-full rounded border px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`mt-4 rounded px-5 py-2 text-sm font-medium text-white
              ${
                loading
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
