const HDWalletProvider = require('truffle-hdwallet-provider');

const secret = "e08b29c9cdbee9987946701c2088e295b2806dbf13d45000657354d780f7cd42";

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
     from: "0x1b58692b3731feA3b53ABd17C799e0Dc09E8F8c9",
     network_id: "2018"
   }},
  compilers: {
    solc: {
      version: "0.4.17" // ex:  "0.4.20". (Default: Truffle's installed solc)
    }}
  //}
  //
};
