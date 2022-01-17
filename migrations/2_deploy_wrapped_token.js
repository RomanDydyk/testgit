//const WrappedToken = artifacts.require("WrappedToken");
const WWWToken = artifacts.require("WWWToken");
module.exports = async function (deployer) {
  await deployer.deploy(WWWToken);
  //const ERC20 = await WWWToken.deployed();
  // const LOTTO_TOKEN = '0xb0dFd28d3CF7A5897C694904Ace292539242f858'.toLowerCase();
  //await deployer.deploy(WrappedToken, ERC20.address);
};
