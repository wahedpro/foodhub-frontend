"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/providers/AuthProvider";
import { toast } from "sonner";

const ProfilePage = () => {
  const { user, setUser } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      setName(user.name);
    }
  }, [user, router]);

  const updateProfile = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ name }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error();

      setUser(data.data);
      toast.success("Profile updated successfully");
    } catch {
      toast.error("Profile update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">My Profile</h1>

      {/* Profile Info */}
      <div className="border rounded p-4 space-y-3">
        <h2 className="font-semibold">Profile Info</h2>

        <input
          value={user.email}
          disabled
          className="w-full border p-2 bg-gray-100 rounded"
        />

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
          placeholder="Your name"
        />

        <button
          onClick={updateProfile}
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          Save Profile
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
