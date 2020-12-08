var express = require("express");
var app = express();
var request = require("request");
var bodyparser = require("body-parser");
var bitcore = require("bitcore-lib");

app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());

app.set("view engine", "ejs");

function brainWallet(uinput, callback){
   var input = new Buffer(uinput);
    var hash = bitcore.crypto.Hash.sha256(input);
    var bn = bitcore.crypto.BN.fromBuffer(hash);
    var pk = new bitcore.PrivateKey(bn).toWIF();
    var addy = new bitcore.PrivateKey(bn).toAddress();  
    callback(pk, addy);
};
function getPrice(returnPrice){
    
    request({
    url: "https://blockchain.info/tobtc?currency=USD&value=500",
    json: true
  }, function(err, res, body){
    returnPrice(body.btc_usd_last);
    
  
   
    });

    
};


app.get("/", function(req, res){
    getPrice(function(lastPrice){
    res.render("index", {
    lastPrice: lastPrice
       
       }); 
   });
 
});


app.get("brain", function(req, res){
    getPrice(function(lastPrice){
    res.render("brain", {
    lastPrice: lastPrice
       
       }); 
   });
});


app.get("/converter", function(req, res){
     getPrice(function(lastPrice){
     res.render("converter", {
     lastPrice: lastPrice
       
       }); 
   });
});

app.post("/wallet", function(req, res){
    var brainsrc = req.body.brainsrc;
    console.log(brainsrc);
    brainWallet(brainsrc, function(priv, addr){
    res.send("The Brain Wallet of" + brainsrc + " <br>Addy: " + addr + "<br>Private Key: " + priv);    
    });   
});

app.get("/block", function(req, res){
    res.sendFile("index.html");
});

app.listen(8080,function(){
    console.log("go");
});