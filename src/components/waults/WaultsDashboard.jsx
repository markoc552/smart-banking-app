import React, { useState } from "react";
import PropTypes from "prop-types";
import { Grid, Button, Label, Card, Icon } from "semantic-ui-react";
import WaultsTable from "./WaultsTable";
import { TransactionCountDialog } from "../utils/StyledComponents";
import WaultsModal from "./WaultsModal";
import { useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";

const WaultsDashboard = (props) => {
  const [show, setShow] = useState(false);
  const [actionShow, setActionShow] = useState(false);
  const [title, setTitle] = useState("");
  const [owner, setOwner] = useState("");
  const [option, setOption] = useState("");

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
            <Card centered fluid color="violet" style={{ marginLeft: "100px" }}>
              <Card.Content>
                <TransactionCountDialog>
                  <FormattedMessage
                    id="wault.dialog.one"
                    defaultMessage="A bank vault is a secure space where money, valuables, records,
                and documents are stored. It is intended to protect their
                contents from theft, unauthorized use, fire, natural disasters,
                and other threats, much like a safe."
                  />
                </TransactionCountDialog>
              </Card.Content>
              <Card.Content>
                <TransactionCountDialog>
                  <FormattedMessage
                    id="wault.dialog.two"
                    defaultMessage="Digital Vault is a flexible, scalable, cloud-based platform that
                reaches across silos to gather data from disparate sources,
                stores it securely and standardizes the data. It enables you to
                have a streamlined, more productive day-to-day experience."
                  />
                </TransactionCountDialog>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <Card centered>
              <Card.Content textAlign="center">
                <Icon name="archive" size="massive" />
              </Card.Content>
              <Card.Content>
                <Button
                  animated="vertical"
                  color="violet"
                  circular
                  onClick={() => setShow(true)}
                >
                  <Button.Content visible>
                    <FormattedMessage
                      id="wault.new"
                      defaultMessage="New wault"
                    />
                  </Button.Content>
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
              <FormattedMessage
                id="wault.opened"
                defaultMessage="Opened waults"
              />

              <Label circular color="black" style={{ marginLeft: "5px" }}>
                {count}
              </Label>
            </TransactionCountDialog>
          </Grid.Column>
          <Grid.Column textAlign="justify"></Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <WaultsTable
            setOwner={setOwner}
            setActionShow={setActionShow}
            setTitle={setTitle}
            getTrProps={(row) => console.log(row)}
            setOption={setOption}
          />
        </Grid.Row>
        <Grid.Row>
          <Button color="violet" circular>
            <FormattedMessage
              id="wault.view"
              defaultMessage="View all waults"
            />
          </Button>
        </Grid.Row>
      </Grid>
      {show && (
        <WaultsModal
          id={props.id}
          action="NEW_WAULT"
          show={show}
          title={
            <FormattedMessage
              id="wault.modal.create"
              defaultMessage="Create a new wault"
            />
          }
          onHide={() => setShow(false)}
        />
      )}
      {actionShow && (
        <WaultsModal
          id={props.id}
          action="WAULT_ACTION"
          show={actionShow}
          title={title}
          onHide={() => setActionShow(false)}
          owner={owner}
          option={option}
        />
      )}
    </div>
  );
};

export default WaultsDashboard;
