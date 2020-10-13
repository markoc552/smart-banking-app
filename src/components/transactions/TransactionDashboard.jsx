import React from "react";
import PropTypes from "prop-types";
import { Grid, Button, Label } from "semantic-ui-react";
import Table from "./Table"


const TransactionDashboard = (props) => {
  return (
    <div>
    <Grid centered>
      <Grid.Row columns={2}>
        <Grid.Column textAlign="justify">
          Sent transactions{" "}
          <Label circular color="black">
            2
          </Label>
        </Grid.Column>
        <Grid.Column textAlign="justify">
          <Button circular color="green">+</Button>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Table/>
      </Grid.Row>
      <Grid.Row>
        <Button color="violet" circular>View all transactions</Button>
      </Grid.Row>
      <Grid.Row columns={2}>
        <Grid.Column textAlign="justify">
          Failed transactions{" "}
          <Label circular color="black">
            2
          </Label>
        </Grid.Column>
        <Grid.Column textAlign="justify">
          <Button circular color="green">+</Button>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Table/>
      </Grid.Row>
      <Grid.Row>
        <Button color="violet" circular>View all transactions</Button>
      </Grid.Row>
    </Grid>
    </div>
  );
};

export default TransactionDashboard;
