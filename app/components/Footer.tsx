"use client";
import { usePathname } from "next/navigation";

function Footer() {
  const pathname = usePathname() || "";

  const isAuthPage = pathname.startsWith("/auth");

  if (isAuthPage) {
    return null;
  }
  return (
    <footer className="bg-footerHeader min-h-10 flex justify-center items-center border-t border-gray-700 py-4">
      <p className="text-white">Copyright © SINCE 2024</p>
    </footer>
  );
}

export default Footer;
