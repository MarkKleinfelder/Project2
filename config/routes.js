var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var passport = require("passport");
var usersController = require('../controllers/users');
var staticsController = require('../controllers/statics');
var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');


function authenticatedUser(req, res, next) {
   // If the user is authenticated, continue
  if (req.isAuthenticated()) return next();
  // If not the request is redirected home page
  res.redirect('/');}

router.route("/toneanalyzer")
  .get(authenticatedUser, usersController.toneAnalyzer)
  // .post(usersController.submitApiText);

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


module.exports = router