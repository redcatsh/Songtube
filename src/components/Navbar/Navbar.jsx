import React from "react";
import { Link } from "react-router-dom";
import Search from "../Search/Search";
import { AiFillYoutube } from "react-icons/ai";
import "./Navbar.css";
export default function Navbar() {
  return (
    <header className="fixed w-full">
      <div className="nav w-full flex py-3 justify-start items-center relative">
        <Link to="/" className="logo flex items-center font-bold">
          <AiFillYoutube className="logoImg" />
          SongTube
        </Link>
        <Search />
      </div>
    </header>
  );
}
