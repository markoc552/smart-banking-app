import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  Icon,
  Label,
  Image,
  Container,
  Menu,
  Dropdown,
  Loader,
  Card,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import Background from "../../images/home.png";
import Search from "../utils/Search";
import { HeaderText, Vector } from "../utils/StyledComponents";
import { getContract } from "../../ethereum/instances/factory";
import history from "../../history";
import { connect } from "react-redux";
import TransactionsCard from "../transactions/TransactionsCard";
import WaultsCard from "../waults/WaultsCard";

const HomeHeader = (props) => {
  if (props.ethUser === undefined) {
    return <Loader />;
  } else {
    return (
      <Vector>
        <Grid padded="vertically" stackable>
          <Grid.Row columns={5}>
            <Grid.Column>
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
            <Grid.Column></Grid.Column>
            <Grid.Column textAlign="center">
              <Image
                centered
                src={require("../../images/logo.png")}
                size="tiny"
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
                      <Button as="div" size="mini" labelPosition="right">
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
                        <Link to={`/home/upload/${props.id}`}>
                          <Icon name="sort amount up" color="orange" />
                          Upload Money
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link to={`/home/withdraw/${props.id}`}>
                          <Icon name="sort amount down" color="green" />
                          Withdraw Money
                        </Link>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Menu>
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={5}>
              <Card centered>
                <Card.Content>
                  <Card.Description></Card.Description>
                </Card.Content>
              </Card>
              <Card centered>
                <Card.Content>
                  <Card.Header>Currently available money</Card.Header>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column width={5}>
              <WaultsCard/>
              <TransactionsCard/>
            </Grid.Column>
            <Grid.Column width={5} textAlign="center">
              <Image fluid as="img" size="large" src={Background} />
              <HeaderText>The next level of banking</HeaderText>
              <Grid.Column textAlign="center">
                <Link to={`/home/transactions/${props.id}`}>
                  <Button basic color="blue">
                    Proceed to transactions
                  </Button>
                </Link>
              </Grid.Column>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Vector>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    ethUser: state.accounts[ownProps.id],
  };
};

export default connect(mapStateToProps, null)(HomeHeader);
