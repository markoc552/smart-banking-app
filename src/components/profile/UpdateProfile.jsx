import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Button, Loader, Label } from "semantic-ui-react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Field, reduxForm } from "redux-form";
import history from "../../history";
import { connect } from "react-redux";
import { getAllAccounts, updateAccount } from "../../redux/actions";
import { Formik } from "formik";
import Spinner from "react-bootstrap/Spinner";

const UpdateProfile = (props) => {
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
          console.log(values);
          props.show(false)
          props.updateAccount(props.id, values)
          setSubmitting(false)
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
          isSubmitting ? (
            <Spinner animation="border" role="status">
              <span className="sr-only">Updating...</span>
            </Spinner>
          ) : (
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col>
                  <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="username"
                      name="username"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.username}
                      disabled
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formGridPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Row>
                <Col>
                  <Form.Group controlId="formGridLastname">
                    <Form.Label>Lastname</Form.Label>
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
                    <Form.Label>Firstname</Form.Label>
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
                      label="Are you sure you want to update your data?"
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
              <Button floated="right" type="submit" disabled={isSubmitting}>
                Submit
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
