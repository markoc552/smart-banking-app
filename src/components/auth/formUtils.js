import React from 'react';
import {Label} from "semantic-ui-react"

export const renderInput = ({input, label, meta}) => {
  const className = `field ${meta.error && meta.touched
    ? "error"
    : ""}`;
  return (<div className={className}>
    <label>{label}</label>
    <input {...input}/> {renderError(meta)}
  </div>);
};

export const renderError = ({error, touched}) => {
  //if error is true(not empty object) and also touched is true
  if (touched && error) {
    return (<Label basic="basic" color='red' pointing="above">
      {error}
    </Label>);
  }
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
  return errors;
};
