import React, { useState } from "react";
import {useTransition, animated} from "react-spring"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { connect } from "react-redux";
import { createAccount } from "../redux/actions";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import "../index.css";
import {
  ModalContainer,
  Modal,
  Image,
  Header,
} from "../components/utils/StyledComponents";

const Login = (props) => {
  const [formState, setFormState] = useState("");
  const [formName, setName] = useState("Login");

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
            <Modal>
              <Image src={require("../images/logo.png")} />
              <Header> {formName} </Header>
              <div>
                <div> {renderForm()} </div>
              </div>
            </Modal>
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
