var mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI|| 
                  process.env.MONGOLAB_URI || 
                  process.env.MONGOHQ_URL || 
                  "mongodb://MarkKleinfelder:DrumPW@drumproject-shard-00-00.0iq1i.mongodb.net:27017,drumproject-shard-00-01.0iq1i.mongodb.net:27017,drumproject-shard-00-02.0iq1i.mongodb.net:27017/ToneDataBase?ssl=true&replicaSet=atlas-ko0ip2-shard-0&authSource=admin&retryWrites=true&w=majority");





module.exports.tone_analyzer = require("./toneApi.js");
module.exports.User = require("./user.js");
module.exports.Result = require("./results.js");