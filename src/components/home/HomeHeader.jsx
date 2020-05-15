import React from "react";
import { Grid, Button, Icon, Label, Image } from "semantic-ui-react";
import styled from "styled-components";
import Background from "../../home.png";

const HeaderText = styled.div`
  position: relative;
  margin-right: 300px;
  margin-top: 200px;
  margin-left: 15px;
  font-weight: bold;
  font-size: 50px;
  font-family: "Poppins", sans-serif;
  color: rgb(71, 161, 255);
  z-index: 1;
`;

const HomeHeader = props => {
  return (
    <div>
      <Grid padded="vertically" stackable>
        <Grid.Row columns={3}>
          <Grid.Column>
            <div>
              <Icon
                name="align justify"
                circular
                size="large"
                color="blue"
                link
                onClick={() => props.setVisible(true)}
              />
            </div>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <Image centered src={require("../../logo.png")} size="tiny" />
          </Grid.Column>
          <Grid.Column stretched textAlign="right">
            <div>
              <Button as="div" labelPosition="right">
                <Button basic color="blue">
                  <Icon name="btc" size="large" />
                  Money
                </Button>
                <Label as="a" basic color="blue" pointing="left">
                  2,048
                </Label>
              </Button>
            </div>
          </Grid.Column>
        </Grid.Row>
        <img
          src={Background}
          style={{ position: "absolute", left: "50%", top: "5%" }}
        />
        <Grid.Row textAlign="center">
          <HeaderText>The next level of banking</HeaderText>
        </Grid.Row>
        <Grid.Row columns={2} centered>
          <Grid.Column width={3} floated="left">
            <Button basic color="blue">
              Proceed to dashboard
            </Button>
          </Grid.Column>
          <Grid.Column></Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default HomeHeader;
