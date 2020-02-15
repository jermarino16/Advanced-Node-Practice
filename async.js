//practice benchmarking OS requests in node
// we are not touching the threadpool here

const https = require("https");

const start = Date.now();

function doRequest(){
	https
		.request("https://www.google.com", res => {
		res.on("data", () => {});
		res.on("end", () => {
			console.log(Date.now() - start);
		});
	});
}

doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
