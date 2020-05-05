import React from 'react'
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux"
import { Button } from "semantic-ui-react"
import { renderInput, validate } from "./formUtils"
import { checkAccount } from "../../redux/actions"
import OAuth2 from "./OAuth2";

const LoginForm = (props) => {

  return (<form className="ui form error" onSubmit={props.handleSubmit((formValues) => props.checkAccount(formValues))}>
    <Field name="username" type="text" label="Enter username" component={renderInput}/>
    <Field name="password" type="password" label="Enter password" component={renderInput}/>
    <Button.Group>
      <Button color="blue" onClick={() => props.changeForm("register")}>Register</Button>
      <Button.Or/>
      <Button positive>Log in</Button>
      <Button.Or/>
      <OAuth2/>
    </Button.Group>
  </form>)
}

const mapStateToProps = (state) => {
  return { status: state.accounts.status }
}

const wrap = reduxForm({ form: "loginForm", validate })(LoginForm);

export default connect(mapStateToProps, { checkAccount })(wrap);
