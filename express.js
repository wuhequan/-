	
var Web3 = require("web3");
var express = require("express");
var http = require("http");
var bodyParser = require('body-parser');

var web3 = new Web3();

web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8546"));
	
var abi = [{"constant":false,"inputs":[{"name":"cand","type":"address"}],"name":"vote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"canAdd","type":"address"}],"name":"getCanNum","outputs":[{"name":"number","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"can1","type":"address"},{"name":"can2","type":"address"}],"name":"win","outputs":[{"name":"winner","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"canAdd2","type":"address"}],"name":"initCan2","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"vote","type":"address"}],"name":"initVoter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"canAdd1","type":"address"}],"name":"initCan1","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"","type":"string"},{"indexed":false,"name":"","type":"address"}],"name":"LogAddress","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"","type":"string"},{"indexed":false,"name":"","type":"uint256"}],"name":"LogUint","type":"event"}];	  
// 合约地址
var address = "0xc31d6caf433747c3758cfd90dd4814bebca5b493";
// 通过ABI和地址获取已部署的合约对象
var myContract = web3.eth.contract(abi).at(address);

var app = express(); 

app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By",' 3.2.1');
	res.header("Content-Type", "text/plain;charset=utf-8");
	next();
});


// app.get('/getCanNum', function (req, res) { 
// 	console.log(req.query.address);
// 	var re = myContract.getCanNum.call("0xd9ee24af31eacff4e8f07b260152a86d043b1c95");
// 	console.log(re);
// 	res.send(re); 9
// });

app.use(bodyParser.urlencoded({extended: false}));
app.post('/getCanNum', function (req, res) { 
	var re1 = myContract.getCanNum.call(req.body.address1);
	var re2 = myContract.getCanNum.call(req.body.address2);
	var re3 = myContract.getCanNum.call(req.body.address3);
	var re4 = myContract.getCanNum.call(req.body.address4);
	var jsObj = {    // 普通的JS对象  
	    'vote1': re1,  // 注意这里的id使用单引号括起来的，这在JS对象里面是允许的  
	    "vote2": re2,    // 也可以用双引号括起来        // 也可以什么都不用(最常用)  
	    "vote3": re3,  
	    "vote4": re4  
	}; 
	res.send(jsObj);
	
});

app.post('/vote', function (req, res) {
	var address=req.body.address;
	web3.personal.unlockAccount("0xd9ee24af31eacff4e8f07b260152a86d043b1c95", "123456");
	myContract.vote.sendTransaction(address,{from:"0xd9ee24af31eacff4e8f07b260152a86d043b1c95"}); 

	return res.send("vote success");
}) 

server = http.createServer(app);
server.listen(3000, function(){
	// console.log(web3.eth.accounts);
	//console.log(myContract);
	console.log('Server running on port http://127.0.0.1:3000/');
});






