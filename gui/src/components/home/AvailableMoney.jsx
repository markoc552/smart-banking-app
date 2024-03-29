import React from "react";
import PropTypes from "prop-types";
import { MoneyDialog } from "../utils/StyledComponents";
import { Grid, Card, Menu, Dropdown, Icon, Button } from "semantic-ui-react";
import { FormattedMessage } from "react-intl";
import web3 from "../../ethereum/web3"


const AvailableMoney = (props) => {
  console.log(props.eth);

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
      <Card.Content>{String(web3.utils.fromWei(String(props.eth == null ? 0 : props.eth), "ether"))} ETH</Card.Content>
      <Card.Content>
        <Button.Group color="blue">
          <Menu borderless compact>
            <Button style={{ fontFamily: "'Lato', serif" }}>
              <FormattedMessage
                id="home.transaction"
                defaultMessage="Money transaction"
              />
            </Button>
            <Dropdown floating simple className="button icon" direction="left">
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
