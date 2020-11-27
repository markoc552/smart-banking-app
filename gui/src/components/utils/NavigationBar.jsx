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
  Flag,
} from "semantic-ui-react";
import Search from "./Search";
import { connect } from "react-redux";
import history from "../../history";
import { logout } from "../../redux/actions";
import { WarningDialog } from "../utils/StyledComponents";
import { FormattedMessage } from "react-intl";

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
              <Button.Group color="blue" basic>
                <Dropdown
                  text="Language"
                  icon="globe"
                  floating
                  labeled
                  button
                  className="icon"
                >
                  <Dropdown.Menu>
                    <Dropdown.Header icon="globe" content="Choose language" />
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={() => props.onLangChange("cro")}>
                      <WarningDialog>
                        <Flag name="croatia" />
                        Croatian
                      </WarningDialog>
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => props.onLangChange("en")}>
                      <WarningDialog>
                        <Flag name="england" />
                        English
                      </WarningDialog>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Button.Group>
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
                <FormattedMessage id="home.logout" defaultMessage="Logout" />
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

export default connect(mapStateToProps, { logout })(NavigationBar);
