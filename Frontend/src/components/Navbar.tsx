import { useState } from "react";
import { NavLink } from "react-router-dom";

interface NavNavbarProps {
  activeTab: string;
}

export const Navbar = ({ activeTab }: NavNavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center relative h-24 z-20 bg-[#121618] px-6 lg:px-24 xl:px-40 md:px-16 transition-all duration-300">
      <NavLink to={"/"}>
        <div className="flex items-center h-[5.5rem] absolute -bottom-[2.75rem] left-[45%] md:left-0 md:-bottom-12 md:relative md:h-auto z-300">
          <img src="/logo.svg" alt="Logo" className="w-16 md:w-[5.5rem]" />
          <div className="ml-2 md:block hidden text-4xl ">
            <p className="flex gap-1">
              <span className="font-oswald text-[#0796EF] tracking-wide">
                DEEP
              </span>
              <span> </span>
              <span className="font-oswald text-white tracking-wide">NET</span>
            </p>
            <p className="text-[#857878] font-oswald tracking-wide">SOFT</p>
          </div>
        </div>
      </NavLink>

      <div className="md:hidden flex items-center justify-end z-20">
        <button
          className="text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>
      </div>

      <div
        className={`flex-col md:flex-row md:flex md:items-end gap-6 font-oswald text-lg bg-[#121618] text-white absolute md:mt-6 top-20 left-0 w-full md:static md:bg-transparent md:top-auto md:left-auto md:w-auto md:pb-0 transition-all duration-300 ${
          isMenuOpen ? "flex" : "hidden"
        }`}
      >
        <p className="hover:text-gray-300 px-6 md:px-0">HOME</p>
        <p
          className={`${
            activeTab === "MENU" ? "text-blue-500" : ""
          } hover:text-gray-300 px-6 md:px-0`}
        >
          MENU
        </p>
        <p className="hover:text-gray-300 px-6 md:px-0">MAKE A RESERVATION</p>
        <p className="hover:text-gray-300 px-6 md:px-0">CONTACT US</p>
      </div>
    </nav>
  );
};
