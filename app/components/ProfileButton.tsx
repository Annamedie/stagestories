"use client";
import { useAuth } from "../context/Authcontext";

function ProfileButton() {
  const { username } = useAuth();
  const firstLetter = username ? username.charAt(0).toUpperCase() : "S";

  return (
    <button className="w-16 h-16 bg-blue-500 rounded-full text-white font-bold flex items-center justify-center hover:bg-blue-600 ">
      {firstLetter}
    </button>
  );
}

export default ProfileButton;
