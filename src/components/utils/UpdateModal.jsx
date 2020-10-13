import React from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import { Input, Button, Icon } from "semantic-ui-react";
import { SideText } from "../utils/StyledComponents";
import UpdateProfile from "../profile/UpdateProfile"

const UpdateModal = (props) => {
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
        <UpdateProfile id={props.id} show={props.setModalShow}/>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateModal;
