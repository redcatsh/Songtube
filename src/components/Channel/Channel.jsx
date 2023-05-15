import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import * as common from "../../utils/util";
import "../../styles/Detail.css";
export default function Channel() {
  const {
    //    useLocation으로 필요한 state를 받아온다!!
    state: { item },
  } = useLocation();
  const {
    isLoading,
    error,
    data: channel,
  } = useQuery(["channel", item], async () => {
    return fetch(
      // `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${item.snippet.channelId}&key=***REMOVED***`
      `/data/channel.json`
    ).then((res) => res.json());
  });
  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;
  return (
    <div>
      {channel.items.map((channelItem) => (
        <div key={channelItem.id} className="flex items-center mb-3">
          <div className="w-10 rounded-full mr-2">
            <img
              src={channelItem.snippet.thumbnails.medium.url}
              alt="thumbnail"
              className="w-full"
            />
          </div>
          <div>
            <p className="font-bold text-base channel-title">
              {channelItem.snippet.title}
            </p>
            <p className="subtext text-sm">
              구독자{" "}
              {common.compactNumberFormatter.format(
                channelItem.statistics.subscriberCount
              )}
              명
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
