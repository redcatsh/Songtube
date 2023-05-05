import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
export default function Search() {
  const navigate = useNavigate();
  const [word, setWord] = useState("");
  const handleChange = (e) => {
    setWord(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/${word}`);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="검색"
          value={word}
          onChange={handleChange}
        />
        <button>
          <IoIosSearch />
        </button>
      </form>
    </div>
  );
}
