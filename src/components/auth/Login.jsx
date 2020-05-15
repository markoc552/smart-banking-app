import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { createAccount } from "../../redux/actions";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const Login = props => {
  const Modal = styled.div`
    position: relative;
    height: 55%;
    width: 40%;
    border: 1px gray;
    border-radius: 20px;
    margin: 100px auto 0px auto;
    background-color: white;
    z-index: 1;
    padding: 10px;
  `;

  const ModalContainer = styled.div`
    background-image: url("https://images.unsplash.com/photo-1538691929598-f3c649a7b92e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    padding-top: 15px;
    padding-bottom: 100px;
    position: absolute;
    left: 0;
    right: 0;
  `;

  const Image = styled.img`
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 100px;
    height: 100px;
  `;
  const Header = styled.div`
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    margin-top: 10px;
  `;

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
        <Image src={require("../../logo.png")} /> <Header> {formName} </Header>{" "}
        <div>
          <div> {renderForm()} </div>{" "}
        </div>{" "}
      </Modal>
    </ModalContainer>
  );
};

const mapStateToProps = state => {
  return { accounts: state.accounts };
};

export default connect(mapStateToProps, { createAccount })(Login);
