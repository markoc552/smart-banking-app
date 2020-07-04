import web3 from "../web3";
import factory from "../build/FactorySBA";
import contract from "../build/SBAContract";

const instance = new web3.eth.Contract(
  JSON.parse(factory.interface),
  window.ENVIRONMENT.CONTRACT_ADDRESS
);

export const getContract = address =>
  new web3.eth.Contract(JSON.parse(contract.interface), address);

export default instance;
