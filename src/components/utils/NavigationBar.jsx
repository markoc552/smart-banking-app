import React, { useState } from "react";
import {
  Grid,
  Icon,
  Button,
  Label,
  Image,
  Menu,
  Dropdown,
  Loader
} from "semantic-ui-react";
import Search from "./Search";
import { connect } from "react-redux";

const NavigationBar = props => {
  if (props.ethUser === undefined) {
    console.log(props)
    return <Loader />;
  } else {
    return (
      <div>
        <Grid padded="vertically" stackable>
          <Grid.Row columns={5}>
            <Grid.Column>
              <div>
                <Icon
                  name="align justify"
                  circular
                  size="large"
                  color="blue"
                  link
                  onClick={() => props.setVisible(true)}
                />
              </div>
            </Grid.Column>
            <Grid.Column></Grid.Column>
            <Grid.Column style={{ textAlign: "center" }}>
              <Image
                size="tiny"
                centered
                inline
                src={require("../../images/logo.png")}
              />
            </Grid.Column>
            <Grid.Column>
              <Search />
            </Grid.Column>
            <Grid.Column textAlign="right">
              <div>
                <Menu borderless compact>
                  <Dropdown
                    icon={
                      <Icon
                        name="chevron circle down"
                        size="large"
                        color="blue"
                      />
                    }
                    trigger={
                      <Button as="div" labelPosition="right" size="mini">
                        <Button basic color="blue" size="small">
                          <Icon name="btc" size="large" />
                          Money
                        </Button>
                        <Label as="a" basic color="blue" pointing="left">
                          {props.ethUser["balance"]},00 KN
                        </Label>
                      </Button>
                    }
                  >
                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <Icon name="sort amount up" color="orange" />
                        Upload Money
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Icon name="sort amount down" color="green" />
                        Withdraw Money
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Menu>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    ethUser: state.accounts[ownProps.id]
  };
};

export default connect(mapStateToProps, null)(NavigationBar);
