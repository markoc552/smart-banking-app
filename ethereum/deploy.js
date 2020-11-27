const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const factory = require("./build/FactorySBA.json");

const wallet = new HDWalletProvider("essence segment planet option recycle denial syrup voice grass youth chicken word", "https://rinkeby.infura.io/v3/cfa590d4101540ac842853a371485a85");

const web3 = new Web3(wallet);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy contract from: ", accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(factory.interface)).deploy({data: factory.bytecode}).send({gas: '10000000', from: accounts[0]});

  console.log("Address of the contract: ", result.options.address);
}

deploy();
