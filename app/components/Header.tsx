import Link from "next/link";
import LogOutButton from "./LogOutButton";
import ProfileButton from "./ProfileButton";

function Header() {
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
