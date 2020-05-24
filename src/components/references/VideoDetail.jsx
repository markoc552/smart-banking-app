import React from "react";
import {
  Dimmer,
  Loader,
  Embed,
  Container,
  Divider,
  Segment
} from "semantic-ui-react";

const VideoDetail = ({ video }) => {
  if (!video) {
    return (
      <div style={{ paddingTop: "15px" }}>
        <Dimmer active inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
      </div>
    );
  }
  const imageUrl = video.snippet.thumbnails.default.url;
  const videoId = video.id.videoId;
  const url = `https://www.youtube.com/embed/${videoId}`;
  return (
    <div>
      <Embed
        id={videoId}
        placeholder={imageUrl}
        source="youtube"
        url={url}
        active
        aspectRatio="21:9"
        brandedUI
        hd
      />
      <Segment floated="left">
        <Container as="div" style={{ fontFamily: "'Lato', sans-serif" }}>
          <div style={{ fontFamily: "Roboto Slab, serif", fontWeight: "bold" }}>
            {video.snippet.title}
          </div>
          <Divider hidden />
          <div style={{ fontFamily: "Roboto Slab, serif" }}>
            {video.snippet.description}
          </div>
        </Container>
      </Segment>
    </div>
  );
};

export default VideoDetail;
