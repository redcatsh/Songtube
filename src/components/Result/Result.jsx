import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { timeForToday } from "../../utils/util";
import { useParams } from "react-router-dom";
import "../Popular/Popular";
export default function SearchResult() {
  const { keyword } = useParams();
  const {
    isLoading,
    error,
    data: search,
  } = useQuery(["search", keyword], async () => {
    return fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${keyword}&key=${process.env.REACT_APP_API_KEY}`
      // `/data/search.json`
    ).then((res) => res.json());
  });

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;
  return (
    <div className="wrapper">
      <ul className="grid gap-4">
        {search.items.map((item) => (
          <li className="videoItem" key={item.id.videoId}>
            <Link
              to={`/${item.id.videoId}`}
              state={{ item }} // 전달할 state!
            >
              <div className="thumbnailWrapper">
                <img
                  src={String(item.snippet.thumbnails.high.url)}
                  alt="thumbnail"
                  className="thumbnail rounded-lg"
                />
              </div>
              <h5 className="font-medium title mt-2 mb-1">
                {item.snippet.title}
              </h5>
              <p className="subtext text-sm">{item.snippet.channelTitle}</p>
              <p className="subtext text-sm">
                {timeForToday(item.snippet.publishTime)}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
