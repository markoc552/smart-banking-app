import React, { useState } from "react";
import { useSpring, useTransition, config, animated } from "react-spring";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { connect } from "react-redux";
import { createAccount } from "../redux/actions";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import "../index.css";
import { motion } from "framer-motion";

import {
  ModalContainer,
  Modal,
  Image,
  Header,
} from "../components/utils/StyledComponents";

const Login = (props) => {
  const [formState, setFormState] = useState("login");
  const [formName, setName] = useState("Login");


  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.7 } },
  };

  const renderForm = () => {
    if (formState === "login" || formState === "") {
      return <LoginForm changeForm={setFormState} />;
    } else if (formState === "register") {
      return <RegisterForm changeName={setName} changeForm={setFormState} />;
    }
  };

  return (
    <ModalContainer>
      <Container>
        <Row className="show-grid">
          <Col xs={1} md={4}></Col>
          <Col xs={4} md={4}>
            <motion.div style={{marginTop: "150px"}}initial="hidden" animate="visible" variants={variants}>
              <Modal>
                <Image src={require("../images/logo.png")} />
                <Header> {formName} </Header>
                <div>
                  <div> {renderForm()} </div>
                </div>
              </Modal>
            </motion.div>
          </Col>
          <Col xs={1} md={4}></Col>
        </Row>
      </Container>
    </ModalContainer>
  );
};

const mapStateToProps = (state) => {
  return { accounts: state.accounts };
};

export default connect(mapStateToProps, { createAccount })(Login);
