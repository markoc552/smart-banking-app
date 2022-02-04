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
      <motion.div
        style={{ margin: "0 auto" }}
        initial="hidden"
        animate="visible"
        variants={variants}
      >
        <Modal>
          <Image src={require("../assets/images/logo.png")} />
          <Header> {formName} </Header>
          <div>
            <div> {renderForm()} </div>
          </div>
        </Modal>
      </motion.div>
    </ModalContainer>
  );
};

const mapStateToProps = (state) => {
  return { accounts: state.accounts };
};

export default connect(mapStateToProps, { createAccount })(Login);
