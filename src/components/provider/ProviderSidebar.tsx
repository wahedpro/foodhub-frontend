"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarLinks = [
  {
    label: "Dashboard",
    href: "/provider/dashboard",
  },
  {
    label: "Menu",
    href: "/provider/menu",
  },
  {
    label: "Orders",
    href: "/provider/orders",
  },
];

export default function ProviderSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r min-h-screen p-6">
      {/* Logo / Title */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-indigo-600">
          FoodHub
        </h1>
        <p className="text-xs text-gray-500">Provider Panel</p>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`block rounded px-4 py-2 text-sm font-medium transition
                ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                }
              `}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
