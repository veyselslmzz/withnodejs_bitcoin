var key = "c551835a-d636-4d5b-ab6a-26480c060ed8";
var secret = "9cd3ede0-d64e-4d73-a112-3fa17b97c611";

blockchain = require("./blockchain/blockChain");


client = blockchain.blockchain({
    apiKey: key,
    apiSecret: secret,
    network: "BTC",
    testnet: false
});

client.createNewWallet("mywallet", "mypassword",
     function(err, wallet, backupInfo) {
     console.log(wallet);
     console.log("----------");
     console.log(backupInfo);
});