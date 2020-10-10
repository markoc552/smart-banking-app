import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Button, Loader } from "semantic-ui-react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Field, reduxForm } from "redux-form";
import history from "../../history";
import { connect } from "react-redux";
import { getAllAccounts, updateAccount } from "../../redux/actions";
import { Formik } from "formik";

const UpdateProfile = (props) => {
  useEffect(() => {
    props.getAllAccounts();
  }, []);

  const updateForm = (formValues) => {
    console.log(formValues);
    props.updateAccount(props.id, formValues);
  };

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
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
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
        }) => (
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group controlId="formBasicEmail">
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
            {errors.password && touched.password && errors.password}
            <Button type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </Form>
        )}
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
