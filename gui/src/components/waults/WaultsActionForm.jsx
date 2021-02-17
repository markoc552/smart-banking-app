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
import {
  getContract,
  getWaultContract,
} from "../../ethereum/instances/factory";
import moment from "moment";
import history from "../../history";
import web3 from "../../ethereum/web3";
import { WarningDialog } from "../utils/StyledComponents";
import { FormattedMessage } from "react-intl";

const WaultsForm = (props) => {
  const [sending, setSending] = useState(false);
  const [warning, setWarning] = useState(false);

  const address = useSelector((state) => state.waults.active);

  const waults = useSelector((state) => state.waults.status);

  const handleDeposit = (values, setSubmitting) => {
    const wault = address[props.owner.id];

    const contract = getWaultContract(wault);

    console.log(props.owner);

    contract.methods
      .sendMoneyToWault()
      .send({
        from: "0x05Eb57c70e64E5f1998164e0CF843e335a32f3A0",
        value: String(values.money),
        gas: "6721975",
      })
      .then(() => {
        setTimeout(() => {
          toast.info(
            <FormattedMessage
              id="wault.succesfully"
              defaultMessage="Your money was succesfully transfered to your wault!"
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
        toast.error(
          <FormattedMessage
            id="wault.problem"
            defaultMessage="There was a problem while tranfering money!"
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
        console.log(err);
      });
  };

  const handleWithdraw = (values, setSubmitting) => {
    if (props.owner.original.amount < props.owner.original.saved) {
      const wault = address[props.owner.id];

      const contract = getWaultContract(wault);

      contract.methods
        .withDrawMoney("0x05Eb57c70e64E5f1998164e0CF843e335a32f3A0")
        .send({
          from: "0x05Eb57c70e64E5f1998164e0CF843e335a32f3A0",
          value: "0.1",
          gas: "6721975",
        })
        .then(() => {
          setTimeout(() => {
            toast.success(
              <FormattedMessage
                id="wault.succesfully"
                defaultMessage="Your money was succesfully withdrawn from your wault!"
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
          toast.error(
            <FormattedMessage
              id="wault.problem"
              defaultMessage="There was a problem while tranfering money!"
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
          console.log(err);
        });
    } else {
      console.log("Warning");
      setSending(false);
      setWarning(true);
    }
  };

  return (
    <Formik
      initialValues={{}}
      validate={(values) => {
        const errors = {};
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setSending(true);

        if (props.option === "deposit") {
          handleDeposit(values, setSubmitting);
        } else if (props.option === "withdraw") {
          handleWithdraw(values, setSubmitting);
        } else {
          console.log("Invalid option");
        }
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
        ) : warning ? (
          <div>
            <Grid>
              <Grid.Row centered>
                <Icon name="window close" size="big" color="red" />
              </Grid.Row>
              <Grid.Row textAlign="center" centered>
                <WarningDialog>
                  <FormattedMessage
                    id="wault.withdraw"
                    defaultMessage="You can't withdraw money if you did not saved the predefined
                    amount."
                  />
                </WarningDialog>
              </Grid.Row>
            </Grid>
          </div>
        ) : (
          <Form onSubmit={handleSubmit}>
            {props.option === "deposit" && (
              <Form.Row>
                <Col>
                  <Form.Group controlId="formBasicAmount">
                    <Form.Label>
                      <FormattedMessage
                        id="wault.amount"
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
            )}

            <Button
              floated="right"
              color="blue"
              circular
              basic
              type="submit"
              disabled={isSubmitting}
            >
              <FormattedMessage id="wault.send" defaultMessage="Send" />
            </Button>
          </Form>
        )
      }
    </Formik>
  );
};

export default WaultsForm;
