import React, { useState, useEffect } from "react";
import { Sidebar } from "semantic-ui-react";
import styled from "styled-components";
import EthereumStack from "../home/EthereumStack";
import MobileBankingStack from "../home/MobileBankingStack";
import HomeBottom from "../home/HomeBottom";
import SidebarMenu from "./SidebarMenu";
import HomeHeader from "../home/HomeHeader";
import {HomeSection} from "../utils/StyledComponents"

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
