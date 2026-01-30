"use client";

import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Overview and quick actions
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Users" value="—" />
        <StatCard title="Active Users" value="—" />
        <StatCard title="Providers" value="—" />
        <StatCard title="Customers" value="—" />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold mb-4">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ActionCard
            title="Manage Users"
            description="View and suspend / activate users"
            href="/admin/users"
          />

          <ActionCard
            title="View Orders"
            description="See all orders across the platform"
            href="/admin/orders"
          />

          <ActionCard
            title="Manage Categories"
            description="Create and manage food categories"
            href="/admin/categories"
          />
        </div>
      </div>
    </div>
  );
}

/* =========================
   Reusable Components
========================= */

function StatCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded border bg-white p-4">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="mt-2 text-2xl font-semibold">
        {value}
      </p>
    </div>
  );
}

function ActionCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="rounded border bg-white p-5 hover:shadow-sm transition"
    >
      <h3 className="font-medium">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">
        {description}
      </p>
    </Link>
  );
}
