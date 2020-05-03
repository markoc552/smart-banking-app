import {combineReducers} from "redux";
import {reducer} from "redux-form"
import accountReducer from "./accountReducer"

export default combineReducers({form: reducer, accounts: accountReducer})
