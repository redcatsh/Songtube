import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import * as common from "../../utils/util";
export default function Channel() {
  const {
    // useLocation으로 필요한 state를 받아온다!!
    state: { item },
  } = useLocation();
  const {
    isLoading,
    error,
    data: channel,
  } = useQuery(["channel"], async () => {
    return fetch(`data/channel.json`).then((res) => res.json());
  });
  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;
  return (
    <div>
      {channel.items.map((channelItem) => (
        <div>
          <img src={channelItem.snippet.thumbnails.medium.url} />
          <p>{channelItem.snippet.title}</p>
          <p>
            구독자{" "}
            {common.compactNumberFormatter.format(
              channelItem.statistics.subscriberCount
            )}
            명
          </p>
        </div>
      ))}
    </div>
  );
}
