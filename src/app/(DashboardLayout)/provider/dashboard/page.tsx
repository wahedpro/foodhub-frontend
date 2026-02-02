"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/src/providers/AuthProvider";
import ProviderProfileModal from "@/src/providers/ProviderProfileModal";

export default function ProviderDashboard() {
  const { user, setUser } = useAuth(); // ✅ THIS IS THE KEY
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (
      user &&
      user.role === "PROVIDER" &&
      !user.providerProfile
    ) {
      setShowModal(true);
    }
  }, [user]);

  console.log(user, "provider dashboard user");

  if (!user) return null; // or loader

  return (
    <>
      {/* Provider profile modal */}
      <ProviderProfileModal
        open={showModal}
        onSuccess={(profile) => {
          setShowModal(false);

          // ✅ update auth context (GLOBAL)
          setUser({
            ...user,
            providerProfile: profile,
          });
        }}
      />

      {/* Dashboard content */}
      <div>
        <h1 className="text-2xl font-semibold mb-6">
          Provider Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Stat title="Total Meals" value="12" />
          <Stat title="Pending Orders" value="5" />
          <Stat title="Completed Orders" value="48" />
        </div>
      </div>
    </>
  );
}

function Stat({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded border bg-white p-4 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="mt-2 text-2xl font-semibold">
        {value}
      </p>
    </div>
  );
}
