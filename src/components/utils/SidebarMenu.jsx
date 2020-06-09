import React, { useState } from "react";
import {
  Sidebar,
  Menu,
  Icon,
  Header,
  Grid,
  Label,
  Popup,
  Button,
  Container,
  Image
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { SideText, SideName } from "../utils/StyledComponents";

const SidebarMenu = props => {
  return (
    <Sidebar
      as={Menu}
      animation="slide along"
      icon="labeled"
      onHide={() => props.setVisible(false)}
      vertical
      visible={props.visible}
      width="wide"
      className="container"
      borderless
      style={{ height: "100vh" }}
    >
      <Menu.Item icon>
        <Grid centered padded textAlign="center" verticalAlign="middle">
          <Grid.Row>
            <Grid.Column textAlign="center">
              <Label basic color="blue" size="big" circular>
                <Image
                  src="https://image.flaticon.com/icons/svg/3011/3011279.svg"
                  size="small"
                  verticalAlign="middle"
                  spaced
                />
                <Label.Detail>
                  <SideName>{props.user}</SideName>
                </Label.Detail>
                <Label.Detail>
                  <Popup
                    content="Currently available money"
                    position="left center"
                    trigger={<Label basic color="orange" size="large" circular>100HRK</Label>}
                  ></Popup>
                </Label.Detail>
              </Label>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Popup
          content="Go to profile"
          position="bottom center"
          trigger={
            <Link to={`/home/${props.id}/profile`}>
            <Container as="a">
              <Label size="large" basic color="blue"><Icon color="blue" size="large" name="share square outline" /> Profile</Label>
            </Container>
          </Link>
          }
        ></Popup>
      </Menu.Item>
      <Menu.Item></Menu.Item>
      <Link to={`/home/${props.id}`}>
        <Menu.Item as="a">
          <Icon name="home" circular color="blue" />
          <SideText> Home</SideText>
        </Menu.Item>
      </Link>
      <Link to={`/home/transactions/${props.id}`}>
        <Menu.Item as="a">
          <Icon name="exchange"circular color="blue" />
          <SideText> Transactions</SideText>
        </Menu.Item>
      </Link>
      <Link to={`/home/waults/${props.id}`}>
        <Menu.Item as="a">
          <Icon name="archive" circular color="blue" />
          <SideText>Waults</SideText>
        </Menu.Item>
      </Link>
      <Link to={`/home/references/${props.id}`}>
        <Menu.Item as="a">
          <Icon name="file" circular color="blue" />
          <SideText>Reference</SideText>
        </Menu.Item>
      </Link>
    </Sidebar>
  );
};

export default SidebarMenu;
