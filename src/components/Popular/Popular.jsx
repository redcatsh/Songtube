import React from "react";
import { useQuery } from "@tanstack/react-query";
import { timeForToday } from "../../utils/time";
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
              src={String(item.snippet.thumbnails.medium.url)}
              alt="thumbnail"
            />
            <h5 className="font-medium">{item.snippet.title}</h5>
            <p className="text-slate-500 text-sm">
              {item.snippet.channelTitle}
            </p>
            <p className="text-slate-500 text-sm">
              {timeForToday(item.snippet.publishedAt)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
