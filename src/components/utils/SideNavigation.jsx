import React from "react";
import { Sidebar } from "semantic-ui-react";
import SidebarMenu from "./SidebarMenu";
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
