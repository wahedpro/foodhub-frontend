"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

import { CreditCard, LogOut, Settings, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useAuth } from "@/src/providers/AuthProvider";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <nav className="w-full border-b bg-white sticky top-0 z-50">
      <div className="mx-auto w-[93%] flex items-center justify-between py-3">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-indigo-600">
          FoodHub
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
          <Link href="/" className="hover:text-indigo-600 transition">
            Home
          </Link>
          <Link href="/meals" className="hover:text-indigo-600 transition">
            Meals
          </Link>

          <Link href="/providers" className="hover:text-indigo-600 transition">
            Providers
          </Link>

          {/* User Dropdown */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-full border px-2 py-2 hover:bg-gray-100 transition">
                  <User size={16} />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-48 rounded-lg border bg-white p-2 shadow-lg flex flex-col gap-1"
              >
                <DropdownMenuItem className="gap-2 cursor-pointer  hover:bg-gray-100 py-1 px-1 rounded-sm">
                  <Link href="/profile" className="flex items-center gap-2">
                    <User size={16} /> Profile
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem className="gap-2 cursor-pointer flex items-center hover:bg-gray-100 py-1 px-1 rounded-sm">
                  <Link href="/cart" className="flex items-center gap-2">
                    <CreditCard size={16} /> Cart
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem className="gap-2 cursor-pointer flex items-center hover:bg-gray-100 py-1 px-1 rounded-sm">
                  
                  <Link href="/orders" className="flex items-center gap-2">
                    <Settings size={16} /> Track Order
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem className=" hover:bg-gray-100 py-1 px-1 rounded-sm">
                  <button onClick={logout} className="flex items-center gap-2 cursor-pointer "><LogOut size={16} /> Log out </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              href="/register"
              className="block rounded-md bg-indigo-600 py-2 px-3 text-center text-white hover:bg-indigo-700"
            >
              Register
            </Link>
          )}
        </div>
        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t bg-white px-6 py-4 space-y-4 text-sm">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="block text-gray-700 hover:text-indigo-600"
          >
            Home
          </Link>

          <Link
            href="/meals"
            onClick={() => setOpen(false)}
            className="block text-gray-700 hover:text-indigo-600"
          >
            Meals
          </Link>

          <Link
            href="/login"
            onClick={() => setOpen(false)}
            className="block text-gray-700 hover:text-indigo-600"
          >
            Login
          </Link>

          <Link
            href="/register"
            onClick={() => setOpen(false)}
            className="block rounded-md bg-indigo-600 py-2 text-center text-white hover:bg-indigo-700"
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
