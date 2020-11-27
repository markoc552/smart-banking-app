import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { motion } from "framer-motion";
import Alert from "react-bootstrap/Alert";
import { Button } from "semantic-ui-react";
import history from "../../history"

import {
  ModalContainer,
  Modal,
  Image,
  Header,
} from "../utils/StyledComponents";

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7 } },
};

const LoggedOut = (props) => {
  return (
    <ModalContainer>
      <Container>
        <Row className="show-grid">
          <Col xs={1} md={4}></Col>
          <Col xs={4} md={4}>
            <motion.div
              style={{ marginTop: "150px" }}
              initial="hidden"
              animate="visible"
              variants={variants}
            >
              <Alert variant="light">
                <Alert.Heading>You must be logged in.</Alert.Heading>
                <p>Please log in with the button below to enter the app.</p>
                <hr />
                <p className="mb-0">
                  <Button primary onClick={() => history.push("/")}>
                    Log in
                  </Button>
                </p>
              </Alert>
            </motion.div>
          </Col>
          <Col xs={1} md={4}></Col>
        </Row>
      </Container>
    </ModalContainer>
  );
};

export default LoggedOut;
