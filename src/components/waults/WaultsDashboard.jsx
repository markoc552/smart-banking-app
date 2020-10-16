import React, {useState} from "react";
import PropTypes from "prop-types";
import { Grid, Button, Label, Card, Icon } from "semantic-ui-react";
import Table from "../transactions/Table";
import { TransactionCountDialog } from "../utils/StyledComponents";
import WaultsModal from "./WaultsModal";

const TransactionDashboard = (props) => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <Grid centered>
        <Grid.Row columns={2}>
          <Grid.Column textAlign="justify"></Grid.Column>
          <Grid.Column textAlign="justify"></Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column centered textAlign="center">
            <Card centered fluid color="violet" style={{ marginLeft: "100px" }}>
              <Card.Content>
                A bank vault is a secure space where money, valuables, records,
                and documents are stored. It is intended to protect their
                contents from theft, unauthorized use, fire, natural disasters,
                and other threats, much like a safe.
              </Card.Content>
              <Card.Content>
                Digital Vault is a flexible, scalable, cloud-based platform that
                reaches across silos to gather data from disparate sources,
                stores it securely and standardizes the data. It enables you to
                have a streamlined, more productive day-to-day experience.
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <Card centered>
              <Card.Content textAlign="center">
                <Icon name="archive" size="massive" />
              </Card.Content>
              <Card.Content>
                <Button color="violet" circular onClick={() => setShow(true)}>
                  New wault
                </Button>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row></Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column textAlign="justify">
            <TransactionCountDialog>
              Opened waults
              <Label circular color="black" style={{ marginLeft: "5px" }}>
                2
              </Label>
            </TransactionCountDialog>
          </Grid.Column>
          <Grid.Column textAlign="justify"></Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Table />
        </Grid.Row>
        <Grid.Row>
          <Button color="violet" circular>
            View all transactions
          </Button>
        </Grid.Row>
      </Grid>
      {show && (
        <WaultsModal
          show={show}
          title="Create a new wault"
          onHide={() => setShow(false)}
        />
      )}
    </div>
  );
};

export default TransactionDashboard;
