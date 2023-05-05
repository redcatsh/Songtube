import React from "react";
import { useParams } from "react-router-dom";
export default function VideoDetail() {
  const { videoId } = useParams();
  return (
    <div>
      <iframe
        id="player"
        type="text/html"
        width="640"
        height="390"
        src={`http://www.youtube.com/embed/${videoId}?`}
        frameborder="0"
      ></iframe>
    </div>
  );
}
