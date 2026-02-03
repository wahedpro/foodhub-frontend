"use client";

import { useAuth } from "@/src/providers/AuthProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarLinks = [
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

  const {logout}= useAuth();

  return (
    <aside className="w-64 bg-white border-r min-h-screen p-6">
      {/* Logo / Title */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-[#e10101]">
          FoodHub
        </h1>
        <p className="text-xs text-gray-500">Provider Panel</p>
      </div>

      {/* Navigation */}
      <nav className="space-y-2 mb-10">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`block rounded px-4 py-2 text-sm font-medium transition
                ${
                  isActive
                    ? "bg-[#e10101] text-white"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }
              `}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
      <button type="submit" onClick={logout} className="px-3 py-2 w-full rounded-2xl bg-[#e10101] text-white hover:bg-[#99040d]">Logout</button>
    </aside>
  );
}
