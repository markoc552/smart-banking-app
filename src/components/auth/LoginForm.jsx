import React, { useState, useEffect } from 'react'
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux"
import { Button, TransitionablePortal, Segment, Header } from "semantic-ui-react"
import { renderInput, validate } from "./formUtils"
import { checkAccount } from "../../redux/actions"
import OAuth2 from "./OAuth2";

const LoginForm = (props) => {

  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (props.status !== undefined) {
      if (props.status === false) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    }
  }, [props.status])

  return (<form className="ui form error" onSubmit={props.handleSubmit((formValues) => props.checkAccount(formValues))}>
    <Field name="username" type="text" label="Username" component={renderInput}/>
    <Field name="password" type="password" label="Password" component={renderInput}/>
    <Button.Group>
      <Button color="blue" onClick={() => props.changeForm("register")}>Register</Button>
      <Button.Or/>
      <Button positive>Log in</Button>
      <Button.Or/>
      <OAuth2/>
    </Button.Group>
    <TransitionablePortal
        closeOnTriggerClick
        openOnTriggerClick
        open={open}>
        <Segment color="red" circular compact size="mini" textAlign="center" style={{left: "50%", position: 'fixed', marginTop: "-50px", marginLeft: "-112px", top: "65%", zIndex: 1000 }}>
          <Header>Username/password incorrect!</Header>
        </Segment>
      </TransitionablePortal>
  </form>)
}

const mapStateToProps = (state) => {
  return { status: state.accounts.status }
}

const wrap = reduxForm({ form: "loginForm", validate })(LoginForm);

export default connect(mapStateToProps, { checkAccount })(wrap);
