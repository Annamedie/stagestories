import Link from "next/link";
import LogOutButton from "./LogOutButton";

function Header() {
  return (
    <header className="bg-slate-600">
      <Link href="/">
        <h1>Stage Stories</h1>
      </Link>
      <LogOutButton />
    </header>
  );
}

export default Header;
