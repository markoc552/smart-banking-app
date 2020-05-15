import React from 'react';
import { Label } from "semantic-ui-react"
import axios from "../../redux/axios";
import _ from "lodash"

export const renderInput = ({ input, label, meta }) => {
  const className = `field ${meta.error && meta.touched
    ? "error"
    : ""}`;
  const type = label === "Password" ? "password" : "text";
  return (<div className={className} style={{margin: "0 auto"}}>
    <label>{label}</label>
    <input {...input} type={type}/>
    {renderError(meta)}
  </div>);
};

export const renderError = ({ error, touched }) => {
  //if error is true(not empty object) and also touched is true
  if (touched && error)
    return (<Label basic color='red' pointing="above">
      {error}
    </Label>);
}

export const validate = (formValues) => {
  const errors = {};
  if (!formValues.username) {
    //only if user didn't enter any input
    errors.username = "You must enter username";
  }
  if (!formValues.password) {
    errors.password = "You must enter a password";
  }
  if (!formValues.firstname) {
    errors.firstname = "You must enter firstname"
  }
  if (!formValues.lastname) {
    errors.lastname = "You must enter lastname"
  }
  if (!formValues.email) {
    errors.email = "You must enter email"
  }
  return errors;
};
