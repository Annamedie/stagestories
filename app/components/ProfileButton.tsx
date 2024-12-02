"use client";
import { getAuth } from "firebase/auth";
import Link from "next/link";
import { useAuth } from "../context/Authcontext";

function ProfileButton() {
  const { username } = useAuth();
  const firstLetter = username ? username.charAt(0).toUpperCase() : "S";
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) {
    return null;
  }
  const userId = user.uid;

  return (
    <Link href={`/profile/${userId}/${username}`}>
      <button className="w-16 h-16 bg-blue-500 rounded-full text-white font-bold flex items-center justify-center hover:bg-blue-600 ">
        {firstLetter}
      </button>
    </Link>
  );
}

export default ProfileButton;
