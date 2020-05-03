import axios from "../axios"
import history from "../../history";

export const createAccount = (formValues) => async dispatch => {
  const response = await axios.post("/accounts", {
    ...formValues
  });

  dispatch({type: "CREATE_ACCOUNT", payload: response.data})
}
