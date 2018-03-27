import Web3 from "web3";

//const web3 = new Web3(window.web3.currentProvider);
let web3;

if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  // We are in the browser and MetaMask is runing
  web3 = new Web3(window.web3.currentProvider);
} else {
  // we are on the server or the user is not running the MetaMask
  const provider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/QmVfPVvzXzhOiQY7vL54"
  );
  web3 = new Web3(provider);
}

export default web3;
