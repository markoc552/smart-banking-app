import Web3 from "web3";
import HDWalletProvider from "truffle-hdwallet-provider";

let web3;

//Firstly check if client already has metamask installed in their browser
if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  window.ethereum.enable();
  web3 = new Web3(window.web3.currentProvider);
} else {
  //If not create new web3 provider
  //const provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545");
  const provider = new HDWalletProvider(
    "melt quarter picnic harvest praise fence course shuffle diary cherry wrestle fashion",
    "http://127.0.0.1:7545", 1
  );
  web3 = new Web3(provider);
}

console.log(web3);

export default web3;
