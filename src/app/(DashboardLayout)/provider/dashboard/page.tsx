"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/src/providers/AuthProvider";
import ProviderProfileModal from "@/src/providers/ProviderProfileModal";

export default function ProviderDashboard() {
  const { user, setUser } = useAuth(); // GLOBAL user
  const [showModal, setShowModal] = useState(false);

  //  Modal open logic (ONLY when profile is missing)
  useEffect(() => {
    if (!user) return;

    if (user.role === "PROVIDER" && user.providerProfile === null) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [user]);

  // optional debug
  console.log("ProviderDashboard user:", user);

  // user load check
  if (!user) {
    return <div className="p-6 text-gray-500">Loading dashboard...</div>;
  }

  return (
    <>
      {/* Provider profile modal */}
      <ProviderProfileModal
        open={showModal}
        onSuccess={(profile) => {
          //  VERY IMPORTANT: update GLOBAL user
          setUser({
            ...user,
            providerProfile: user.providerProfile ?? null,
          });

          setShowModal(false);
        }}
      />

      {/* Dashboard content */}
      <div>
        <h1 className="text-3xl font-bold mb-6">Provider Dashboard</h1>
      </div>
    </>
  );
}

function Stat({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded border bg-white p-4 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </div>
  );
}
