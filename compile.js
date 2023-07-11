// const fs = require("fs").promises;
// const solc = require("solc");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const { default: Web3 } = require("web3");

const abi = [
    {
        "inputs": [],
        "name": "dec",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "inc",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "count",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "get",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]

const abiAddress = "0x42699A7612A82f1d9C36148af9C77354759b210b"
const host = "http://13.214.29.2:8545"

async function getValueAtAddress(
  ) {
    const web3 = new Web3(host);

    const contractInstance = new web3.eth.Contract(
      abi,
      abiAddress,
    );
    const res = await contractInstance.methods.get().call();
    console.log("Obtained value at deployed contract is: " + res);
    return res;
  }

async function setValueAtAddress(
  ) {
    let provider = new HDWalletProvider(process.env.WALLET_KEY, host);
    const web3 = new Web3(provider);
    const contractInstance = new web3.eth.Contract(
      abi,
      abiAddress,
    );
    const res = await contractInstance.methods.inc("0").send({
      from: "0xFE3B557E8Fb62b89F4916B721be55cEb828dBd73", gasPrice: "10", gasLimit: "0x24A22"
    });
    console.log("set value: " + res)
    return res;
  }

  setValueAtAddress(
).then(() => process.exit(0));