import {combineReducers} from "redux";
import {reducer} from "redux-form"
import accountReducer from "./accountReducer"
import authReducer from "./OAuthReducer"

export default combineReducers({form: reducer, accounts: accountReducer, oauth: authReducer})
