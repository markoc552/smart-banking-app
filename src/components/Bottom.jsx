import React from "react";
import { Grid, Icon, Input } from "semantic-ui-react";

const Bottom = props => {
  return (
    <div
      className="ui container"
      style={{
        color: "rgb(202, 204, 207)",
        backgroundColor: "rgb(85, 96, 115)",
        height: "45px",
        position: "fixed",
        bottom: "0"
      }}
    >
      <Grid container padded verticalAlign="middle">
        <Grid.Column>Budi Mlad Budi Lud ltd.</Grid.Column>
      </Grid>
    </div>
  );
};

export default Bottom;
