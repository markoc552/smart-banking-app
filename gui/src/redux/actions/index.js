import React from "react";
import axios from "../axios";
import history from "../../history";
import _ from "lodash";
import web3 from "../../ethereum/web3";
import factory, {
  getWaultContract,
  getContract,
} from "../../ethereum/instances/factory";
import { ethers } from "ethers";
import { Icon } from "semantic-ui-react";
import moment from "moment";
import webb3 from "web3";

export const addFailedTransaction = (formValues) => async (dispatch) => {
  const failed = {
    recepient: formValues.recepient,
    time: moment().format("LLLL"),
    amount: formValues.amount,
  };

  dispatch({ type: "ADD_FAILED", payload: failed });
};

export const getWaultStatus = (address) => async (dispatch) => {
  let waultArr = [];

  address.map(async (i, index) => {
    const contract = getWaultContract(i);

    const wault = await contract.methods.getWaultStatus().call();

    console.log(wault);

    waultArr.push({
      reason: wault[3],
      time: moment.unix(wault[2]).format("MM/DD/YYYY"),
      amount: parseInt(wault[0]),
      saved: webb3.utils.fromWei(wault[1], "ether"),
    });
  });

  console.log(waultArr);
  dispatch({
    type: "GET_WAULT_STATUS",
    payload: { waults: waultArr, count: address.length },
  });
};

export const getWaults = (id) => async (dispatch) => {
  const accounts = await axios.get("/accounts");

  const mappedId = _.mapKeys(accounts.data, "id");

  const mappedUser = _.mapKeys(mappedId, "username");

  const wallet = mappedUser[id].data.wallet;

  const ethAddress = mappedUser[id].data.address;

  const mnemonic = mappedUser[id].data.mnemonic;

  const contract = getContract(ethAddress);

  const waults = await contract.methods.getWaults().call();

  dispatch({ type: "GET_WAULTS", payload: waults });
};

export const createAccount = (formValues) => async (dispatch) => {
  const response = await axios.post("/accounts", {
    ...formValues,
  });

  dispatch({ type: "CREATE_ACCOUNT", payload: response.data });

  dispatch(login());

  if (formValues.username !== undefined) {
    history.push(`/home/home/${formValues.username}`);
  }
};

export const login = () => async (dispatch) => {
  dispatch({ type: "LOG_IN", payload: true });
};

export const logout = () => async (dispatch) => {
  dispatch({ type: "LOG_OUT", payload: false });
};

export const chooseProfilePicture = (src) => async (dispatch) => {
  console.log(src);
  dispatch({ type: "CHOOSE_PROFILE", payload: src });
};

export const checkRegister = (formValues) => async (dispatch) => {
  const response = await axios.get("/accounts");

  const arr = _.mapKeys(response.data, "id");

  const user = _.mapKeys(arr, "username");

  let status;
  if (user[formValues.username] !== undefined) {
    status = true;
  } else {
    status = false;

    const data = await createEthAccount(formValues);

    dispatch(createAccount({ ...formValues, data }));
  }

  dispatch({ type: "CHECK_ACCOUNT", payload: status });
};

export const checkAccount = (formValues) => async (dispatch) => {
  const response = await axios.get("/accounts");

  const arr = _.mapKeys(response.data, "id");

  const user = _.mapKeys(arr, "username");

  let status;
  if (user[formValues.username] !== undefined) {
    if (user[formValues.username].password === formValues.password) {
      status = true;
      dispatch(login());
      history.push(`/home/home/${formValues.username}`);
    }
  } else {
    status = false;
  }
  dispatch({ type: "CHECK_ACCOUNT", payload: status });
};

export const getAccountName = (username) => async (dispatch) => {
  const response = await axios.get("/accounts");

  const arr = _.mapKeys(response.data, "id");

  const user = _.mapKeys(arr, "username");

  const name = user[username].firstname;
  const lastname = user[username].lastname;

  dispatch({ type: "GET_NAME", payload: `${name} ${lastname}` });
};

export const getAllAccounts = () => async (dispatch) => {
  const response = await axios.get("/accounts");

  const mappedId = _.mapKeys(response.data, "id");

  const mappedUser = _.mapKeys(mappedId, "username");

  dispatch({ type: "GET_ACCOUNTS", payload: mappedUser });
};

export const updateAccount = (username, formValues) => async (dispatch) => {
  const accounts = await axios.get("/accounts");

  const mappedId = _.mapKeys(accounts.data, "id");

  const mappedUser = _.mapKeys(mappedId, "username");

  const id = mappedUser[username].id;

  const response = await axios.patch(`/accounts/${id}`, formValues);

  dispatch({ type: "UPDATE_ACCOUNT", payload: response.data });

  history.push(`/home/${username}/profile`);
};

export const getEthStatus = (id) => async (dispatch) => {
  const accounts = await axios.get("/accounts");

  const mappedId = _.mapKeys(accounts.data, "id");

  const mappedUser = _.mapKeys(mappedId, "username");

  const wallet = mappedUser[id].data.wallet;

  const ethAddress = mappedUser[id].data.address;

  const mnemonic = mappedUser[id].data.mnemonic;

  const contract = getContract(ethAddress);

  const balance = await contract.methods.getMoneyStatus().call();

  const waults = await contract.methods.getWaults().call();

  const transactionCount = await contract.methods.getTransactionCount().call();

  let transactions = [];

  var i;
  for (i = 0; i < transactionCount; i++) {
    const transaction = await contract.methods.getTransactions(i).call();

    console.log(transaction);

    transactions.push({
      sender: transaction[0],
      recepient:
        transaction[1] === "0x0000000000000000000000000000000000000000"
          ? "Deposit"
          : transaction[1],
      time: moment(transactions[2]).format("LLLL"),
      amount: transaction[3],
    });
  }

  console.log(transactions);

  dispatch({
    type: "ETH_STATUS",
    payload: {
      id,
      balance,
      waults,
      transactionCount,
      ethAddress,
      wallet,
      mnemonic,
      transactions,
    },
  });
};

//Google OAuth action creators
export const signIn = (userId) => {
  return { type: "SIGN_IN", payload: userId };
};

export const signOut = () => {
  return { type: "SIGN_OUT" };
};

const createEthAccount = async (formValues) => {
  const bip39 = require("bip39");

  const mnemonic = bip39.entropyToMnemonic(ethers.utils.randomBytes(32));

  const wallet = ethers.Wallet.fromMnemonic(mnemonic);

  web3.eth.sendTransaction({
    to: wallet.address,
    from: `${window.ENVIRONMENT.AUTHORITY_ADDRESS}`,
    value: web3.utils.toWei("2.2", "ether"),
  });

  console.log("Money sent to account: ", wallet.address);

  console.log("OWNER:", wallet.address)

  const contract = await factory.methods
    .createAccount(
      wallet.address,
      formValues.firstname,
      formValues.lastname,
      formValues.email
    )
    .send({
      from: `${window.ENVIRONMENT.AUTHORITY_ADDRESS}`,
      gas: "6721975",
    });

  const address = await factory.methods.getAccount().call();

  return { address, wallet, mnemonic };
};

// const createTable = async () => {
//   const db = new Client({
//     host: "db",
//     user: "marko",
//     database: "postgres",
//     password: "admin123",
//     port: 5000,
//   });
//
//   await db.connect();
//
//   const crtbl = `
//   CREATE TABLE users (
//     id int PRIMARY KEY,
//     firstName VARCHAR (50) NOT NULL,
//     lastName VARCHAR (50) NOT NULL,
//     email VARCHAR (50) NOT NULL,
//     password VARCHAR (100) NOT NULL,
//     wallet VARCHAR (100) NOT NULL,
//     contract VARCHAR (100) NOT NULL,
//     createdAt DATETIME)
//   `;
//   db.query(crtbl, (err, res) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(res);
//     }
//   });
// };
