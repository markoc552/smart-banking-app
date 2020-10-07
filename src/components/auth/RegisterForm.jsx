import React, { useEffect, useState } from "react";
import { reduxForm, Field } from "redux-form";
import { connect, useSelector } from "react-redux";
import { renderInput, validate } from "./formUtils";
import {
  Button,
  TransitionablePortal,
  Segment,
  Header,
  Image,
} from "semantic-ui-react";
import OAuth2 from "./OAuth2";
import styled from "styled-components";
import { checkRegister, createAccount, chooseProfilePicture } from "../../redux/actions";
import "../../index.css";
import ProfilePictureChooser from "./ProfilePictureChooser";

const RegisterForm = (props) => {
  const ButtonForm = styled.div`
    margin: 10px auto;
  `;

  const [open, setOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const profile = useSelector(state => state.accounts.profile)


  useEffect(() => {
    if (props.status !== undefined) {
      if (props.status === true) {
        setOpen(true);
        setTimeout(() => setOpen(false), "2000");
      } else {
        setOpen(false);
      }
    }
  }, [props.status]);

  const onSubmit = async (formValues) => {
    setOpen(false);

    await props.checkRegister(formValues);
  };

  props.changeName("Register");

  const change = () => {
    props.changeForm("login");
    props.changeName("Login");
  };

  return (
    <form
      className="ui form error formWidth"
      onSubmit={props.handleSubmit(onSubmit)}
    >
      <div style={{display: "flex", flexDirection: "row"}}>
        <Image
          centered
          size="tiny"
          src={profile}
          style={{ paddingBottom: "10px", marginTop: "-10px" }}
          label={{
            color: "blue",
            corner: "right",
            icon: "user plus",
            size: "mini",
            as: "a",
            onClick: ()=>{openProfile === true ? setOpenProfile(false) : setOpenProfile(true)}
          }}
        />
      <ProfilePictureChooser setOpen={setOpenProfile} open={openProfile}/>
      </div>
      <Field name="username" label="Username" component={renderInput} />
      <br />
      <Field name="firstname" label="Firstname" component={renderInput} />
      <br />
      <Field name="lastname" label="Lastname" component={renderInput} />
      <br />
      <Field name="email" label="Email" component={renderInput} />
      <br />
      <Field
        name="password"
        type="password"
        label="Password"
        component={renderInput}
      />
      <ButtonForm>
        <Button.Group>
          <Button color="linkedin" onClick={() => change()}>
            Back
          </Button>
          <Button.Or />
          <Button color="google plus">Register</Button>
        </Button.Group>
      </ButtonForm>
      <TransitionablePortal closeOnTriggerClick openOnTriggerClick open={open}>
        <Segment
          color="red"
          circular
          compact
          size="mini"
          textAlign="center"
          style={{
            left: "50%",
            position: "fixed",
            top: "75%",
            marginTop: "-50px",
            marginLeft: "-100px",
            zIndex: 1000,
          }}
        >
          <Header>Username already exists</Header>
        </Segment>
      </TransitionablePortal>
    </form>
  );
};

const mapStateToProps = (state) => {
  return { status: state.accounts.status };
};

const wrap = reduxForm({ form: "registerForm", validate })(RegisterForm);

export default connect(mapStateToProps, { checkRegister, createAccount, chooseProfilePicture })(wrap);
