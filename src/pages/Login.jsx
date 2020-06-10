import React, { useState } from "react";
import { connect } from "react-redux";
import { createAccount } from "../redux/actions";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import "../index.css";
import {ModalContainer, Modal, Image, Header} from "../components/utils/StyledComponents"

const Login = props => {

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
      <Modal>
        <Image src={require("../images/logo.png")} />
        <Header> {formName} </Header>
        <div>
          <div> {renderForm()} </div>
        </div>
      </Modal>
    </ModalContainer>
  );
};

const mapStateToProps = state => {
  return { accounts: state.accounts };
};

export default connect(mapStateToProps, { createAccount })(Login);
