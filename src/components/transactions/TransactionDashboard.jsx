import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Grid, Button, Label, Input } from "semantic-ui-react";
import Table from "./Table";
import TransactionModal from "./TransactionsModal";
import Spinner from "react-bootstrap/Spinner";
import { TransactionCountDialog } from "../utils/StyledComponents";
import ErrorTable from "./ErrorsTable";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const TransactionDashboard = (props) => {
  const [show, setShow] = useState(false);

  const count = useSelector((state) => state.transactions.count);

  console.log(count);

  return props.eth === undefined ? (
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  ) : (
    <div>
      <Grid centered>
        <Grid.Row columns={2}>
          <Grid.Column textAlign="justify">
            <TransactionCountDialog>
              Sent transactions
              <Label circular color="black" style={{ marginLeft: "5px" }}>
                {props.eth.transactionCount}
              </Label>
            </TransactionCountDialog>
          </Grid.Column>
          <Grid.Column textAlign="justify">
            <Button size="small" inverted circular color="green" onClick={() => setShow(true)}>
              +
            </Button>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row></Grid.Row>
        <Grid.Row>
          <Table id={props.id} />
        </Grid.Row>
        <Grid.Row>
          <Button
            color="violet"
            style={{ fontFamily: "'Lato', serif" }}
            circular
          >
            View all transactions
          </Button>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column textAlign="center">
            <TransactionCountDialog>
              Failed transactions
              <Label circular color="black" style={{ marginLeft: "5px" }}>
                {count !== undefined ? count : 0}
              </Label>
            </TransactionCountDialog>
          </Grid.Column>
          <Grid.Column></Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <ErrorTable />
        </Grid.Row>
        <Grid.Row>
          <Button
            color="violet"
            style={{ fontFamily: "'Lato', serif" }}
            circular
          >
            View all transactions
          </Button>
        </Grid.Row>
      </Grid>
      {show && (
        <TransactionModal
          id={props.id}
          show={show}
          title="Send new transaction"
          onHide={() => setShow(false)}
        />
      )}
    </div>
  );
};

export default TransactionDashboard;
