import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import "../Navbar/Navbar";

export default function Search() {
  const navigate = useNavigate();
  const [word, setWord] = useState("");
  const handleChange = (e) => {
    setWord(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`result/${word}`);
  };
  return (
    <div className="form flex w-1/3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <form onSubmit={handleSubmit} className="w-full flex">
        <input
          type="text"
          placeholder="검색"
          value={word}
          onChange={handleChange}
          className="flex-1 rounded-l-full border-solid border px-3 py-2"
        />
        <button className="rounded-r-full border-solid border px-7 py-2">
          <IoIosSearch className="text-xl" />
        </button>
      </form>
    </div>
  );
}
