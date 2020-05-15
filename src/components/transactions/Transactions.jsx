import React, { useEffect, useState } from "react";
import { Grid, Button, Label, Icon, Segment } from "semantic-ui-react";
import TransactionCard from "./TransactionsCard";
import Navigation from "../NavigationBar";

const Transactions = props => {
  const [id, setId] = useState(null);

  useEffect(() => {
    setId(props.match.params.id);
  }, [props.match.params.id]);

  return (
    <div>
      <Navigation />
      <Segment raised color="blue" textAlign="center">
        <div style={{ fontFamily: "'Lato', sans-serif", fontWeight: "500" }}>
          On this page you can view your recent transactions and sent new ones.
        </div>
      </Segment>
      <TransactionCard id={id} />
    </div>
  );
};

export default Transactions;
