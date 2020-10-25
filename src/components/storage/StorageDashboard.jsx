import React, { useState } from "react";
import PropTypes from "prop-types";
import { Grid, Button, Label, Card, Icon } from "semantic-ui-react";
import StorageTable from "./StorageTable";
import { TransactionCountDialog } from "../utils/StyledComponents";
import { useSelector } from "react-redux";
import Dropzone from "./Dropzone";

const WaultsDashboard = (props) => {
  const [show, setShow] = useState(false);
  const [actionShow, setActionShow] = useState(false);
  const [title, setTitle] = useState("");
  const [data, addData] = useState([]);

  const count = useSelector((state) => state.waults.count);

  return (
    <div>
      <Grid centered>
        <Grid.Row columns={2}>
          <Grid.Column textAlign="justify"></Grid.Column>
          <Grid.Column textAlign="justify"></Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column centered textAlign="center">
            <Card centered fluid color="blue" style={{ marginLeft: "100px" }}>
              <Card.Content>
                <TransactionCountDialog>
                  You can use our storage to save your valuable data without any
                  needs for worrying for it's security. Once you store your data
                  it will be encrypted with asymetric encryption which means
                  that only you can access it.
                </TransactionCountDialog>
              </Card.Content>
              <Card.Content>
                <TransactionCountDialog>
                  Also for extra safety filename is hashed with Base64 hashing
                  algorithm.
                </TransactionCountDialog>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <Card centered>
              <Card.Content textAlign="center">
                <Dropzone data={data} />
              </Card.Content>
              <Card.Content>
                <Button
                  animated="vertical"
                  color="blue"
                  circular
                  onClick={() => setShow(true)}
                >
                  <Button.Content visible>Store</Button.Content>
                  <Button.Content hidden>
                    <Icon name="plus" />
                  </Button.Content>
                </Button>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row></Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column textAlign="justify">
            <TransactionCountDialog>
              Stored files
              <Label circular color="black" style={{ marginLeft: "5px" }}>
                {count !== undefined ? count : 0}
              </Label>
            </TransactionCountDialog>
          </Grid.Column>
          <Grid.Column textAlign="justify"></Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <StorageTable setActionShow={setActionShow} setTitle={setTitle} />
        </Grid.Row>
        <Grid.Row>
          <Button color="blue" circular>
            View all files
          </Button>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default WaultsDashboard;
