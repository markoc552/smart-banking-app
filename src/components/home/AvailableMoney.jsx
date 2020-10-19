import React from "react";
import PropTypes from "prop-types";
import { MoneyDialog } from "../utils/StyledComponents";
import { Grid, Card, Menu, Dropdown, Icon, Button } from "semantic-ui-react";

const AvailableMoney = (props) => {
  return (
    <Card
      centered
      textAlign="center"
      style={{ marginTop: "5vh", marginRight: "12vw" }}
    >
      <Card.Content>
        <MoneyDialog>Available money</MoneyDialog>
      </Card.Content>
      <Card.Content>{props.eth["balance"]},00 ETH</Card.Content>
      <Card.Content>
        <Button.Group color="violet">
          <Button style={{ fontFamily: "'Lato', serif" }}>
            Money transaction
          </Button>
          <Menu borderless compact>
            <Dropdown floating className="button icon" direction="left">
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => {
                    props.setSelected("deposit");
                    props.setModalShow(true);
                  }}
                >
                  <div style={{ fontFamily: "'Bree Serif', serif" }}>
                    <Icon
                      name="sort amount up"
                      circular
                      inverted
                      color="orange"
                    />
                    Deposit money
                  </div>
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    props.setSelected("withdraw");
                    props.setModalShow(true);
                  }}
                >

                  <div style={{ fontFamily: "'Bree Serif', serif" }}>
                    <Icon
                      name="sort amount down"
                      circular
                      inverted
                      color="green"
                    />
                  Withdraw money
                  </div>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu>
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default AvailableMoney;