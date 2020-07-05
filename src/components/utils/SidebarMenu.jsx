import React, { useState, useEffect } from "react";
import {
  Sidebar,
  Menu,
  Icon,
  Grid,
  Label,
  Popup,
  Container,
  Image,
  Loader
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { SideText, SideName } from "../utils/StyledComponents";
import { getContract } from "../../ethereum/instances/factory";
import { connect } from "react-redux";

const SidebarMenu = props => {

  if (props.ethUser === undefined) {
    return <Loader />;
  } else {
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
                    <SideName>{props.name}</SideName>
                  </Label.Detail>
                  <Label.Detail>
                    <Popup
                      content="Currently available money"
                      position="left center"
                      trigger={
                        <Label basic color="orange" size="large" circular>
                          {props.ethUser["balance"]},00 KN
                        </Label>
                      }
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
                  <Label size="large" basic color="blue">
                    <Icon
                      color="blue"
                      size="large"
                      name="share square outline"
                    />
                    Profile
                  </Label>
                </Container>
              </Link>
            }
          ></Popup>
        </Menu.Item>
        <Menu.Item></Menu.Item>
        <Link to={`/home/${props.id}`}>
          <Menu.Item as="a">
            <Icon name="home" color="blue" />
            <SideText> Home</SideText>
          </Menu.Item>
        </Link>
        <Link to={`/home/transactions/${props.id}`}>
          <Menu.Item as="a">
            <Icon name="exchange" color="blue" />
            <SideText> Transactions</SideText>
          </Menu.Item>
        </Link>
        <Link to={`/home/waults/${props.id}`}>
          <Menu.Item as="a">
            <Icon name="archive" color="blue" />
            <SideText>Waults</SideText>
          </Menu.Item>
        </Link>
        <Link to={`/home/references/${props.id}`}>
          <Menu.Item as="a">
            <Icon name="file" color="blue" />
            <SideText>Reference</SideText>
          </Menu.Item>
        </Link>
      </Sidebar>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    ethUser: state.accounts[ownProps.id],
    name: state.accounts.name
  };
};

export default connect(mapStateToProps, null)(SidebarMenu);
