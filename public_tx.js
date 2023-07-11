const path = require("path");
const fs = require("fs-extra");
const web3 = new Web3(host);
// use the existing Member1 account address or make a new account
const address = "f0e2db6c8dc6c681bb5d6ad121a107f300e9b2b5";

// read in the contracts
const contractJsonPath = path.resolve(__dirname, "dummy_contract.sol.json");
const contractJson = JSON.parse(fs.readFileSync(contractJsonPath));
const contractAbi = contractJson.abi;
const contractByteCode = contractJson.evm.bytecode.object;

async function createContract(
  host,
  contractAbi,
  contractByteCode,
  contractInit,
  fromAddress,
) {
  const web3 = new Web3(host);
  const contractInstance = new web3.eth.Contract(contractAbi);
  const ci = await contractInstance
    .deploy({ data: "0x" + contractByteCode, arguments: [contractInit] })
    .send({ from: fromAddress, gasLimit: "0x24A22" })
    .on("transactionHash", function (hash) {
      console.log("The transaction hash is: " + hash);
    });
  return ci;
}

// create the contract
async function main() {
  // using Member1 to send the transaction from
  createContract(
    "http://13.214.29.2:20000",
    contractAbi,
    contractByteCode,
    47,
    address,
  )
    .then(async function (ci) {
      console.log("Address of transaction: ", ci.options.address);
    })
    .catch(console.error);
}