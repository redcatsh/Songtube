import React from "react";
import { useQuery } from "@tanstack/react-query";
import { timeForToday } from "../../utils/util";
import { Link } from "react-router-dom";
import "../Popular/Popular.css";
export default function Popular() {
  const {
    isLoading,
    error,
    data: popular,
  } = useQuery(["popular"], async () => {
    return fetch(`data/popular.json`).then((res) => res.json());
  });

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;
  return (
    <div>
      <ul>
        {popular.items.map((item) => (
          <Link
            to={`/${item.id}`}
            state={{ item }} // 전달할 state!
            className="videoItem"
            key={item.id}
          >
            <li>
              <img
                src={String(item.snippet.thumbnails.medium.url)}
                alt="thumbnail"
              />
              <h5 className="font-medium title">{item.snippet.title}</h5>
              <p className="text-slate-500 text-sm">
                {item.snippet.channelTitle}
              </p>
              <p className="text-slate-500 text-sm">
                {new Intl.NumberFormat(
                  "ko-KR",

                  {
                    notation: "compact",
                    maximumFractionDigits: 1,
                    maximumSignificantDigits: 3,
                  }
                ).format(item.statistics.viewCount)}
                회 ∙{timeForToday(item.snippet.publishedAt)}
              </p>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
