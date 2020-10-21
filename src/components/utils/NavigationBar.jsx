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
import {logout} from "../../redux/actions"

const NavigationBar = (props) => {
  if (props.ethUser === undefined) {
    console.log(props);
    return <Loader />;
  } else {
    return (
      <div>
        <Grid centered padded stackable>
          <Grid.Row columns={4}>
            <Grid.Column width={6}></Grid.Column>
            <Grid.Column textAlign="center" width={4}>
              <Image
                centered
                src={require("../../assets/images/logo.png")}
                size="tiny"
              />
            </Grid.Column>
            <Grid.Column textAlign="right" floated="right" width={2}>
              <Search />
            </Grid.Column>
            <Grid.Column width={1} floated="right">
              <Button
                color="red"
                inverted
                circular
                floated="right"
                onClick={() => {
                  history.push("/");
                  props.logout();
                }}
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

export default connect(mapStateToProps, {logout})(NavigationBar);
