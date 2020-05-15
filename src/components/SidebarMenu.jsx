import React, { useState } from "react";
import {
  Header,
  Icon,
  Image,
  Card,
  Menu,
  Segment,
  Sidebar,
  Item,
  Grid,
  GridRow,
  Button,
  GridColumn
} from "semantic-ui-react";
import Graph from "./Graph";
import Navigation from "./Navigation";
import ExchangeTable from "./ExchangeTable";
import WaultsCard from "./WaultsCard";
import Transactions from "./transactions/Transactions";
import Bottom from "./Bottom";

const SidebarMenu = () => {
  const [visible, setVisible] = useState(false);

  return (
    <Sidebar.Pushable as="div">
      <Sidebar
        as={Menu}
        animation="slide along"
        icon="labeled"
        onHide={() => setVisible(false)}
        vertical
        visible={visible}
        width="wide"
      >
        <Menu.Item as="a">
          <Icon name="home" />
          Home
        </Menu.Item>
        <Menu.Item as="a">
          <Icon name="gamepad" />
          Games
        </Menu.Item>
        <Menu.Item as="a">
          <Icon name="camera" />
          Channels
        </Menu.Item>
      </Sidebar>

      <Sidebar.Pusher>
        <Navigation setVisible={setVisible} />
        <Grid
          centered
          doubling
          stackable
          textAlign="center"
          verticalAlign="middle"
        >
          <GridRow>
            <GridColumn>
              <Header as="h3" textAlign="center">
                Dashboard
              </Header>
            </GridColumn>
          </GridRow>
          <GridRow columns={3} centered>
            <GridColumn>
              <div style={{ height: "100%" }}>
                <Card
                  raised
                  color="blue"
                  header="Account Payments"
                  description={Graph}
                  meta="Graph shows recent account payments"
                  centered
                  fluid
                />
              </div>
            </GridColumn>
            <GridColumn width={3}>
              <Card
                raised
                color="blue"
                header="Exchange rates"
                fluid
                description={ExchangeTable}
                centered
              />
            </GridColumn>
            <GridColumn>
              <WaultsCard />
            </GridColumn>
          </GridRow>
          <GridRow>
            <Transactions />
          </GridRow>
        </Grid>
        <Bottom />
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};

export default SidebarMenu;
