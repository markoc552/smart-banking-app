import React, { useState } from "react";
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
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";

const WaultsForm = (props) => {
  const [sending, setSending] = useState(false);

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
        sendTransaction(values, props.eth);
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
        setFieldValue,
      }) =>
        sending ? (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Row>
              <Col>
                <Form.Group controlId="formBasicAmount">
                  <Form.Label>Timeline</Form.Label>

                  <DayPickerInput
                    style={{ marginLeft: "10px" }}
                    name="date"
                    value={values.date}
                    onDayChange={setFieldValue}
                  />
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <Form.Group controlId="formBasicAmount">
                  <Form.Label>Reason</Form.Label>
                  <Form.Control
                    type="reason"
                    name="reason"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.reason}
                  />
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <Form.Group controlId="formBasicAmount">
                  <Form.Label>Money to save</Form.Label>
                  <InputGroup className="mb-2">
                    <InputGroup.Prepend>
                      <InputGroup.Text>
                        <Icon name="btc" size="large" />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      type="money"
                      name="money"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.money}
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
              Create
            </Button>
          </Form>
        )
      }
    </Formik>
  );
};

export default WaultsForm;
