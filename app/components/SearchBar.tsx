import { FC } from "react";
import SearchGlass from "../svg/SearchGlass.svg";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className="my-4 bg-black p-4 rounded-md shadow-md">
      {/* Visually hidden label for screen readers */}
      <label htmlFor="search" className="sr-only text-white">
        Search by artist or band
      </label>

      <div className="relative">
        <SearchGlass />
        <input
          id="search"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search by artist or band or genre etc"
          aria-label="Search by artist or band etc"
          className="w-full border-2 border-cyan-500 rounded pl-10 pr-3 py-2 bg-white text-black placeholder-gray-500 
                         focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
        />
      </div>
    </div>
  );
};
export default SearchBar;
