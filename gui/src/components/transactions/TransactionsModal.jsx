import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Input, Button, Icon, Grid } from "semantic-ui-react";
import { SideText, MoneyDialog } from "../utils/StyledComponents";
import { depositMoney, withDrawMoney } from "../transactions/transactionUtils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import history from "../../history";
import { Formik } from "formik";
import { FormattedMessage } from "react-intl";
import TransactionForm from "./TransactionForm";

const TransactionModal = (props) => {
  const [sending, setSending] = useState(false);

  const handleClick = () => {
    setSending(true);

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
      props.onHide();
      setSending(false);
    }, 2000);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {sending ? (
        <Grid centered>
          <Grid.Row textAlign="center" centered>
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </Grid.Row>
        </Grid>
      ) : (
        <>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              <MoneyDialog> {props.title}</MoneyDialog>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <TransactionForm onHide={props.onHide} id={props.id} />
          </Modal.Body>
        </>
      )}
    </Modal>
  );
};

export default TransactionModal;
