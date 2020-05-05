import React from 'react'
import { reduxForm, Field } from "redux-form";
import { renderInput, validate } from "./formUtils";
import { Button } from "semantic-ui-react"
import OAuth2 from "./OAuth2"

const RegisterForm = (props) => {

  props.changeName("Register");

  return (<form className="ui form error" onSubmit={props.handleSubmit(props.onSubmit)}>
    <Field name="username" label="Username" component={renderInput}/>
    <Field name="firstname" label="Firstname" component={renderInput}/>
    <Field name="lastname" label="Lastname" component={renderInput}/>
    <Field name="email" label="Email" component={renderInput}/>
    <Field name="password" type="password" label="Password" component={renderInput}/>
    <Button.Group>
      <Button color="blue">Register</Button>
      <Button.Or/>
        <OAuth2/>
    </Button.Group>
  </form>)
}

export default reduxForm({ form: "registerForm", validate })(RegisterForm);
