var mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI); || 
                  process.env.MONGOLAB_URI || 
                  process.env.MONGOHQ_URL || 
                  "mongodb://localhost/project2";





module.exports.tone_analyzer = require("./toneApi.js");
module.exports.User = require("./user.js");
module.exports.Result = require("./results.js");