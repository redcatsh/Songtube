import React from "react";
import { useQuery } from "@tanstack/react-query";
import { timeForToday } from "../../utils/util";
import { Link } from "react-router-dom";
import * as common from "../../utils/util";
import "../Popular/Popular.css";

export default function Popular() {
  const {
    isLoading,
    error,
    data: popular,
  } = useQuery(["popular"], async () => {
    return fetch(
      `data/popular.json`
      // `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=32&regionCode=KR&key=***REMOVED***`
    ).then((res) => res.json());
  });

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;

  return (
    <div className="wrapper">
      <ul className="grid gap-4">
        {popular.items.map((item) => (
          <li className="videoItem" key={item.id}>
            <Link
              to={`/${item.id}`}
              state={{ item }} // 전달할 state!
            >
              <img
                src={String(item.snippet.thumbnails.high.url)}
                alt="thumbnail"
                className="thumbnail rounded-lg"
              />
              <h5 className="font-medium title">{item.snippet.title}</h5>
              <p className="text-slate-500 text-sm">
                {item.snippet.channelTitle}
              </p>
              <p className="text-slate-500 text-sm">
                {common.compactNumberFormatter.format(
                  item.statistics.viewCount
                )}
                회 ∙ {timeForToday(item.snippet.publishedAt)}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
