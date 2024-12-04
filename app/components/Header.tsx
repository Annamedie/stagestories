"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogOutButton from "./LogOutButton";
import ProfileButton from "./ProfileButton";

function Header() {
  const pathname = usePathname() || "";

  const isAuthPage = pathname.startsWith("/auth");

  if (isAuthPage) {
    return null;
  }
  return (
    <header className="bg-slate-600">
      <Link href="/">
        <h1>Stage Stories</h1>
      </Link>
      <LogOutButton />
      <ProfileButton />
    </header>
  );
}

export default Header;
