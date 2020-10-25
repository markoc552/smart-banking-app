import React, { useState } from "react";
import { useSelector, connect } from "react-redux";
import PropTypes from "prop-types";
import { Formik } from "formik";
import { Button, Loader, Label, Icon, Grid } from "semantic-ui-react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import InputGroup from "react-bootstrap/InputGroup";
import { sendTransaction } from "../transactions/transactionUtils";
import { ToastContainer, toast } from "react-toastify";
import Container from "react-bootstrap/Container";
import "react-toastify/dist/ReactToastify.css";
import { getContract } from "../../ethereum/instances/factory";
import moment from "moment";
import { addFailedTransaction } from "../../redux/actions";
import { FormattedMessage } from "react-intl";

const TransactionForm = (props) => {
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
        console.log(values);

        setSending(true);

        const owner = eth.wallet;

        const mnemonic = eth.mnemonic;

        const contractAddress = eth["ethAddress"];

        console.log(contractAddress);

        const contract = getContract(contractAddress, mnemonic);

        contract.methods
          .sendMoney(values.recepient, values.amount)
          .send({
            from: String(owner.address),
            gas: "6721975",
          })
          .then(() => {
            setTimeout(() => {
              toast.info(
                <FormattedMessage
                  id="transactions.succesfully"
                  defaultMessage="Your money was succesfully transfered!"
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
            }, 2000);
          })
          .catch((err) => {
            props.addFailedTransaction(values);

            setTimeout(() => {
              toast.error(<FormattedMessage
                id="transactions.transfer.failed"
                defaultMessage="Your money failed to be transfered!"
              />, {
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
            <Row>
              <Col>
                <Form.Group controlId="formBasicRecepient">
                  <Form.Label>
                    <FormattedMessage
                      id="transactions.recepient"
                      defaultMessage="Recepient"
                    />
                  </Form.Label>
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
                  <Form.Label>
                    <FormattedMessage
                      id="transactions.amount"
                      defaultMessage="Amount"
                    />
                  </Form.Label>
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
              animated
              floated="right"
              color="blue"
              circular
              basic
              type="submit"
              disabled={isSubmitting}
            >
              <Button.Content visible>
                <FormattedMessage
                  id="transactions.send"
                  defaultMessage="Send"
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
};

export default connect(null, { addFailedTransaction })(TransactionForm);
