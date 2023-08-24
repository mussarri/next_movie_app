"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

function Header() {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={
        "p-5 pr-10 fixed top-0 z-40 w-full  h-20 mx-auto transition-colors ease-in-out duration-300" +
        (scrollPosition > 50 ? " bg-gray-900" : " bg-transparent")
      }
    >
      <div className="px-14 flex justify-between items-center max-w-7xl mx-auto">
        <Link href={"/"}>
          <div className="logo text-3xl text-red-600 font-bold">MOVIE APP</div>
        </Link>
        <div className="flex rounded gap-5 bg-black/50">
          <span className="p-2">
            <SearchIcon />
          </span>
          <input
            type="text"
            placeholder="Search"
            className="py-2 rounded bg-transparent outline-none"
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
