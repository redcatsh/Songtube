import React, { useState } from "react";
import { Link } from "react-router-dom";
import Search from "../Search/Search";
import { AiFillYoutube } from "react-icons/ai";
import "@theme-toggles/react/css/Expand.css";
import { Expand } from "@theme-toggles/react";
import "./Navbar.css";
import { useDarkMode } from "../../context/DarkModeContext";
export default function Navbar() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [isToggled] = useState(true);
  return (
    <header className="sticky w-full top-0">
      <div className="nav w-full flex py-3 justify-between items-center relative">
        <Link to="/" className="logo flex items-center font-bold">
          <AiFillYoutube className="logoImg" />
          SongTube
        </Link>
        <Search />
        <div onClick={toggleDarkMode} className="h-[20px]">
          {darkMode ? (
            <Expand
              duration={750}
              toggled={isToggled}
              className="mode text-xl"
            />
          ) : (
            <Expand duration={750} className="mode text-xl" />
          )}
        </div>
      </div>
    </header>
  );
}
