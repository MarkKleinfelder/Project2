var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ResultSchema = new Schema({
	    anger: Number,
	    disgust: Number,
	    fear: Number,
 	    joy: Number,
        sadness: Number
    })

module.exports = mongoose.model('Result', ResultSchema)