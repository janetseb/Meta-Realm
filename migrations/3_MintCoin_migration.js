const MintCoin = artifacts.require("MintCoin");

module.exports = function (deployer) {
  deployer.deploy(MintCoin);
};
