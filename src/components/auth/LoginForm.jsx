import React, { useState, useEffect } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import {
  Button,
  TransitionablePortal,
  Segment,
  Header,
  Grid,
  Label
} from "semantic-ui-react";
import { renderInput, validate } from "./formUtils";
import { checkAccount } from "../../redux/actions";
import OAuth2 from "./OAuth2";
import styled from "styled-components";
import "../../index.css";

const LoginForm = (props) => {
  const ButtonForm = styled.div`
    margin: 10px auto;
  `;

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (props.status !== undefined) {
      if (props.status === false) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    }
  }, [props.status]);

  return (
    <form
      className="ui form error formWidth"
      size="small"
      onSubmit={props.handleSubmit((formValues) =>
        props.checkAccount(formValues)
      )}
    >
      <Field
        name="username"
        type="text"
        label="Username"
        component={renderInput}
      />
      <br />
      <Field
        name="password"
        type="password"
        label="Password"
        component={renderInput}
      />
      <Grid centered padded="vertically" stackable>
        {open && (
          <Label basic color="red" style={{marginTop: "10px"}}>
            Username/Password incorrect
          </Label>
        )}
        <ButtonForm>
          <Button.Group>
            <Button
              color="google plus"
              onClick={() => props.changeForm("register")}
            >
              Register
            </Button>
            <Button.Or />
            <Button color="vk">Log in</Button>
          </Button.Group>
        </ButtonForm>
      </Grid>
    </form>
  );
};

const mapStateToProps = (state) => {
  return { status: state.accounts.status };
};

const wrap = reduxForm({ form: "loginForm", validate })(LoginForm);

export default connect(mapStateToProps, { checkAccount })(wrap);
