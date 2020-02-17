const mongoose = require("mongoose");
const redis = require("redis");
const util = require("util"); 

const redisUrl = "redis://127.0.0.1:6379";
const client = redis.createClient(redisUrl);
client.get = util.promisify(client.get);	//promisify function will make things return promise

const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.exec = async function () {

	//create the key with values from query and name
	const key = JSON.stringify(//json stringify to work with redis
		Object.assign({}, this.getQuery(), {
			collection: this.mongooseCollection.name
		})
	);

	//see if we have a value for key in redis
	const cacheValue = await client.get(key);
	//if we do return it
	if (cacheValue){
		const doc = JSON.parse(cacheValue);

		return Array.isArray(doc) 
		? doc.map(d => new this.model(d)) : new this.model(doc);
	}

	//otherwise issue query and store results in redis then return
	const result = await exec.apply(this, arguments);

	const cache_result = JSON.stringify(result);
	client.set(key, cache_result);
	
	return result;
}