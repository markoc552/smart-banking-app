import { getContract } from "../../ethereum/instances/factory";
import web3 from "../../ethereum/web3"

export const sendTransaction = (formValues, ethUser) => {
  console.log(ethUser);
  const owner = ethUser.wallet;

  const mnemonic = ethUser.mnemonic;

  const contractAddress = ethUser["ethAddress"];

  const contract = getContract(contractAddress, mnemonic);

  let error;

  contract.methods
    .sendMoney(formValues.recepient, formValues.amount)
    .send({
      from: String(owner.address),
      gas: "6721975",
    })
    .then(() => console.log("sent succesfully"))
    .catch((err) => {
      console.log(err);
      error = err;
    });

  return error;
};

export const depositMoney = async (ethUser, money) => {
  const owner = ethUser.wallet;

  const mnemonic = ethUser.mnemonic;

  const contractAddress = ethUser["ethAddress"];

  const contract = getContract(contractAddress, mnemonic);

  //web3.utils.toWei(String(money), "ether")

  await contract.methods.addMoneyToAccount().send({
    from: String(owner.address),
    value: String(money),
    gas: "6721975",
  });
};

export const withDrawMoney = async (ethUser, money) => {
  const owner = ethUser.wallet;

  const mnemonic = ethUser.mnemonic;

  const contractAddress = ethUser["ethAddress"];

  const contract = getContract(contractAddress, mnemonic);

  await contract.methods
    .withDrawMoney(money, window.ENVIRONMENT.AUTHORITY_ADDRESS)
    .send({
      from: String(owner.address),
      gas: "6721975",
    });
};
