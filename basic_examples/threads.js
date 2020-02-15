process.env.UV_THREADPOOL_SIZE = 1;//experiment run times with threadpool sizes

const crypto = require("crypto");

//benchmark test
const start = Date.now();
crypto.pbkdf2("a", "b", 100000, 512, "sha512", () =>{
	console.log("1: ", Date.now() - start);
});

//this does not wait for the previous call to finish
crypto.pbkdf2("a", "b", 100000, 512, "sha512", () =>{
	console.log("2: ", Date.now() - start);
});
//this does not wait for the previous call to finish
crypto.pbkdf2("a", "b", 100000, 512, "sha512", () =>{
	console.log("3: ", Date.now() - start);
});
//this does not wait for the previous call to finish
crypto.pbkdf2("a", "b", 100000, 512, "sha512", () =>{
	console.log("4: ", Date.now() - start);
});
//this does not wait for the previous call to finish
crypto.pbkdf2("a", "b", 100000, 512, "sha512", () =>{
	console.log("5: ", Date.now() - start);
});

//this proves node is not single threaded