var passport = require("passport"); 
var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
var watson         = require('watson-developer-cloud');

// GET signup 
function getSignup(request, response) {
	response.render('signup.ejs',{message: request.flash('signupMessage')});
}

// POST signup
function postSignup(request, response, next) {
	//Signup new user
	let signupStrategy = passport.authenticate('local-signup', { //must be same as 'passport-use' in passport.js!!!
		successRedirect: '/toneanalyzer',
		failureRedirect: '/signup',
		failureFlash: true
	});

	return signupStrategy(request, response, next);
};

// GET login
function getLogin(request, response) { 
    response.render('login.ejs', { message: request.flash('loginMessage') });
  }


// POST login 
function postLogin(request, response, next) {
		let loginStrategy = passport.authenticate('local-login', { //must be same as 'passport-use' in passport.js!!!
		successRedirect: '/toneanalyzer',
		failureRedirect: '/login',
		failureFlash: true
	});

	return loginStrategy(request, response, next);
};


// GET logout
function getLogout(request, response, next) {
	request.logout();
	response.redirect('/')

};

// Restricted page
function toneAnalyzer(request, response){
	response.render('app.ejs')
}

////////////////////////
//                    //
//  **FUNCTIONS**     //
//                    //
//                    //
////////////////////////


var tone_analyzer = new ToneAnalyzerV3({
  username: 'b9219ac2-92c6-4752-9c7d-5baf887b2199',
  password: 'iMlAST68Iyqk',
  version_date: '2016-05-19'
});

function submitApiText (request, response){
	console.log("hit submitApiText");
tone_analyzer.tone({ text: 'Greetings from Watson Developer Cloud!' }, function(err, tone) {
  if (err) {
    console.log(err);
  } else {
    console.log('tone endpoint:');
    console.log(JSON.stringify(tone, null, 2));
  };
});
};




module.exports = {
  //putResults: putResults,
  //postResults: postResults,
  submitApiText: submitApiText,
  getLogin: getLogin,
  postLogin: postLogin,
  getSignup: getSignup,
  postSignup: postSignup,
  getLogout: getLogout,
  toneAnalyzer: toneAnalyzer
}