var express = require('express');
var router = express.Router();
// Parses information from POST
var bodyParser = require('body-parser');
// Used to manipulate POST methods
var methodOverride = require('method-override');
var passport = require("passport");
var usersController = require('../controllers/users');
var staticsController = require('../controllers/statics');
mongoose.connect( process.env.MONGODB_URI || "YOUR CURRENT LOCALHOST DB CONNECTION STRING HERE" );


function authenticatedUser(req, res, next) {
   // If the user is authenticated, continue the execution
  if (req.isAuthenticated()) return next();
  // Otherwise the request is redirected home page
  res.redirect('/');}

router.route("/toneanalyzer")
  .get(authenticatedUser, usersController.secret)

router.route('/')
  .get(staticsController.home);

router.route('/signup')
  .get(usersController.getSignup)
  .post(usersController.postSignup)

router.route('/login')
  .get(usersController.getLogin)
  .post(usersController.postLogin)

router.route("/logout")
  .get(usersController.getLogout)


//////////////////////
//                  //
//                  //
//  **ROUTES**      //
//                  //
//////////////////////

//router.route("/secret")
  //.post(usersController.postResults) 
  //.put(usersController.putResults)

module.exports = router