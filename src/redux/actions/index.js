import axios from "../axios"
import history from "../../history";
import _ from "lodash"

export const createAccount = (formValues) => async dispatch => {

  const response = await axios.post("/accounts", {
    ...formValues
  });

  dispatch({ type: "CREATE_ACCOUNT", payload: response.data })

  if (formValues.username !== undefined) {
    history.push(`/home/${formValues.username}`)
  }
}

export const checkRegister = (formValues) => async dispatch => {

  const response = await axios.get("/accounts");

  const arr = _.mapKeys(response.data, "id");

  const user = _.mapKeys(arr, "username");

  let status;
  if (user[formValues.username] !== undefined) {
    status = true;
  } else {
    status = false;
  }

  console.log(status);

  dispatch({ type: "CHECK_ACCOUNT", payload: status });
}

export const checkAccount = (formValues) => async dispatch => {
  const response = await axios.get("/accounts");

  const arr = _.mapKeys(response.data, "id");

  const user = _.mapKeys(arr, "username");

  let status;
  if (user[formValues.username] !== undefined) {
    if (user[formValues.username].password === formValues.password) {
      status = true;
      history.push(`/home/${formValues.username}`)
    }
  } else {
    status = false;
  }
  dispatch({ type: "CHECK_ACCOUNT", payload: status });
}

//Google OAuth action creators
export const signIn = (userId) => {
  return { type: "SIGN_IN", payload: userId };
};

export const signOut = () => {
  return { type: "SIGN_OUT" };
};
