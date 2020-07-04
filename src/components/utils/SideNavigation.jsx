import React, { useEffect, useState } from "react";
import { Sidebar, Loader } from "semantic-ui-react";
import SidebarMenu from "./SidebarMenu";
import { HomeSection } from "../utils/StyledComponents";
import { getContract } from "../../ethereum/instances/factory";

const SideNavigation = props => {
    return (
      <HomeSection>
        <Sidebar.Pushable as="div">
          <SidebarMenu
            setVisible={props.setVisible}
            id={props.id}
            visible={props.visible}
          />
          <Sidebar.Pusher as="div">{props.children}</Sidebar.Pusher>
        </Sidebar.Pushable>
      </HomeSection>
    );
  }

export default SideNavigation;
