import axios from "../axios";
import history from "../../history";
import _ from "lodash";
import web3 from "../../ethereum/web3";
import factory, { getContract } from "../../ethereum/instances/factory";
import ethers from "ethers";

export const createAccount = formValues => async dispatch => {
  const response = await axios.post("/accounts", {
    ...formValues
  });

  dispatch({ type: "CREATE_ACCOUNT", payload: response.data });

  console.log(formValues);

  if (formValues.username !== undefined) {
    history.push(`/home/${formValues.username}`);
  }
};

export const checkRegister = formValues => async dispatch => {
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

export const checkAccount = formValues => async dispatch => {
  const response = await axios.get("/accounts");

  const arr = _.mapKeys(response.data, "id");

  const user = _.mapKeys(arr, "username");

  let status;
  if (user[formValues.username] !== undefined) {
    if (user[formValues.username].password === formValues.password) {
      status = true;
      history.push(`/home/${formValues.username}`);
    }
  } else {
    status = false;
  }
  dispatch({ type: "CHECK_ACCOUNT", payload: status });
};

export const getAccountName = username => async dispatch => {
  const response = await axios.get("/accounts");

  const arr = _.mapKeys(response.data, "id");

  const user = _.mapKeys(arr, "username");

  const name = user[username].firstname;
  const lastname = user[username].lastname;

  dispatch({ type: "GET_NAME", payload: `${name} ${lastname}` });
};

export const getAllAccounts = () => async dispatch => {
  const response = await axios.get("/accounts");

  const mappedId = _.mapKeys(response.data, "id");

  const mappedUser = _.mapKeys(mappedId, "username");

  dispatch({ type: "GET_ACCOUNTS", payload: mappedUser });
};

export const updateAccount = (username, formValues) => async dispatch => {
  const accounts = await axios.get("/accounts");

  const mappedId = _.mapKeys(accounts.data, "id");

  const mappedUser = _.mapKeys(mappedId, "username");

  const id = mappedUser[username].id;

  const response = await axios.patch(`/accounts/${id}`, formValues);

  console.log(response);

  dispatch({ type: "UPDATE_ACCOUNT", payload: response.data });

  history.push(`/home/${username}/profile`);
};

export const getEthStatus = id => async dispatch => {
  const accounts = await axios.get("/accounts");

  const mappedId = _.mapKeys(accounts.data, "id");

  const mappedUser = _.mapKeys(mappedId, "username");

  const wallet = mappedUser[id].data.wallet;

  const ethAddress = mappedUser[id].data.address;

  const mnemonic =  mappedUser[id].data.mnemonic;

  const contract = getContract(ethAddress);

  const balance = await contract.methods.getMoneyStatus().call();

  const waults = await contract.methods.getWaults().call();

  const transactionCount = await contract.methods.getTransactionCount().call();

  console.log({ balance, waults, transactionCount, mnemonic });

  dispatch({
    type: "ETH_STATUS",
    payload: { id, balance, waults, transactionCount, ethAddress, wallet, mnemonic }
  });
};

//Google OAuth action creators
export const signIn = userId => {
  return { type: "SIGN_IN", payload: userId };
};

export const signOut = () => {
  return { type: "SIGN_OUT" };
};

const createEthAccount = async formValues => {

  const bip39 = require('bip39')

  console.log(bip39)

  const mnemonic = bip39.entropyToMnemonic(ethers.utils.randomBytes(32))
  //
  // let account = web3.eth.accounts.create(web3.utils.randomHex(32));
  // let wallet = web3.eth.accounts.wallet.add(account);

  // const mnemonic = await ethers.utils.HDNode.entropyToMnemonic(ethers.utils.randomBytes(16));

  const wallet = ethers.Wallet.fromMnemonic(mnemonic);

  console.log(wallet);

  web3.eth.sendTransaction({
    to: wallet.address,
    from: "0xf2C6247bFD3383e044067FC416dC4Cef8D9D8135",
    value: web3.utils.toWei("0.2", "ether")
  });

  const contract = await factory.methods
    .createAccount(
      wallet.address,
      formValues.firstname,
      formValues.lastname,
      formValues.email
    )
    .send({
      from: "0xf2C6247bFD3383e044067FC416dC4Cef8D9D8135",
      gas: "6721975"
    });

  const address = await factory.methods.getAccount().call();

  return { address, wallet, mnemonic };
};
