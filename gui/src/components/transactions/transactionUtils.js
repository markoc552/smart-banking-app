import { getContract } from "../../ethereum/instances/factory";
import {doTransaction} from "../../backend-api"
import web3 from "../../ethereum/web3"

export const sendTransaction = async (formValues, ethUser) => {
  console.log(ethUser);
  const owner = ethUser.wallet;

  const mnemonic = ethUser.mnemonic;

  const contractAddress = ethUser["ethAddress"];

  //await doTransaction(owner.address, formValues.amount, contractAddress, mnemonic, "send-money");

  const contract = getContract(contractAddress, mnemonic);

  return contract.methods
    .sendMoney(formValues.recepient, String(web3.utils.toWei(String(formValues.amount), "ether")))
    .send({
      from: String(owner.address),
      gas: "6721975",
    })
};

export const depositMoney = async (ethUser, money) => {
  const owner = ethUser.wallet;

  const mnemonic = ethUser.mnemonic;

  const contractAddress = ethUser["ethAddress"];

  //await doTransaction(owner.address, money, contractAddress, mnemonic, "deposit");

  const contract = getContract(contractAddress, mnemonic);

  //web3.utils.toWei(String(money), "ether")

  await contract.methods.addMoneyToAccount().send({
    from: String(owner.address),
    value: String(web3.utils.toWei(String(money), "ether")),
    gas: "6721975",
  });
};

export const withDrawMoney = async (ethUser, money) => {
  const owner = ethUser.wallet;

  const mnemonic = ethUser.mnemonic;

  const contractAddress = ethUser["ethAddress"];

  //await doTransaction(owner.address, money, contractAddress, mnemonic, "withdraw");

  const contract = getContract(contractAddress, mnemonic);

  await contract.methods
    .withDrawMoney(String(web3.utils.toWei(String(money), "ether")), window.ENVIRONMENT.AUTHORITY_ADDRESS)
    .send({
      from: String(owner.address),
      gas: "6721975",
    });
};
