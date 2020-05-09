import React, { useEffect, useState } from 'react'
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux"
import { renderInput, validate } from "./formUtils";
import { Button, TransitionablePortal, Segment, Header } from "semantic-ui-react"
import OAuth2 from "./OAuth2"
import { checkRegister, createAccount } from "../../redux/actions"

const RegisterForm = (props) => {

  const [open, setOpen] = useState(false)

  useEffect(() => {
    console.log(props.status)
    if (props.status !== undefined) {
      if (props.status === true) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    }
  }, [props.status])

  const onSubmit = async (formValues) => {
    await props.checkRegister(formValues);
  }

  props.changeName("Register");

  return (<form className="ui form error" onSubmit={props.handleSubmit(onSubmit)}>
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
    <TransitionablePortal
        closeOnTriggerClick
        openOnTriggerClick
        open={open}>
        <Segment color="red" circular compact size="mini" textAlign="center" style={{left: "50%", position: 'fixed', top: '75%', marginTop: "-50px", marginLeft: "-100px", zIndex: 1000 }}>
          <Header>Username already exists</Header>
        </Segment>
      </TransitionablePortal>
  </form>)
}

const mapStateToProps = (state) => {
  return { status: state.accounts.status }
}

const wrap = reduxForm({ form: "registerForm", validate })(RegisterForm);

export default connect(mapStateToProps, { checkRegister, createAccount })(wrap);
