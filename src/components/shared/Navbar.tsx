"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, User, CreditCard, Settings, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useAuth } from "@/src/providers/AuthProvider";

const Navbar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 h-15 w-full bg-white">
      <div className="mx-auto flex h-full md:w-[80%] items-center justify-between px-6 md:px-16 lg:px-24">
        
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-[#e10101]">
          FoodHub
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-10 text-[#e10101] text-sm">
          <li>
            <Link href="/" className="hover:text-black hover:text-base transition">
              Home
            </Link>
          </li>
          <li>
            <Link href="/meals" className="hover:text-black hover:text-base transition">
              Meals
            </Link>
          </li>
          <li>
            <Link href="/providers" className="hover:text-black hover:text-base  transition">
              Providers
            </Link>
          </li>
        </ul>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e10101] text-white hover:opacity-90">
                  <User size={18} />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="mt-2 w-48 rounded-lg bg-white p-2 shadow-lg flex flex-col gap-1"
              >
                <DropdownMenuItem className="cursor-pointer rounded px-2 py-1 hover:bg-gray-100">
                  <Link href="/profile" className="flex items-center gap-2">
                    <User size={16} /> Profile
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem className="cursor-pointer rounded px-2 py-1 hover:bg-gray-100">
                  <Link href="/cart" className="flex items-center gap-2">
                    <CreditCard size={16} /> Cart
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem className="cursor-pointer rounded px-2 py-1 hover:bg-gray-100">
                  <Link href="/orders" className="flex items-center gap-2">
                    <Settings size={16} /> Track Order
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem className="cursor-pointer rounded px-2 py-1 hover:bg-gray-100">
                  <button
                    onClick={logout}
                    className="flex w-full items-center gap-2"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              href="/register"
              className="flex h-11 w-30 items-center justify-center rounded-full bg-[#e10101] text-sm text-white hover:opacity-90 active:scale-95 transition"
            >
              Register
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-[#e10101] active:scale-90 transition"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-[60px] left-0 w-full bg-white p-6 md:hidden">
          <ul className="flex flex-col space-y-4 text-[#e10101] text-sm">
            <li>
              <Link href="/" onClick={() => setOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/meals" onClick={() => setOpen(false)}>
                Meals
              </Link>
            </li>
            <li>
              <Link href="/providers" onClick={() => setOpen(false)}>
                Providers
              </Link>
            </li>
          </ul>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e10101] text-white hover:opacity-90">
                  <User size={18} />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="mt-2 w-48 rounded-lg bg-white p-2 shadow-lg flex flex-col gap-1"
              >
                <DropdownMenuItem className="cursor-pointer rounded px-2 py-1 hover:bg-gray-100">
                  <Link href="/profile" className="flex items-center gap-2">
                    <User size={16} /> Profile
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem className="cursor-pointer rounded px-2 py-1 hover:bg-gray-100">
                  <Link href="/cart" className="flex items-center gap-2">
                    <CreditCard size={16} /> Cart
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem className="cursor-pointer rounded px-2 py-1 hover:bg-gray-100">
                  <Link href="/orders" className="flex items-center gap-2">
                    <Settings size={16} /> Track Order
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem className="cursor-pointer rounded px-2 py-1 hover:bg-gray-100">
                  <button
                    onClick={logout}
                    className="flex w-full items-center gap-2"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              href="/register"
              className="flex h-11 w-30 items-center justify-center rounded-full bg-[#e10101] text-sm text-white hover:opacity-90 active:scale-95 transition"
            >
              Register
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
