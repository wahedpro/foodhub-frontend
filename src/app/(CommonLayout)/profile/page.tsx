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
    <div className="max-w-xl mx-auto py-8 space-y-8">
       <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-gray-900">
            My Profile
          </h2>
          <p className="mt-2 text-gray-600">
            Manage your profile information
          </p>
        </div>

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
          className="w-full bg-[#e10101] text-white py-2 rounded hover:bg-[#99040d]"
        >
          Save Profile
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
