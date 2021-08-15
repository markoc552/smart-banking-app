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
import { useSelector, connect } from "react-redux";
import { getContract } from "../../ethereum/instances/factory";
import moment from "moment";
import history from "../../history";
import { FormattedMessage } from "react-intl";
import { getWaults, getWaultStatus } from "../../redux/actions";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import {createWault} from "../../backend-api"
import web3 from "../../ethereum/web3";

const WaultsForm = (props) => {
  const [sending, setSending] = useState(false);

  const address = useSelector((state) => state.waults.active);

  const waults = useSelector((state) => state.waults.status);

  const eth = useSelector((state) => state.accounts[props.id]);

  return (
    <Formik
      initialValues={{ date: new Date() }}
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

        console.log(values)

        console.log(moment.unix(values.date).format("MM/DD/YYYY"));

        createWault(values.reason, values.date, values.money, contractAddress, mnemonic)
          .then(() => {
            props.getWaults(props.id);

            if (address !== undefined) {
              props.getWaultStatus(address);
            }
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
              props.setWaultsData([
                ...props.waultsData,
                {
                  reason: values.reason,
                  amount: values.money,
                  time: moment(values.date).format("MM/DD/YYYY"),
                  saved: "0",
                },
              ]);
              if(address !== undefined) {
                props.getWaultStatus(address);
              }
              setSubmitting(false);
              setSending(false);
              props.onHide();
            }, 3000);
          })
          .catch((err) => {
            console.log(err);
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
                  <DatePicker
                    style={{ marginLeft: "10px" }}
                    selected={values.date}
                    name="date"
                    onChange={(date) => setFieldValue("date", date)}
                    dateFormat="yyyy-MM-dd"
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

export default connect(null, { getWaults, getWaultStatus })(WaultsForm);
