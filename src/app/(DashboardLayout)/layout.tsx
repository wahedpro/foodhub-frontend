"use client";

import { useAuth } from "@/src/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const DashboardLayout = ({
  admin,
  provider,
}: {
  admin: React.ReactNode;
  provider: React.ReactNode;
}) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) router.push("/login");
      else if (user.role === "CUSTOMER") router.push("/");
    }
  }, [user, loading, router]);

  if (loading) return <p>Loading...</p>;

  if (user?.role === "ADMIN") {
    return <>{admin}</>;
  }

  if (user?.role === "PROVIDER") {
    return <>{provider}</>;
  }

  return null;
};

export default DashboardLayout;