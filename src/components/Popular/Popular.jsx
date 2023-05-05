import React from "react";
import { useQuery } from "@tanstack/react-query";
export default function Popular() {
  const {
    isLoading,
    error,
    data: popular,
  } = useQuery(["popular"], async () => {
    console.log("data");
    return fetch(`data/popular.json`).then((res) => res.json());
  });
  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;
  return (
    <div>
      <ul>
        {popular.items.map((item) => (
          <li key={item.id}>
            <img
              src={String(item.snippet.thumbnails.default.url)}
              alt="thumbnail"
            />
            <h5>{item.snippet.title}</h5>
          </li>
        ))}
      </ul>
    </div>
  );
}
