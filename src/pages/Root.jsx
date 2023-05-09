import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import "../index.css";

export default function Root() {
  return (
    <div className="container">
      <Navbar />
      <Outlet />
    </div>
  );
}
