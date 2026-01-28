"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full border-b border-gray-200 bg-white">
      <div className="w-[80%] mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="text-xl font-semibold text-gray-900">
          FoodHub
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-sm text-gray-700">
          <Link href="/" className="hover:text-indigo-600">
            Home
          </Link>
          <Link href="/meals" className="hover:text-indigo-600">
            Meals
          </Link>
          <Link href="/login" className="hover:text-indigo-600">
            Login
          </Link>
          <Link
            href="/register"
            className="rounded bg-indigo-600 px-4 py-1.5 text-white hover:bg-indigo-700"
          >
            Register
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t bg-white px-4 py-3 space-y-3 text-sm">
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
            className="block rounded bg-indigo-600 px-4 py-2 text-center text-white hover:bg-indigo-700"
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
