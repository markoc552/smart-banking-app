import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Grid, Button, Label, Input } from "semantic-ui-react";
import Table from "./Table";
import TransactionModal from "./TransactionsModal";
import Spinner from "react-bootstrap/Spinner";
import { TransactionCountDialog } from "../utils/StyledComponents";

const TransactionDashboard = (props) => {
  const [show, setShow] = useState(false);

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
              <Label circular color="black" style={{marginLeft: "5px"}}>
                {props.eth.transactionCount}
              </Label>
            </TransactionCountDialog>
          </Grid.Column>
          <Grid.Column textAlign="justify">
            <Button circular color="green" onClick={() => setShow(true)}>
              +
            </Button>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Input />
        </Grid.Row>
        <Grid.Row>
          <Table id={props.id} />
        </Grid.Row>
        <Grid.Row>
          <Button color="violet"  style={{ fontFamily: "'Lato', serif" }} circular>
            View all transactions
          </Button>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column textAlign="center">
            <TransactionCountDialog>
              Failed transactions
              <Label circular color="black"  style={{marginLeft: "5px"}}>
                2
              </Label>
            </TransactionCountDialog>
          </Grid.Column>
          <Grid.Column></Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Table />
        </Grid.Row>
        <Grid.Row>
          <Button color="violet"  style={{ fontFamily: "'Lato', serif" }} circular>
            View all transactions
          </Button>
        </Grid.Row>
      </Grid>
      {show && (
        <TransactionModal
          show={show}
          title="Send new transaction"
          onHide={() => setShow(false)}
        />
      )}
    </div>
  );
};

export default TransactionDashboard;
