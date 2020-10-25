import React from "react";
import PropTypes from "prop-types";
import { MoneyDialog } from "../utils/StyledComponents";
import { Grid, Card, Menu, Dropdown, Icon, Button } from "semantic-ui-react";
import { FormattedMessage } from "react-intl";

const AvailableMoney = (props) => {
  return (
    <Card
      centered
      textAlign="center"
      color="blue"
      style={{ marginTop: "5vh", marginRight: "12vw" }}
    >
      <Card.Content>
        <MoneyDialog>
          <FormattedMessage
            id="home.available"
            defaultMessage="Available money"
          />
        </MoneyDialog>
      </Card.Content>
      <Card.Content>{props.eth["balance"]},00 ETH</Card.Content>
      <Card.Content>
        <Button.Group color="blue">
          <Button style={{ fontFamily: "'Lato', serif" }}>
            <FormattedMessage
              id="home.transaction"
              defaultMessage="Money transaction"
            />
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
                    <FormattedMessage
                      id="home.deposit"
                      defaultMessage="Deposit money"
                    />
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
                    <FormattedMessage
                      id="home.withdraw"
                      defaultMessage="Withdraw money"
                    />
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
