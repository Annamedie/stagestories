"use client";
import { useAuth } from "../context/Authcontext";

function LogOutButton() {
  const { logout, user } = useAuth();
  if (user) {
    return <button onClick={logout}>Log Out</button>;
  }
}
export default LogOutButton;
