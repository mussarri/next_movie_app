"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';



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
        "p-5 pr-10 fixed top-0 z-40 w-full h-20 mx-auto transition-colors ease-in-out duration-300" +
        (scrollPosition > 50 ? " bg-gray-900" : " bg-transparent")
      }
    >
      <div className="flex justify-between items-center max max-w-6xl mx-auto">
        <Link href={"/"}>
          <div className="logo text-3xl text-red-600 font-bold">
            {/* <Image
            width={100}
            height={100}
            src={
              "https://i0.wp.com/thefulcrum.ca/wp-content/uploads/2022/09/netflix_logo.png?fit=2500%2C1370&ssl=1"
            }
          /> */}
            MOVIE APP
          </div>
        </Link>
        <div className="flex rounded gap-5 bg-black">
          <span className="p-2"><SearchIcon /></span>
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
