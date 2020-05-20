import React, { useState, useEffect } from "react";
import { Card, List, Button, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Transactions = props => {
  const [transactions, setTransactions] = useState(null);

  const renderTransactions = () => {
    if (transactions === null) {
      return (
        <div>
          <div>
            <Icon name="archive" size="massive" />
          </div>
          You don't have any waults
        </div>
      );
    } else {
      return (
        <List.Item>
          <List.Content>
            <List.Header>Snickerdoodle</List.Header>
            An excellent companion
          </List.Content>
        </List.Item>
      );
    }
  };

  return (
    <div style={{ width: "95%", margin: "0 auto", paddingBottom: "25px" }}>
      <Card fluid centered raised color="blue">
        <Card.Content>
          <Card.Header>Waults</Card.Header>
          <Card.Meta>Recently created waults</Card.Meta>
        </Card.Content>
        <Card.Content extra textAlign="center">
          <List celled>{renderTransactions()}</List>
        </Card.Content>
        <Card.Content extra textAlign="center">
          <Link to={`/home/waults/${props.id}/new`}>
            <Button primary circular>
              Create new wault
            </Button>
          </Link>
        </Card.Content>
      </Card>
    </div>
  );
};

export default Transactions;
