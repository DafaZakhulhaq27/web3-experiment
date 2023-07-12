// const fs = require("fs").promises;
// const solc = require("solc");
require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
const { default: Web3 } = require("web3");

const abi = [
  {
    inputs: [],
    name: "dec",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "inc",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "count",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "get",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const abiAddress = process.env.ABI_ADDRESS;
const host = process.env.RPC_API;

async function getValueAtAddress() {
  const web3 = new Web3(host);

  const contractInstance = new web3.eth.Contract(abi, abiAddress);
  const res = await contractInstance.methods.get().call();
  console.log("Obtained value at deployed contract is: " + res);
  return res;
}

async function setValueAtAddress() {
  let provider = new HDWalletProvider(process.env.PRIVATE_KEY, host);
  const web3 = new Web3(provider);
  const contractInstance = new web3.eth.Contract(abi, abiAddress);
  const res = await contractInstance.methods.inc("0").send({
    from: process.env.SENDER_ADDRESS,
    gasPrice: "10",
    gasLimit: "0x24A22",
  });
  return res;
}

setValueAtAddress().then(() => process.exit(0));
