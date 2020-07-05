import factory from "../build/FactorySBA";
import contract from "../build/SBAContract";
import HDWalletProvider from "truffle-hdwallet-provider";
import Web3 from "web3";
import web3 from "../web3";

const instance = new web3.eth.Contract(
  JSON.parse(factory.interface),
  window.ENVIRONMENT.CONTRACT_ADDRESS
);

export const getContract = (address, mnemonic) => {
  console.log(mnemonic)
  if (mnemonic !== undefined)
  {
    const provider = new HDWalletProvider(mnemonic, "HTTP://127.0.0.1:7545");

    const web3 = new Web3(provider);

    console.log(web3);

    return new web3.eth.Contract(JSON.parse(contract.interface), address);
  } else {
    return new web3.eth.Contract(JSON.parse(contract.interface), address);
  }
};

export default instance;
