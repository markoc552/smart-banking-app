import Web3 from "web3"

let web3;

//Firstly check if client already has metamask installed in their browser
if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  window.ethereum.enable();
  web3 = new Web3(window.web3.currentProvider);
} else {
  //If not create new web3 provider
  const provider = new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/cfa590d4101540ac842853a371485a85");
  web3 = new Web3(provider);
}

export default web3;
