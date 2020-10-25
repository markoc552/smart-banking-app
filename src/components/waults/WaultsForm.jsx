import React, { useState } from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import { Button, Loader, Label, Icon, Grid } from "semantic-ui-react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import InputGroup from "react-bootstrap/InputGroup";
import { ToastContainer, toast } from "react-toastify";
import Container from "react-bootstrap/Container";
import "react-toastify/dist/ReactToastify.css";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import { useSelector } from "react-redux";
import { getContract } from "../../ethereum/instances/factory";
import moment from "moment";
import history from "../../history";
import { FormattedMessage } from "react-intl";

const WaultsForm = (props) => {
  const [sending, setSending] = useState(false);

  const eth = useSelector((state) => state.accounts[props.id]);

  return (
    <Formik
      initialValues={{}}
      validate={(values) => {
        const errors = {};
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setSending(true);

        const owner = eth.wallet;

        const mnemonic = eth.mnemonic;

        const contractAddress = eth["ethAddress"];

        const contract = getContract(contractAddress, mnemonic);

        console.log(values.money, values.reason, values.date);

        contract.methods
          .createWault(values.money, values.reason, values.date)
          .send({
            from: String(owner.address),
            gas: "6721975",
          })
          .then(() => {
            setTimeout(() => {
              toast.info(
                <FormattedMessage
                  id="wault.create.succesfully"
                  defaultMessage="Your wault was succesfully created!"
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
              setSubmitting(false);
              setSending(false);
              props.onHide();
            }, 3000);
          })
          .catch((err) => {
            toast.error(
              <FormattedMessage
                id="wault.create.failed"
                defaultMessage="Your wault was not created!"
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
            setSubmitting(false);
            setSending(false);
            props.onHide();
          });
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
          <Grid centered>
            <Grid.Row textAlign="center" centered>
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </Grid.Row>
          </Grid>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Row>
              <Col>
                <Form.Group controlId="formBasicAmount">
                  <Form.Label>
                    <FormattedMessage
                      id="wault.timeline"
                      defaultMessage="Timeline"
                    />
                  </Form.Label>

                  <DayPickerInput
                    style={{ marginLeft: "10px" }}
                    name="date"
                    value={values.date}
                    onDayChange={(day) =>
                      setFieldValue("date", moment(day).unix())
                    }
                  />
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <Form.Group controlId="formBasicAmount">
                  <Form.Label>
                    <FormattedMessage
                      id="wault.reason"
                      defaultMessage="Reason"
                    />
                  </Form.Label>
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
                  <Form.Label>
                    <FormattedMessage
                      id="wault.save"
                      defaultMessage="Money to save"
                    />
                  </Form.Label>
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
              color="blue"
              basic
              type="submit"
              disabled={isSubmitting}
            >
              <FormattedMessage id="wault.create" defaultMessage="Create" />
            </Button>
          </Form>
        )
      }
    </Formik>
  );
};

export default WaultsForm;
