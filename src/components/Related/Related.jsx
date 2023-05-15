import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { timeForToday } from "../../utils/util";
export default function Related() {
  const { videoId } = useParams();
  const {
    isLoading,
    error,
    data: related,
  } = useQuery(["related", videoId], async () => {
    return fetch(
      `data/related.json`
      // `https://youtube.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${videoId}&type=video&maxResults=25&key=${process.env.REACT_APP_API_KEY}`
    ).then((res) => res.json());
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
                <h5 className="font-medium title mb-2">{item.snippet.title}</h5>
                <p className="subtext text-sm">{item.snippet.channelTitle}</p>
                <p className="subtext text-sm">
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
