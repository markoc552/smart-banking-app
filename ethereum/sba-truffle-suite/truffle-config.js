const HDWalletProvider = require('truffle-hdwallet-provider');

const secret = "15990754260ba847c54e2620e465dad4b11ca4db65a077f0bd4970d2162d02c2";

module.exports = {
  // Uncommenting the defaults below
  // provides for an easier quick-start with Ganache.
  // You can also follow this format for other networks;
  // see <http://truffleframework.com/docs/advanced/configuration>
  // for more details on how to specify configuration options!
  //
  networks: {
   development: {
     host: "127.0.0.1",
     port: 7545,
     network_id: "*",
     from: "0x228099a04cF7cCc537c815883e09836EA29307bf",
     gas: 6721975,
     gasPrice: 20000000000
   },
   test: {
     provider: () => new HDWalletProvider(secret, "http://localhost:8545"),
     port: 8545,
     from: "0x941199f9877636e5f83d3b5d9e85450092a8492b",
     network_id: "2018"
   }},
  compilers: {
    solc: {
      version: "0.4.17" // ex:  "0.4.20". (Default: Truffle's installed solc)
    }}
  //}
  //
};
