import React from "react";
import {
  Menu,
  Item,
  Input,
  Icon,
  Label,
  Button,
  Image,
  Grid
} from "semantic-ui-react";

const Navigation = props => {
  return (
    <div>
      <div
        style={{
          backgroundColor: "white",
          fontSize: "15px",
          fontFamily: "Roboto",
          fontWeight: "bold",
          textAlign: "center"
        }}
      >
        <Image size="mini" centered inline src={require("../logo.png")} />
        Smart Banking App
      </div>
      <div
        className="ui container"
        fluid
        style={{
          color: "grey",
          backgroundColor: "rgb(85, 96, 115)",
          marginBottom: "10px"
        }}
      >
        <Grid container padded stackable reversed verticalAlign="middle">
          <Grid.Row columns={3}>
            <Grid.Column width={1} as="a">
              <Icon
                name="align justify"
                circular
                animated
                link
                size="large"
                inverted
                color="blue"
                onClick={() => props.setVisible(true)}
              />
            </Grid.Column>
            <Grid.Column textAlign="left" as="a">
              <Button icon="exchange" basic color="white" inverted size="tiny">
                <Icon name="exchange" size="large" />
                Transactions
              </Button>
            </Grid.Column>
            <Grid.Column textAlign="right" floated="right">
              <Button basic color="white" compact inverted>
                <Icon color="yellow" name="bitcoin" size="large" />
                Account Money{" "}
                <Label as="a" color="blue" tag>
                  100,00 HRK
                </Label>
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </div>
  );
};

export default Navigation;
