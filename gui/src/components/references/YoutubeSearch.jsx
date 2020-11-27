import React from "react";
import { Input } from "semantic-ui-react";

const YoutubeSearch = props => {

  const onInputChange = term => {
    props.onSearchVideo(term);
  };

  return (
    <Input
      placeholder="Search..."
      fluid
      onChange={event => onInputChange(event.target.value)}
    />
  );
};

export default YoutubeSearch;
