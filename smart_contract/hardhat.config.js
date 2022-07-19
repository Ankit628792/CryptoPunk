require('dotenv').config();
require('@nomiclabs/hardhat-waffle');
require("@nomiclabs/hardhat-ethers");

// npx hardhat compile
// npx hardhat --network rinkeby run scripts/deploy.js

const { ALCHEMY_API_KEY } = process.env

module.exports = {
  solidity: '0.8.0',
  defaultNetwork: "polygon_mumbai",
  networks: {
    hardhat: {},
    polygon_mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: [`0x${process.env.METAMASK_PRIVATE_KEY}`] // metamask private key
    },
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [`0x${process.env.METAMASK_PRIVATE_KEY}`] // metamask private key
    },
    ropsten: {
      url: `https://eth-ropsten.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [`0x${process.env.METAMASK_PRIVATE_KEY}`] // metamask private key
    }
  }
}