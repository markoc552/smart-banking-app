import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Navigation from "../utils/NavigationBar";
import {
  Card,
  Button,
  Label,
  Form,
  Grid,
  Loader,
  Input
} from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import history from "../../history";
import { connect, useSelector } from "react-redux";
import { getAllAccounts, updateAccount } from "../../redux/actions";

const data = {
  firstname: 'Your firstname..',
  lastname: 'Lastname...',
  email: 'Email...'
}

const UpdateProfile = props => {
  const renderInput = formValues => {
    console.log(formValues)
    return (
      <Form.Field>
        <label>{formValues.label}</label>
        <Form.Input {...formValues.input} />
      </Form.Field>
    );
  };

  const [id, setId] = useState(null);

  useEffect(() => {
    const Id = props.match.params.id;

    setId(Id);
    props.getAllAccounts();
  }, []);

  const updateForm = formValues => {
    console.log(formValues);
    props.updateAccount(id, formValues);
  };

  if (id === null || props.usersData === undefined) {
    return <Loader />;
  } else {
    return ReactDOM.createPortal(
      <div
        onClick={() => history.push(`/home/${id}/profile`)}
        className="ui dimmer modals visible active"
      >
        <div
          onClick={event => event.stopPropagation()}
          className="ui standard modal visible active"
          style={{ textAlign: "center" }}
        >
          <div className="header">Update Profile</div>
          <div className="content">
            <form className="ui form" onSubmit={props.handleSubmit(updateForm)}>
              <Field
                name="firstname"
                type="text"
                label="Firstname"
                component={renderInput}
              />
              <Field
                name="lastname"
                type="text"
                label="Lastname"
                component={renderInput}
              />
              <Field
                name="email"
                type="text"
                label="Email"
                component={renderInput}
              />
              <div className="actions" style={{ textAlign: "center" }}>
                <Button primary circular>
                  Update
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>,
      document.querySelector("#modal")
    );
  }
};

const wrap = reduxForm({
  form: "updateProfile",
  initialValues: {
    firstname: `${data['firstname']}`,
    lastname: `${data['lastname']}`,
    email: `${data['email']}`
  }
})(UpdateProfile);

const mapStateToProps = state => {
  return { usersData: state.accounts.users };
};

export default connect(mapStateToProps, { getAllAccounts, updateAccount })(
  wrap
);
