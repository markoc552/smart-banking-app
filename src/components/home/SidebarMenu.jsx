import React, { useState } from "react";
import { Sidebar, Menu, Icon, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";

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
        <Icon name="user circle" color="blue" />
        <Header as="h4">{props.user}</Header>
      </Menu.Item>
      <Menu.Item></Menu.Item>
      <Menu.Item></Menu.Item>
      <Link to={`/home/${props.id}`}>
        <Menu.Item as="a">
          <Icon name="home" color="blue" />
          Home
        </Menu.Item>
      </Link>
      <Link to={`/home/transactions/${props.id}`}>
        <Menu.Item as="a">
          <Icon name="exchange" color="blue" />
          Transactions
        </Menu.Item>
      </Link>
      <Link to={`/home/waults/${props.id}`}>
        <Menu.Item as="a">
          <Icon name="archive" color="blue" />
          Waults
        </Menu.Item>
      </Link>
      <Link to={`/home/references/${props.id}`}>
        <Menu.Item as="a">
          <Icon name="file" color="blue" />
          Reference
        </Menu.Item>
      </Link>
    </Sidebar>
  );
};

export default SidebarMenu;
