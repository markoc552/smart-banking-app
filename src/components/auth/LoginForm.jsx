import React, { useState, useEffect } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import {
  Button,
  TransitionablePortal,
  Segment,
  Header,
  Grid
} from "semantic-ui-react";
import { renderInput, validate } from "./formUtils";
import { checkAccount } from "../../redux/actions";
import OAuth2 from "./OAuth2";
import styled from "styled-components";
import "../../index.css";

const LoginForm = props => {
  const ButtonForm = styled.div`
    margin: 10px auto;
  `;

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (props.status !== undefined) {
      if (props.status === false) {
        setOpen(true);
        setTimeout(() => setOpen(false), "2000");
      } else {
        setOpen(false);
      }
    }
  }, [props.status]);

  return (
    <form
      className="ui form error formWidth"
      size="small"
      onSubmit={props.handleSubmit(formValues =>
        props.checkAccount(formValues)
      )}
    >
      <Field
        name="username"
        type="text"
        label="Username"
        component={renderInput}
      />
      <br/>
      <Field
        name="password"
        type="password"
        label="Password"
        component={renderInput}
      />
      <Grid centered padded="vertically" stackable>
        <ButtonForm>
          <Button.Group>
            <Button color="google plus" onClick={() => props.changeForm("register")}>
              Register
            </Button>
            <Button.Or />
            <Button color="vk">Log in</Button>
          </Button.Group>
        </ButtonForm>

        <TransitionablePortal
          closeOnTriggerClick
          openOnTriggerClick
          open={open}
        >
          <Segment
            color="red"
            circular
            compact
            size="mini"
            textAlign="center"
            style={{
              left: "50%",
              position: "fixed",
              marginTop: "-50px",
              marginLeft: "-112px",
              top: "65%",
              zIndex: 1000
            }}
          >
            <Header>Username/password incorrect!</Header>
          </Segment>
        </TransitionablePortal>
      </Grid>
    </form>
  );
};

const mapStateToProps = state => {
  return { status: state.accounts.status };
};

const wrap = reduxForm({ form: "loginForm", validate })(LoginForm);

export default connect(mapStateToProps, { checkAccount })(wrap);
