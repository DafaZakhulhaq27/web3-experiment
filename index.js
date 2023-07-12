require("dotenv").config();
const { Web3 } = require("web3");
const Abi = require("./abi");
const HDWalletProvider = require("@truffle/hdwallet-provider");

// INIT
let provider = new HDWalletProvider(
  process.env.PRIVATE_KEY,
  process.env.RPC_API
);
const web3 = new Web3(provider);

// Example values for sender and private key
const privateKey = process.env.PRIVATE_KEY;
const senderAddress = process.env.SENDER_ADDRESS;
const receiptAddress = process.env.RECEIPT_ADDRESS;
const host = process.env.RPC_API;

// Data
const dataObject = {
  name: "dafa",
  email: "dafa@gmail.com",
  phone: "081123456789",
  company: "xxx",
  title: "xxxx",
};
const dataHex = web3.utils.utf8ToHex(JSON.stringify(dataObject));

// ABI
const abiAddress = process.env.ABI_ADDRESS;

// TRANSACTION IN SMART CONTRACT
(async () => {
  const contractInstance = new web3.eth.Contract(Abi, abiAddress);
  const res = await contractInstance.methods.inc("0").send({
    from: process.env.SENDER_ADDRESS,
    gasPrice: "10",
    gasLimit: "0x24A22",
  });

  console.log(res, "res");
})();

// TRANSFER BEETWEN ACCOUNT
// (async () => {
//   try {
//     const balance = await web3.eth.getBalance(senderAddress);
//     const balanceInEther = web3.utils.fromWei(balance, "ether");
//     console.log(`Account balance: ${balanceInEther} Ether`);

//     const nonce = await web3.eth.getTransactionCount(senderAddress);
//     const gasPrice = 20e9;
//     const gasLimit = web3.utils.toHex(31000);

//     const rawTransaction = {
//       from: senderAddress,
//       to: receiptAddress,
//       value: web3.utils.toWei("1", "ether"),
//       gasPrice,
//       gasLimit,
//       nonce: web3.utils.toHex(nonce),
//       data: dataHex,
//     };

//     const signedTransaction = await web3.eth.accounts.signTransaction(
//       rawTransaction,
//       '0x' + privateKey
//     );

//     console.log("Signed transaction:", signedTransaction);

//     web3.eth
//       .sendSignedTransaction(signedTransaction.rawTransaction)
//       .on("transactionHash", (hash) => {
//         console.log("Transaction hash:", hash);
//       })
//       .on("receipt", (receipt) => {
//         console.log("Transaction receipt:", receipt);
//       })
//       .on("error", (error) => {
//         console.error("Transaction error:", error);
//       });
//   } catch (error) {
//     console.error("Error:", error);
//   }
// })();
