import React from 'react'
import {reduxForm, Field} from "redux-form";
import {renderError, renderInput, validate} from "./formUtils";
import {Button, Icon, Label} from "semantic-ui-react"

const RegisterForm = (props) => {

  return (<form className="ui form error">
    <Field name="username" label="Username" component={renderInput}/>
    <Field name="firstname" label="Firstname" component={renderInput}/>
    <Field name="lastname" label="Lastname" component={renderInput}/>
    <Field name="email" label="Email" component={renderInput}/>
    <Field name="password" label="Password" component={renderInput}/>
    <Button.Group>
      <Button color="blue" onClick={this.props.changeForm("register")}>Register</Button>
      <Button.Or/>
      <Button color="red"><Icon name="google"/>Sign in with Google</Button>
    </Button.Group>
  </form>)

}

export default reduxForm({form: "registerForm", validate})(RegisterForm);
