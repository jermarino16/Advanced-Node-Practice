const express = require("express");
const app = express();

function doWork(duration){
	const start = Date.now();
	while(Date.now() - start < duration){
		
	}
}

app.get("/", (req, res) => {
	doWork(5000);
	res.send("Hi there");
});

app.listen(process.env.PORT || 3000, process.env.ip, () =>{
	console.log("Server has started");
});