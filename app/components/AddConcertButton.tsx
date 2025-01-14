"use client";

import Link from "next/link";
import { useAuth } from "../context/Authcontext";

function AddConcertButton() {
  const { user, isloading } = useAuth();

  if (isloading) {
    return null;
  }
  if (!user) {
    return null;
  }

  return (
    <div className="flex justify-start items-center mx-4">
      <Link
        href="/add-concert"
        className="relative inline-block px-8 py-3 font-medium text-white group rounded-full"
      >
        {/* Background Gradient */}
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-teal-800 via-cyan-700 to-blue-600 rounded-full shadow-lg group-hover:from-blue-600 group-hover:via-cyan-700 group-hover:to-teal-800 transition-transform duration-300 transform group-hover:scale-110"></span>

        {/* Glow Effect */}
        <span className="absolute inset-0 w-full h-full rounded-full blur-md opacity-50 bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-600"></span>

        {/* Border */}
        <span className="absolute inset-0 w-full h-full rounded-full border-2 border-white"></span>

        {/* Button Text */}
        <span className="relative text-lg tracking-wide uppercase">
          Add New Concert
        </span>
      </Link>
    </div>
  );
}
export default AddConcertButton;
