const HDWalletProvider = require('@truffle/hdwallet-provider');
const mnemonic = 'similar common someone february river used disease blossom drop domain cup make';
const infuraKey = 'a0c608ea8aa643698e261bb18302cb15';

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    sepolia: {
      provider: () => new HDWalletProvider(mnemonic, `https://sepolia.infura.io/v3/${infuraKey}`),
      network_id: 11155111,
      gas: 5500000,
    }
  },
  compilers: {
    solc: {
      version: "0.8.0"
    }
  }
};
