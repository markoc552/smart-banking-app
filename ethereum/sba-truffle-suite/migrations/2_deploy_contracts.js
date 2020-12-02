var FactorySBA = artifacts.require("FactorySBA")


module.exports = async function(deployer) {
  await deployer.deploy(FactorySBA);
};
