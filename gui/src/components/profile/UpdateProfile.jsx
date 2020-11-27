import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Button, Loader, Label, Icon } from "semantic-ui-react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Field, reduxForm } from "redux-form";
import history from "../../history";
import { connect } from "react-redux";
import { getAllAccounts, updateAccount } from "../../redux/actions";
import { Formik } from "formik";
import Spinner from "react-bootstrap/Spinner";
import { ToastContainer, toast } from "react-toastify";
import { FormattedMessage } from "react-intl";

const UpdateProfile = (props) => {
  const [sending, setSending] = useState(false);

  useEffect(() => {
    props.getAllAccounts();
  }, []);

  if (props.id === null || props.usersData === undefined) {
    return <Loader />;
  } else {
    return (
      <Formik
        initialValues={{
          username: props.usersData[props.id].username,
          firstname: props.usersData[props.id].firstname,
          lastname: props.usersData[props.id].lastname,
          email: props.usersData[props.id].email,
          password: props.usersData[props.id].password,
        }}
        validate={(values) => {
          const errors = {};

          if (!values.checkbox) {
            errors.checkbox = "Required!";
          }

          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSending(true);

          setTimeout(() => {
            props.show(false);
            props.updateAccount(props.id, values);
            setSubmitting(false);
            setSending(false);
            toast.success(
              <FormattedMessage
                id="user.update.toast"
                defaultMessage="Your profile was successfully updated!"
              />,
              {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              }
            );
          }, 2000);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) =>
          sending ? (
            <Spinner animation="border" role="status">
              <span className="sr-only">Updating...</span>
            </Spinner>
          ) : (
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicUsername">
                <Form.Label>
                  <FormattedMessage
                    id="user.form.username"
                    defaultMessage="Username"
                  />
                </Form.Label>
                <Form.Control
                  type="username"
                  name="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                  disabled
                />
              </Form.Group>

              <Form.Group controlId="formGridPassword">
                <Form.Label>
                  <FormattedMessage
                    id="user.form.password"
                    defaultMessage="Password"
                  />
                </Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
              </Form.Group>

              <Form.Row>
                <Col>
                  <Form.Group controlId="formGridLastname">
                    <Form.Label>
                      <FormattedMessage
                        id="user.form.lastname"
                        defaultMessage="Lastname"
                      />
                    </Form.Label>
                    <Form.Control
                      type="lastname"
                      name="lastname"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lastname}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formBasicFirstname">
                    <Form.Label>
                      <FormattedMessage
                        id="user.form.firstname"
                        defaultMessage="Firstname"
                      />
                    </Form.Label>
                    <Form.Control
                      type="firstname"
                      name="firstname"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.firstname}
                    />
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
              </Form.Group>
              <Form.Row>
                <Col></Col>
                <Col></Col>
                <Col>
                  <Form.Group controlId="formBasicCheckbox">
                    <Form.Check
                      type="checkbox"
                      name="checkbox"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label={
                        <FormattedMessage
                          id="user.form.question"
                          defaultMessage="Are you sure?"
                        />
                      }
                      value={values.checkbox}
                    />
                    {errors.checkbox && (
                      <Label basic color="red" pointing>
                        {errors.checkbox}
                      </Label>
                    )}
                  </Form.Group>
                </Col>
              </Form.Row>

              <Button
                animated
                floated="right"
                color="blue"
                basic
                type="submit"
                circular
                disabled={isSubmitting}
              >
                <Button.Content visible>
                  <FormattedMessage
                    id="user.form.action.update"
                    defaultMessage="Update"
                  />
                </Button.Content>
                <Button.Content hidden>
                  <Icon name="arrow right" />
                </Button.Content>
              </Button>
            </Form>
          )
        }
      </Formik>
    );
  }
};

const mapStateToProps = (state) => {
  return { usersData: state.accounts.users };
};

export default connect(mapStateToProps, { getAllAccounts, updateAccount })(
  UpdateProfile
);
