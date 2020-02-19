require("../models/User");

const mongoose 		= require("mongoose");
const keys 			= require("../config/keys");

mongoose.Promise = global.Promise; //telling mongo to make use of the node js promise object
mongoose.connect(keys.mongoURI, { useMongoClient: true }); //deprecation warning

