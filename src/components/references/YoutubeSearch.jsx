import React, { useState } from "react";
import { Input } from "semantic-ui-react";

const YoutubeSearch = props => {
  const [term, setTerm] = useState("");

  const onInputChange = term => {
    setTerm(term);
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
