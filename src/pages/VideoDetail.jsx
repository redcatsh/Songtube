import React from "react";
import { useParams, useLocation } from "react-router-dom";
import Related from "../components/Related/Related";
import { useQuery } from "@tanstack/react-query";
import Channel from "../components/Channel/Channel";
import { ScrollRestoration } from "react-router-dom";
import { timeForToday } from "../utils/util";
import * as common from "../utils/util";

export default function VideoDetail() {
  const { videoId } = useParams();
  const {
    // useLocation으로 필요한 state를 받아온다!!
    state: { item },
  } = useLocation();

  const {
    isLoading,
    error,
    data: video,
  } = useQuery(["video", item], async () => {
    return fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=***REMOVED***`
      // `/data/video.json`
    ).then((res) => res.json());
  });
  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;
  return (
    <div>
      <ScrollRestoration />
      <div>
        <iframe
          id="player"
          type="text/html"
          width="640"
          height="390"
          src={`http://www.youtube-nocookie.com/embed/${videoId}?`}
          frameBorder="0"
          title="title"
        ></iframe>
        <h5 className="font-semibold">{item.snippet.title}</h5>
        <Channel />
        <div>
          <p className="font-semibold">
            {common.compactNumberFormatter.format(
              video.items[0].statistics.viewCount
            )}
            회 ∙ {timeForToday(item.snippet.publishedAt)}
          </p>
          <p>{item.snippet.description}</p>
        </div>
      </div>
      <Related />
    </div>
  );
}
