import React from "react";
import Navigation from "../NavigationBar";
import { Card, Button, Label, Form, Grid } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";

const NewTransaction = props => {
  const renderInput = ({ input, label, meta }) => {
    return (
      <Form.Field>
        <label>{label}</label>
        <Form.Input {...input} />
      </Form.Field>
    );
  };

  return (
    <div>
      <Navigation />
      <Grid centered>
        <Grid.Row stretched>
          <Grid.Column>
            <Card
              centered
              raised
              color="blue"
              as="div"
              style={{ width: "500px", marginTop: "50px" }}
            >
              <Card.Content textAlign="center">
                <Form>
                  <Field
                    name="sender"
                    type="text"
                    label="Sender"
                    component={renderInput}
                  />
                  <Field
                    name="receiver"
                    type="text"
                    label="Receiver"
                    component={renderInput}
                  />
                  <Field
                    name="amount"
                    type="text"
                    label="Amount of money"
                    component={renderInput}
                  />
                  <Button primary circular>
                    Send transaction
                  </Button>
                </Form>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default reduxForm({ form: "newTransaction" })(NewTransaction);
