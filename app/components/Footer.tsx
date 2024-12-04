"use client";
import { usePathname } from "next/navigation";

function Footer() {
  const pathname = usePathname() || "";

  const isAuthPage = pathname.startsWith("/auth");

  if (isAuthPage) {
    return null;
  }
  return (
    <footer className="bg-pink-300">
      <h2>C sedan 2024</h2>
    </footer>
  );
}

export default Footer;
