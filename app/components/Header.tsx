"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ProfileButton from "./ProfileButton";

function Header() {
  const pathname = usePathname() || "";

  const isAuthPage = pathname.startsWith("/auth");

  if (isAuthPage) {
    return null;
  }
  return (
    <header className="bg-footerHeader flex justify-between items-center">
      <Link href="/">
        <h1 className="font-lacquer text-primary m-4 text-4xl">
          Stage Stories
        </h1>
      </Link>

      <ProfileButton />
    </header>
  );
}

export default Header;
