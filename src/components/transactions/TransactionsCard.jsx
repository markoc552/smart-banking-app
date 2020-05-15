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
            <Icon name="history" size="massive" />
          </div>
          You don't have any transactions
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
    <div style={{ width: "95%", margin: "0 auto" }}>
      <Card fluid centered raised color="blue">
        <Card.Content>
          <Card.Header>Transactions</Card.Header>
          <Card.Meta>Recently sent and received transactions</Card.Meta>
        </Card.Content>
        <Card.Content extra textAlign="center">
          <List celled>{renderTransactions()}</List>
        </Card.Content>
        <Card.Content extra textAlign="center">
          <Link to={`/home/transactions/${props.id}/new`}>
            <Button primary circular>
              Create new transaction
            </Button>
          </Link>
        </Card.Content>
      </Card>
    </div>
  );
};

export default Transactions;
