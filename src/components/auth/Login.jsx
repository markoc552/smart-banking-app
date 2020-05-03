import React, {useState} from 'react'
import ReactDOM from 'react-dom';
import {Header, Modal, Image} from "semantic-ui-react";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux"

import {createAccount} from "../../redux/actions"
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm"

const Login = (props) => {

  const [formState, setFormState] = useState("")

  const onSubmit = (formValues) => {
    props.createAccount(formValues);
  }

  const renderForm = () => {
    if (formState === "login" || formState === "") {
      return <LoginForm changeForm={setFormState}/>
    } else if (formState === "register") {
      return <RegisterForm onSubmit={onSubmit}/>;
    }
  }

  return ReactDOM.createPortal(<div>
    <Image src='https://images.pexels.com/photos/3183159/pexels-photo-3183159.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' fluid="fluid"/>
    <Modal dimmer="inverted" size="tiny" open={true} style={{
        textAlign: "center"
      }}>
      <Modal.Header>Sign up</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          {renderForm()}
        </Modal.Description>
      </Modal.Content>
    </Modal>
  </div>, document.querySelector("#login"))
}

const mapStateToProps = (state) => {
  return {accounts: state.accounts}
}

export default connect(mapStateToProps, {createAccount})(Login)
