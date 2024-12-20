"use client";
import { getAuth } from "firebase/auth";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/Authcontext";
import LogOutButton from "./LogOutButton";

function ProfileButton() {
  const { username, isAdmin } = useAuth();
  const [isOpened, setIsOpened] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstLetter = username ? username.charAt(0).toUpperCase() : "S";
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpened(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpened(false);
      buttonRef.current?.focus();
    } else if (e.key === "ArrowDown" && !isOpened) {
      setIsOpened(true);
    }
  };

  if (!user) {
    return null;
  }
  const userId = user.uid;

  return (
    <div className="relative m-4" ref={dropdownRef}>
      <button
        ref={buttonRef}
        onClick={() => setIsOpened((prev) => !prev)}
        onKeyDown={handleKeyDown}
        className="w-16 h-16 bg-card1 rounded-full text-3xl font-lacquer font-bold text-black flex items-center justify-center hover:rotate-45 transform transition-transform"
        aria-expanded={isOpened}
        aria-controls="dropdown-menu"
      >
        {firstLetter}
      </button>

      <div aria-live="polite" className="sr-only">
        {isOpened ? "Dropdown is open" : "Dropdown is closed"}
      </div>
      {isOpened && (
        <div
          id="dropdown-menu"
          role="menu"
          className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10"
        >
          <Link
            href={`/profile/${userId}/${username}`}
            className="block px-4 py-2 text-gray-800 hover:bg-gray-100 focus:outline focus:outline-2 focus:outline-buttonDarkHover"
            onClick={() => setIsOpened(false)}
            role="menuitem"
          >
            Profile
          </Link>
          <Link
            href="/add-concert"
            className="md:hidden block px-4 py-2 text-gray-800 hover:bg-gray-100 focus:outline focus:outline-2 focus:outline-buttonDarkHover"
            onClick={() => setIsOpened(false)}
            role="menuitem"
          >
            Add New Concert
          </Link>
          <div
            role="menuitem"
            className="px-4 py-2 text-gray-800 hover:bg-gray-100 focus:outline focus:outline-2 focus:outline-buttonDarkHover"
          >
            <LogOutButton />
          </div>
          {isAdmin && (
            <div
              role="menuitem"
              className="px-4 py-2 text-gray-800 hover:bg-gray-100 focus:outline focus:outline-2 focus:outline-buttonDarkHover"
            >
              <Link href={"/admin"}>
                <p>Admin</p>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ProfileButton;
