import Link from "next/link";

function AddConcertButton() {
  return (
    <Link href="/add-concert">
      <button className="relative inline-block px-8 py-3 font-medium text-white group">
        {/* Background Gradient */}
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-600 rounded-full shadow-lg group-hover:from-blue-600 group-hover:via-cyan-500 group-hover:to-teal-400 transition-transform duration-300 transform group-hover:scale-110 animate-pulse"></span>

        {/* Glow Effect */}
        <span className="absolute inset-0 w-full h-full rounded-full blur-md opacity-50 bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-600"></span>

        {/* Border */}
        <span className="absolute inset-0 w-full h-full rounded-full border-2 border-white"></span>

        {/* Button Text */}
        <span className="relative text-lg tracking-wide uppercase">
          Add Concert
        </span>
      </button>
    </Link>
  );
}
export default AddConcertButton;
