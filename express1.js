	
var Web3 = require("web3");
var express = require("express");
var http = require("http");

var web3 = new Web3();

web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8546"));
	
var abi = [{"constant":false,"inputs":[{"name":"cand","type":"address"}],"name":"vote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"canAdd","type":"address"}],"name":"getCanNum","outputs":[{"name":"number","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"can1","type":"address"},{"name":"can2","type":"address"}],"name":"win","outputs":[{"name":"winner","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"canAdd2","type":"address"}],"name":"initCan2","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"vote","type":"address"}],"name":"initVoter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"canAdd1","type":"address"}],"name":"initCan1","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"","type":"string"},{"indexed":false,"name":"","type":"address"}],"name":"LogAddress","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"","type":"string"},{"indexed":false,"name":"","type":"uint256"}],"name":"LogUint","type":"event"}];	  
// 合约地址
var address = "0x15caa4cbea14bedc032791df05fd285295e12b9d";
// 通过ABI和地址获取已部署的合约对象
var myContract = web3.eth.contract(abi).at(address);

var app = express(); 

app.get('/getCanNum', function (req, res) { 
	var re = myContract.getCanNum.call("0xd9ee24af31eacff4e8f07b260152a86d043b1c95");
	res.send(re); 
});

app.post('/vote', function (req, res) {
	
	res.writeHead(200,{"Content-Type":'text/plain','charset':'utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});
	web3.Personal.unlockAccount('0x33a3b2dfff4a9edf1f944e1e769ee0360b1b4621','123456',9999);
	myContract.vote.sendTransaction("0xd9ee24af31eacff4e8f07b260152a86d043b1c95",{from:"0x33a3b2dfff4a9edf1f944e1e769ee0360b1b4621"}); 
	res.send("vote success"); 
}) 



server = http.createServer(app);
server.listen(3000, function(){
	console.log(web3.eth.accounts);
	//console.log(myContract);
	console.log('Server running on port http://127.0.0.1:3000/');
});






