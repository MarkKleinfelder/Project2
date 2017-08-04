var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs');

var User = mongoose.Schema({
    local : {
    email : String,
    password : String
	},
    result:[{
    	anger: Number,
	    disgust: Number,
	    fear: Number,
 	    joy: Number,
        sadness: Number
    }]
   
});

User.methods.hash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

User.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.local.password);
};




module.exports = mongoose.model('User', User);