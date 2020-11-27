var FactorySBA = artifacts.require("FactorySBA")


module.exports = function(deployer, accounts) {
  deployer.deploy(FactorySBA);
};
