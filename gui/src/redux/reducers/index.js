import { combineReducers } from "redux";
import { reducer } from "redux-form";
import accountReducer from "./accountReducer";
import authReducer from "./OAuthReducer";
import transactionsReducer from "./transactionsReducer";
import waultsReducer from "./waultsReducer"

export default combineReducers({
  form: reducer,
  accounts: accountReducer,
  oauth: authReducer,
  transactions: transactionsReducer,
  waults: waultsReducer
});
