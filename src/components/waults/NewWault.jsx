import React from "react";
import ReactDOM from "react-dom";
import Navigation from "../NavigationBar";
import { Card, Button, Label, Form, Grid } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import history from "../../history";

const NewWault = props => {
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
      onClick={() => history.push(`/home/waults/${Id}`)}
      className="ui dimmer modals visible active"
    >
      <div
        onClick={event => event.stopPropagation()}
        className="ui standard modal visible active"
        style={{ textAlign: "center" }}
      >
        <div class="header">Create new wault</div>
        <div className="content">
          <Form>
            <Field
              name="reason"
              type="text"
              label="Reason"
              component={renderInput}
            />
            <Field
              name="timePeriod"
              type="text"
              label="Time period"
              component={renderInput}
            />
            <Field
              name="amount"
              type="text"
              label="Wanted money to save"
              component={renderInput}
            />
          </Form>
        </div>
        <div className="actions" style={{ textAlign: "center" }}>
          <Button primary circular>
            Create Wault
          </Button>
        </div>
      </div>
    </div>,
    document.querySelector("#wault")
  );
};

export default reduxForm({ form: "newWault" })(NewWault);
