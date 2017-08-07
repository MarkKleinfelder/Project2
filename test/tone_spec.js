var User = require ("../models/user.js");
var Result = require("../models/results.js");
var expect = require ("chai").expect;

describe("User", function (){
	describe("new", function(){

		it("initializes a new user", function(){
		var person = new User();
		expect (typeof(person)).to.equal('object');
	    })
    })
})


describe('Result', function(){
	describe('new', function(){
		it("initializes a new result", function(){
			var result = new Result();
			expect (typeof(result)).to.equal('object');
		})
	})
})