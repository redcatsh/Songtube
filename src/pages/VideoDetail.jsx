import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Related from "../components/Related/Related";
import { useQuery } from "@tanstack/react-query";
import Channel from "../components/Channel/Channel";
import { ScrollRestoration } from "react-router-dom";
import { timeForToday } from "../utils/util";
import * as common from "../utils/util";
import "../styles/Detail.css";

export default function VideoDetail() {
  const [isLong, setIsLong] = useState(false);
  const onClickLong = () => {
    setIsLong((isLong) => !isLong);
  };

  const { videoId } = useParams();
  const {
    isLoading,
    error,
    data: video,
  } = useQuery(["video", videoId], async () => {
    return fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=***REMOVED***`
      // `/data/video.json`
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
        <h5 className="vid-title font-bold text-lg mt-3 mb-3">
          {video.items[0].snippet.title}
        </h5>
        <Channel />
        <div className="desbox rounded-2xl p-3" onClick={onClickLong}>
          <p className="font-bold text-sm viewcount">
            조회 수{" "}
            {common.compactNumberFormatter.format(
              video.items[0].statistics.viewCount
            )}
            회 ∙ {timeForToday(video.items[0].snippet.publishedAt)}
          </p>
          <p
            className={
              "description whitespace-pre-wrap text-sm" +
              (isLong ? " long" : "")
            }
          >
            {video.items[0].snippet.description}
          </p>
          <p className="text-sm mt-1 destoggle">
            {isLong ? "간략히" : "더보기"}
          </p>
        </div>
      </div>
      <div className="rp basis-[363px]">
        <Related />
      </div>
    </div>
  );
}
