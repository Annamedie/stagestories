"use client";
import { getAuth } from "firebase/auth";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/Authcontext";
import LogOutButton from "./LogOutButton";

function ProfileButton() {
  const { username } = useAuth();
  const [isOpened, setIsOpened] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
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

  if (!user) {
    return null;
  }
  const userId = user.uid;

  return (
    <div className="relative m-4" ref={dropdownRef}>
      <button
        onClick={() => setIsOpened((prev) => !prev)}
        className="w-16 h-16 bg-card1 rounded-full text-3xl font-lacquer font-bold text-black flex items-center justify-center hover:rotate-45 transform transition-transform"
      >
        {firstLetter}
      </button>

      {isOpened && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10">
          <Link
            href={`/profile/${userId}/${username}`}
            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            onClick={() => setIsOpened(false)}
          >
            Profile
          </Link>
          <div className="px-4 py-2 text-gray-800 hover:bg-gray-100">
            <LogOutButton />
          </div>
          <Link href={"/admin"}>
            <div className="px-4 py-2 text-gray-800 hover:bg-gray-100">
              <p>Admin</p>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}

export default ProfileButton;
