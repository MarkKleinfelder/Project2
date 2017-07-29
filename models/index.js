var mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || 
                  process.env.MONGOLAB_URI || 
                  process.env.MONGOHQ_URL || 
                  "mongodb://localhost/project2");







//module.exports.Campsite = require("./campsite.js.example");
//module.exports.Pet = require("./pets.js");