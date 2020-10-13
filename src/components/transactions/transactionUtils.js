import {getContract} from "../../ethereum/instances/factory"


export const sendTransaction = async (formValues, ethUser) => {
  console.log(formValues);
  const owner = ethUser.wallet;

  const mnemonic = ethUser.mnemonic;

  const contractAddress = ethUser["ethAddress"];

  const contract = getContract(contractAddress, mnemonic);

  await contract.methods
    .sendMoney(formValues.receiver, formValues.amount)
    .send({
      from: String(owner.address),
      gas: "6721975",
    });
};

export const depositMoney = async (ethUser, money) => {
  const owner = ethUser.wallet;

  const mnemonic = ethUser.mnemonic;

  const contractAddress = ethUser["ethAddress"];

  const contract = getContract(contractAddress, mnemonic);

  await contract.methods
    .addMoneyToAccount()
    .send({
      from: String(owner.address),
      value: String(money),
      gas: "6721975"
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
      gas: "6721975"
    });
};
