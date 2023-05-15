import React from "react";
import { useParams, useLocation } from "react-router-dom";
import Related from "../components/Related/Related";
import { useQuery } from "@tanstack/react-query";
import Channel from "../components/Channel/Channel";
import { ScrollRestoration } from "react-router-dom";
import { timeForToday } from "../utils/util";
import * as common from "../utils/util";
import "../styles/Detail.css";

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
      // `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=***REMOVED***`
      `/data/video.json`
    ).then((res) => res.json());
  });
  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;
  return (
    <div className="wrapper flex flex-wrap">
      <ScrollRestoration />
      <div className="lp flex-1 mr-6">
        <iframe
          id="player"
          type="text/html"
          src={`http://www.youtube-nocookie.com/embed/${videoId}?`}
          frameBorder="0"
          title="title"
          className="w-full aspect-video"
        ></iframe>
        <h5 className="vid-title font-bold text-xl mt-3 mb-5">
          {item.snippet.title}
        </h5>
        <Channel />
        <div className="desbox rounded-2xl">
          <p className="font-bold text-sm viewcount">
            조회 수{" "}
            {common.compactNumberFormatter.format(
              video.items[0].statistics.viewCount
            )}
            회 ∙ {timeForToday(item.snippet.publishedAt)}
          </p>
          <p className="description whitespace-pre-wrap leading-6">
            {item.snippet.description}
          </p>
        </div>
      </div>
      <div className="rp basis-[363px]">
        <Related />
      </div>
    </div>
  );
}
