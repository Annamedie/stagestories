import Link from "next/link";

function AddConcertButton() {
  return (
    <Link href="/add-concert">
      <button className="relative inline-block px-8 py-3 font-medium text-white group">
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg group-hover:from-purple-600 group-hover:to-blue-500 transition-transform duration-300 transform group-hover:scale-110"></span>
        <span className="absolute inset-0 w-full h-full rounded-lg border-2 border-white"></span>
        <span className="relative">Add concert</span>
      </button>
    </Link>
  );
}
export default AddConcertButton;
