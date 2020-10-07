import React from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import { Input, Button, Icon } from "semantic-ui-react";
import { SideText } from "../utils/StyledComponents";

const UserModal = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <SideText> {props.title}</SideText>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Input
          fluid
          icon={<Icon name="btc" size="large" />}
          placeholder="eg. 100kn"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button
          basic
          color={props.action === "Withdraw" ? "red" : "green"}
          onClick={() => {
            props.onHide();
            props.setSelected("");
          }}
        >
          {props.action}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserModal;
