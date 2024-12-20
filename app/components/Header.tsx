"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import AddConcertButton from "./AddConcertButton";
import ProfileButton from "./ProfileButton";

function Header() {
  const pathname = usePathname() || "";

  const isAuthPage = pathname.startsWith("/auth");

  if (isAuthPage) {
    return null;
  }
  return (
    <header className="bg-footerHeader flex justify-between items-center sticky top-0 z-10">
      <Link href="/" aria-label="Navigate to Stage Stories home page">
        <h1 className="font-lacquer text-primary m-4 text-4xl">
          Stage Stories
        </h1>
      </Link>
      <div className="flex items-center">
        <div className="hidden md:block">
          <AddConcertButton />
        </div>
        <ProfileButton />
      </div>
    </header>
  );
}

export default Header;
