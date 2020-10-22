import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Input, Button, Icon, Grid } from "semantic-ui-react";
import { SideText } from "../utils/StyledComponents";
import { depositMoney, withDrawMoney } from "../transactions/transactionUtils";
import history from "../../history";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserModal = (props) => {
  const [value, setValue] = useState(0);
  const [sending, setSending] = useState(false);

  const handleClick = () => {
    setSending(true);

    props.action === "Withdraw"
      ? withDrawMoney(props.ethUser, value)
      : depositMoney(props.ethUser, value);

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
      props.onHide();
      props.setSelected("");
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
        <Modal.Body>
          {" "}
          <Container>
            <Row></Row>
            <Row>
              <Col></Col>
              <Col></Col>
              <Col>
                <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              </Col>
              <Col></Col>
            </Row>
          </Container>
        </Modal.Body>
      ) : (
        <>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              <SideText> {props.title}</SideText>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Input
              fluid
              icon={<Icon name="btc" size="large" />}
              onChange={(event) => setValue(event.target.value)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              animated='vertical'
              circular
              basic
              color={props.action === "Withdraw" ? "red" : "green"}
              onClick={handleClick}
            >
              <Button.Content visible>{props.action}</Button.Content>
              <Button.Content hidden>
                <Icon size="large" fitted name="check circle outline" />
              </Button.Content>
            </Button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
};

export default UserModal;
