import React, { useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Formik } from "formik";
import { Button, Loader, Label, Icon } from "semantic-ui-react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import InputGroup from "react-bootstrap/InputGroup";
import { sendTransaction } from "../transactions/transactionUtils";
import { ToastContainer, toast } from "react-toastify";
import Container from "react-bootstrap/Container";
import "react-toastify/dist/ReactToastify.css";

const TransactionForm = (props) => {
  const [sending, setSending] = useState(false);

  const eth = useSelector(state => state.accounts[props.id])

  return (
    <Formik
      initialValues={{}}
      validate={(values) => {
        const errors = {};
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);

        setSending(true);
        sendTransaction(values, eth);
        setTimeout(() => {
          toast.success("Your money was succesfully transfered!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setSubmitting(false);
          setSending(false);
          props.onHide();
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
            <span className="sr-only">Loading...</span>
          </Spinner>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group controlId="formBasicRecepient">
                  <Form.Label>Recepient</Form.Label>
                  <Form.Control
                    type="recepient"
                    name="recepient"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.recepient}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Row>
              <Col>
                <Form.Group controlId="formBasicAmount">
                  <Form.Label>Amount</Form.Label>
                  <InputGroup className="mb-2">
                    <InputGroup.Prepend>
                      <InputGroup.Text>
                        <Icon name="btc" size="large" />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      type="amount"
                      name="amount"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.amount}
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
            </Form.Row>
            <Button
              floated="right"
              color="violet"
              basic
              type="submit"
              disabled={isSubmitting}
            >
              Send
            </Button>
          </Form>
        )
      }
    </Formik>
  );
};

export default TransactionForm;
