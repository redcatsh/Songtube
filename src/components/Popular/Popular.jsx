import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { timeForToday } from "../../utils/util";
import { Link } from "react-router-dom";
export default function Popular() {
  const navigate = useNavigate();
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
          <Link to={`/${item.id}`}>
            <li key={item.id}>
              <img
                src={String(item.snippet.thumbnails.medium.url)}
                alt="thumbnail"
              />
              <h5 className="font-medium">{item.snippet.title}</h5>
              <p className="text-slate-500 text-sm">
                {item.snippet.channelTitle}
              </p>
              <p>{item.id}</p>
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
