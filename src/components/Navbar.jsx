import React from "react";
import { Link } from "react-router-dom";
import Search from "./Search/Search";

export default function Navbar() {
  return (
    <header>
      <Link to="/">Songtube</Link>
      <Search />
    </header>
  );
}
