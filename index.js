require("dotenv").config();
const { Web3 } = require("web3");
const web3 = new Web3(process.env.RPC_API);
// web3.eth.getBlock("latest").then((answer) => console.log(answer));
// web3.eth.getBlockNumber().then((blockNum) => console.log(blockNum));

// Example values for sender and private key
const privateKey = process.env.PRIVATE_KEY;
const senderAddress = process.env.SENDER_ADDRESS;
const receiptAddress = process.env.RECEIPT_ADDRESS;

(async () => {
  try {
    const balance = await web3.eth.getBalance(senderAddress);
    const balanceInEther = web3.utils.fromWei(balance, "ether");
    console.log(`Account balance: ${balanceInEther} Ether`);

    const nonce = await web3.eth.getTransactionCount(senderAddress);
    const gasPrice = 20e9;
    const gasLimit = web3.utils.toHex(21000);

    const rawTransaction = {
      from: senderAddress,
      to: receiptAddress,
      value: web3.utils.toWei("1", "ether"),
      gasPrice,
      gasLimit,
      nonce: web3.utils.toHex(nonce),
      data: "",
    };

    const signedTransaction = await web3.eth.accounts.signTransaction(
      rawTransaction,
      privateKey
    );

    console.log("Signed transaction:", signedTransaction);

    web3.eth
      .sendSignedTransaction(signedTransaction.rawTransaction)
      .on("transactionHash", (hash) => {
        console.log("Transaction hash:", hash);
      })
      .on("receipt", (receipt) => {
        console.log("Transaction receipt:", receipt);
      })
      .on("error", (error) => {
        console.error("Transaction error:", error);
      });
  } catch (error) {
    console.error("Error:", error);
  }
})();
