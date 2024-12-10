"use client";
import { usePathname } from "next/navigation";

function Footer() {
  const pathname = usePathname() || "";

  const isAuthPage = pathname.startsWith("/auth");

  if (isAuthPage) {
    return null;
  }
  return (
    <footer className="bg-footerHeader min-h-10 flex justify-center items-center">
      <h2 className="text-white">©️ SINCE 2024</h2>
    </footer>
  );
}

export default Footer;
