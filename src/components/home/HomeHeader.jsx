import React from "react";
import { Grid, Button, Icon, Label, Image, Container } from "semantic-ui-react";
import styled from "styled-components";
import Background from "../../home.png";
import BackgroundVector from "../../vector.jpg";
import Search from "../Search";

const HeaderText = styled.div`
  position: relative;
  margin-right: 300px;
  margin-top: 200px;
  margin-left: 30px;
  font-weight: bold;
  font-size: 50px;
  font-family: "Poppins", sans-serif;
  color: rgb(71, 161, 255);
  z-index: 1;
`;

const Vector = styled.div`
  background-image: url(${BackgroundVector});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  height: 110vh;
`;

const HomeHeader = props => {
  return (
    <Vector>
      <Grid padded="vertically" stackable>
        <Grid.Row columns={5}>
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
          <Grid.Column></Grid.Column>
          <Grid.Column textAlign="center">
            <Image centered src={require("../../logo.png")} size="tiny" />
          </Grid.Column>
          <Grid.Column>
            <Search />
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
        <Image
          as="img"
          size="large"
          src={Background}
          style={{ position: "absolute", left: "59%", top: "5%" }}
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
          <Container
            as="div"
            style={{ position: "absolute", marginTop: "150px" }}
          >
            <a href="http://www.freepik.com">
              Designed by Creative_hat / Freepik
            </a>
          </Container>
        </Grid.Row>
      </Grid>
    </Vector>
  );
};

export default HomeHeader;
