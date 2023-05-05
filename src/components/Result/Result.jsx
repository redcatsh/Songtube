import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { timeForToday } from "../../utils/util";
import { useParams } from "react-router-dom";
export default function SearchResult() {
  const { keyword } = useParams();
  const {
    isLoading,
    error,
    data: search,
  } = useQuery(["search", keyword], async () => {
    // return fetch(
    //   `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${keyword}&key=***REMOVED***`
    // )
    return fetch(`/data/search.json`).then((res) => res.json());
  });

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;
  return (
    <div>
      <ul>
        {search.items.map((item) => (
          <Link to={`/${item.id.videoId}`} className="videoItem" key={item.id}>
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
                {timeForToday(item.snippet.publishTime)}
              </p>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
