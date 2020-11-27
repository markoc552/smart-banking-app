import React, { useEffect, useState } from "react";
import { Sidebar, Loader, Grid } from "semantic-ui-react";
import SidebarMenu from "./SidebarMenu";
import { HomeSection } from "../utils/StyledComponents";
import { getContract } from "../../ethereum/instances/factory";

const SideNavigation = (props) => {
  return (
    <Grid>
      <Grid.Row columns={2}>
        <Grid.Column width={3} fluid>
          <SidebarMenu id={props.id} />
        </Grid.Column>
        <Grid.Column width={12} fluid>
          {props.children}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default SideNavigation;
