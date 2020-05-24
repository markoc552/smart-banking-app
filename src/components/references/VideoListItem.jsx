import React from "react";
import { List, Image, Container, Item, Label, Icon } from "semantic-ui-react";
import "../../index.css";

const VideoListItem = ({ video, onVideoSelect }) => {
  const imageUrl = video.snippet.thumbnails.default.url;
  return (
    <Item onClick={() => onVideoSelect(video)} className="item-List">
      <Item.Image src={imageUrl} />
      <Item.Content>
        <Item.Header as="a">{video.snippet.title}</Item.Header>
        <Item.Description>{video.snippet.description}</Item.Description>
        <Item.Description>
          <strong>Channel:</strong> {video.snippet.channelTitle}
        </Item.Description>
        <Item.Extra>
          <Label basic>
            <Icon name="globe" />
            Education
          </Label>
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};

export default VideoListItem;
