import React from "react";
import { useParams, useLocation } from "react-router-dom";
import Related from "../components/Related/Related";
import Channel from "../components/Channel/Channel";
import { ScrollRestoration } from "react-router-dom";
export default function VideoDetail() {
  const { videoId } = useParams();
  const {
    // useLocation으로 필요한 state를 받아온다!!
    state: { item },
  } = useLocation();
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
        <h5>{item.snippet.title}</h5>
        <Channel />
      </div>
      <Related />
    </div>
  );
}
