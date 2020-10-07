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
  Loader,
  Button,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { SideText, SideName } from "../utils/StyledComponents";
import { getContract } from "../../ethereum/instances/factory";
import { connect, useSelector } from "react-redux";
import history from "../../history";

const SidebarMenu = (props) => {
  const profile = useSelector((state) => {
    console.log(state.accounts.profile);
    return state.accounts.profile;
  });

  if (props.ethUser === undefined) {
    return <Loader />;
  } else {
    return (
      <Sidebar
        as={Menu}
        animation="slide along"
        onHide={() => props.setVisible(false)}
        vertical
        visible={props.visible}
        width="wide"
        inverted
        className="container"
        borderless
        style={{ height: "100vh" }}
      >
        <Grid centered padded textAlign="center" verticalAlign="middle">
          <Grid.Row>
            <Grid.Column>
              <Image centered size="tiny" src={profile} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign="center">
              <SideText>{props.name}</SideText>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign="center">
              <Button color="instagram">
                <Icon name="user" /> View profile
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Menu.Item></Menu.Item>
        <Menu.Item></Menu.Item>
        <Menu.Item as="a" onClick={() => history.push(`/home/${props.id}`)}>
          <Icon name="home" color="blue" size="large" />
          <SideText>Home</SideText>
        </Menu.Item>
        <Menu.Item
          as="a"
          onClick={() => history.push(`/home/transactions/${props.id}`)}
        >
          <Icon name="exchange" color="blue" size="large" />
          <SideText>Transactions</SideText>
        </Menu.Item>
        <Menu.Item
          as="a"
          onClick={() => history.push(`/home/waults/${props.id}`)}
        >
          <Icon name="archive" color="blue" />
          <SideText>Waults</SideText>
        </Menu.Item>
        <Menu.Item
          as="a"
          onClick={() => history.push(`/home/references/${props.id}`)}
        >
          <Icon name="file" color="blue" />
          <SideText>Reference</SideText>
        </Menu.Item>
      </Sidebar>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    ethUser: state.accounts[ownProps.id],
    name: state.accounts.name,
  };
};

export default connect(mapStateToProps, null)(SidebarMenu);
