const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");


const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
	res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
	// CornerCaseChecks if req.body.crypto exists and/or is empty
	// console.log(req.body.crypto);
	// console.log(req.body.fiat);
	
	// request("https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD", function(error, response, body){
	request("https://apiv2.bitcoinaverage.com/indices/global/ticker/" + req.body.crypto + req.body.fiat, function(error, response, body){
		var data = JSON.parse(body);

		var price = data.last;

		res.send("<html><h1> The price of 1 " + req.body.crypto + " is " + price + " " + req.body.fiat + "</h1></html>");
	});
});

app.listen(3000, function() {
	console.log("Server is running on port 3000");
});
