import React from "react";
import ReactDOM from "react-dom";
import Navigation from "../utils/NavigationBar";
import { Card, Button, Label, Form, Grid } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import history from "../../history";

const NewTransaction = props => {
  const renderInput = ({ input, label, meta }) => {
    return (
      <Form.Field>
        <label>{label}</label>
        <Form.Input {...input} />
      </Form.Field>
    );
  };

  const Id = props.match.params.id;

  return ReactDOM.createPortal(
    <div
      onClick={() => history.push(`/home/transactions/${Id}`)}
      className="ui dimmer modals visible active"
    >
      <div
        onClick={event => event.stopPropagation()}
        className="ui standard modal visible active"
        style={{ textAlign: "center" }}
      >
        <div class="header">Create new transaction</div>
        <div className="content">
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
          </Form>
        </div>
        <div className="actions" style={{ textAlign: "center" }}>
          <Button primary circular>
            Send transaction
          </Button>
        </div>
      </div>
    </div>,
    document.querySelector("#modal")
  );
};

export default reduxForm({ form: "newTransaction" })(NewTransaction);
