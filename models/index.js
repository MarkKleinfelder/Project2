var mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI|| 
                  process.env.MONGOLAB_URI || 
                  process.env.MONGOHQ_URL);





module.exports.User = require("./user.js");
module.exports.Result = require("./results.js");