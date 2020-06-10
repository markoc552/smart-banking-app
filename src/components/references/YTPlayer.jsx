import React, { useState, useEffect } from "react";
import SearchBar from "./YoutubeSearch";
import VideoDetail from "./VideoDetail";
import VideoList from "./VideoList";
import YTSearch from "youtube-api-search";
import { Grid } from "semantic-ui-react";

const YTPlayer = props => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelected] = useState(null);

  useEffect(() => {
    searchVideo(props.term);
  }, [props.term]);

  const searchVideo = term => {
    if (!term) return;

    YTSearch({ key: window.ENVIRONMENT.YOUTUBE_API_KEY, term: term }, videos => {
      if (!videos) {
        return;
      }
      setVideos(videos);
      setSelected(videos[0]);
    });
  };

  return (
    <div>
      <Grid centered>
        <Grid.Row centered as="div" style={{ marginTop: "10px" }}>
          <Grid.Column width={5}>
            <SearchBar onSearchVideo={searchVideo} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row as="div" style={{ textAlign: "left" }}>
          <VideoDetail video={selectedVideo} />
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <VideoList
              onVideoSelect={selected => {
                setSelected(selected);
              }}
              videos={videos}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default YTPlayer;
