const { clearHash } = require("../services/cache");

module.exports = async (req, res, next) => {
	await next(); //call the route handle to do everything it needs to do

	clearHash(req.user.id);
};