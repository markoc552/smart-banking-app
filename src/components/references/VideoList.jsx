import React from "react";
import { Item } from "semantic-ui-react";
import VideoListItem from "./VideoListItem";

const VideoList = (props) => {
  const videos = props.videos.map((video) => {
    console.log(video);
    return (
      <VideoListItem
        key={video.etag}
        video={video}
        onVideoSelect={props.onVideoSelect}
      />
    );
  });

  return (
    <Item.Group divided link>
      {videos}
    </Item.Group>
  );
};

export default VideoList;
