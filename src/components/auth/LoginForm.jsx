import React from 'react'
import {reduxForm, Field} from "redux-form";
import {Button, Icon, Label} from "semantic-ui-react"
import {renderInput, validate} from "./formUtils"

const LoginForm = (props) => {

  return (<form className="ui form error">
    <Field name="username" label="Enter username" component={renderInput}/>
    <Field name="password" label="Enter password" component={renderInput}/>
    <Button.Group>
      <Button color="blue" onClick={() => this.props.changeForm("register")}>Register</Button>
      <Button.Or/>
      <Button positive="positive">Log in</Button>
      <Button.Or/>
      <Button color="red"><Icon name="google"/>Sign in with Google</Button>
    </Button.Group>
  </form>)
}

export default reduxForm({form: "loginForm", validate})(LoginForm);
