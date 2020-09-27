import React, { useState } from "react";
import {
  Grid,
  Icon,
  Button,
  Label,
  Image,
  Menu,
  Dropdown,
  Loader,
} from "semantic-ui-react";
import Search from "./Search";
import { connect } from "react-redux";
import history from "../../history"

const NavigationBar = (props) => {
  if (props.ethUser === undefined) {
    console.log(props);
    return <Loader />;
  } else {
    return (
      <div>
        <Grid padded="vertically" stackable>
          <Grid.Row columns={4}>
            <Grid.Column width={6}>
              <div style={{ marginLeft: "30px" }}>
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
            <Grid.Column textAlign="center" width={3}>
              <Image
                centered
                src={require("../../images/logo.png")}
                size="tiny"
              />
            </Grid.Column>
            <Grid.Column textAlign="right" width={2}>
              <Search />
            </Grid.Column>
            <Grid.Column textAlign="right" width={4}></Grid.Column>
            <Grid.Column width={1}>
              <Button
                color="red"
                basic
                floated="right"
                onClick={() => history.push("/")}
              >
                Logout
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    ethUser: state.accounts[ownProps.id],
  };
};

export default connect(mapStateToProps, null)(NavigationBar);
