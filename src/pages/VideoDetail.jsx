import React from "react";
import { useParams, useLocation } from "react-router-dom";
import Related from "../components/Related/Related";
export default function VideoDetail() {
  const { videoId } = useParams();
  const {
    // useLocation으로 필요한 state를 받아온다!!
    state: { item },
  } = useLocation();
  return (
    <div>
      <div>
        <iframe
          id="player"
          type="text/html"
          width="640"
          height="390"
          src={`http://www.youtube.com/embed/${videoId}?`}
          frameborder="0"
        ></iframe>
        <h5>{item.snippet.title}</h5>
      </div>
      <Related />
    </div>
  );
}
