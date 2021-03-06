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
     from: "0x2C37170726E934D67a5C398D526Fd8AfB5358409",
     gas: 6721975,
     gasPrice: 20000000000
   }},
   test: {
     host: "127.0.0.1",
     port: 7545,
     network_id: "*"
   },
  compilers: {
    solc: {
      version: "0.4.17" // ex:  "0.4.20". (Default: Truffle's installed solc)
    }}
  //}
  //
};
