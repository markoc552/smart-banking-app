import React, { useState } from 'react'
import ReactDOM from 'react-dom';
import { Modal, Image } from "semantic-ui-react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux"

import { createAccount } from "../../redux/actions"
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm"

const Login = (props) => {

  const [formState, setFormState] = useState("")
  const [formName, setName] = useState("Login")

  const onSubmit = (formValues) => {
    props.createAccount(formValues);
  }

  const renderForm = () => {
    if (formState === "login" || formState === "") {
      return <LoginForm changeForm={setFormState}/>
    } else if (formState === "register") {
      return <RegisterForm changeName={setName} onSubmit={onSubmit} changeForm={setFormState}/>;
    }
  }

  return ReactDOM.createPortal(<div>
    <Modal size="tiny" dimmer="inverted" open={true} style={{
        textAlign: "center"
      }}>
      <Image size="tiny" verticalAlign="middle" src={require("../../logo.png")}/>
      <Modal.Header>{formName}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          {renderForm()}
        </Modal.Description>
      </Modal.Content>
    </Modal>
  </div>, document.querySelector("#login"))
}

const mapStateToProps = (state) => {
  return { accounts: state.accounts }
}

export default connect(mapStateToProps, { createAccount })(Login)
