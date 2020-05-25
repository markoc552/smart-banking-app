import React, { useState, useEffect } from "react";
import { Sidebar } from "semantic-ui-react";
import styled from "styled-components";
import EthereumStack from "./EthereumStack";
import MobileBankingStack from "./MobileBankingStack";
import HomeBottom from "./HomeBottom";
import SidebarMenu from "./SidebarMenu";
import HomeHeader from "./HomeHeader";

const HomeSection = styled.div`
  position: absolute;
  right: 1%;
  left: 1%;
  font-family: "Lato", sans-serif;
  height: 100vh;
`;

const SideNavigation = props => {

  return (
    <HomeSection>
      <Sidebar.Pushable as="div">
        <SidebarMenu
          setVisible={props.setVisible}
          id={props.id}
          visible={props.visible}
          user={props.user}
        />
        <Sidebar.Pusher as="div">{props.children}</Sidebar.Pusher>
      </Sidebar.Pushable>
    </HomeSection>
  );
};

export default SideNavigation;
