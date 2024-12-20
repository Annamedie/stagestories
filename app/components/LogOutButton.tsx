"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/Authcontext";
function LogOutButton() {
  const { logout, user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/auth/login");
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  if (user) {
    return (
      <button
        className="focus:outline focus:outline-2 focus:outline-buttonDarkHover"
        onClick={handleLogout}
      >
        Log Out
      </button>
    );
  }
}
export default LogOutButton;
