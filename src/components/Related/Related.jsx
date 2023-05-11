import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { timeForToday } from "../../utils/util";
export default function Related() {
  const { keyword } = useParams();
  const {
    isLoading,
    error,
    data: related,
  } = useQuery(["related", keyword], async () => {
    return fetch(`data/related.json`).then((res) => res.json());
  });

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;

  return (
    <div>
      <ul>
        {related.items.map((item) => (
          <li className="videoItem mt-4" key={item.id.videoId}>
            <Link
              to={`/${item.id.videoId}`}
              state={{ item }} // 전달할 state!
              className="flex"
            >
              <div className="w-[168px]">
                <img
                  src={String(item.snippet.thumbnails.high.url)}
                  alt="thumbnail"
                  className="thumbnail rounded-lg w-full"
                />
              </div>

              <div className="flex flex-col flex-1 ml-2">
                <h5 className="font-medium title">{item.snippet.title}</h5>
                <p className="text-slate-500 text-sm">
                  {item.snippet.channelTitle}
                </p>
                <p className="text-slate-500 text-sm">
                  {timeForToday(item.snippet.publishTime)}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
