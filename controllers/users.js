var passport = require("passport") //required passport.js 

// GET /signup
function getSignup(request, response) {
	response.render('signup.ejs',{message: request.flash('signupMessage')});
}

// POST /signup
function postSignup(request, response, next) {
	//Signup new user
	let signupStrategy = passport.authenticate('local-signup', { //must be same as 'passport-use' in passport.js!!!
		successRedirect: '/',
		failureRedirect: '/signup',
		failureFlash: true
	});

	return signupStrategy(request, response, next);
};

// GET /login
function getLogin(request, response) { 
    response.render('login.ejs', { message: request.flash('loginMessage') });
  }


// POST /login 
function postLogin(request, response, next) {
		let loginStrategy = passport.authenticate('local-login', { //must be same as 'passport-use' in passport.js!!!
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: true
	});

	return loginStrategy(request, response, next);
};


// GET /logout
function getLogout(request, response, next) {
	request.logout();
	response.redirect('/')

};

// Restricted page
function secret(request, response){
	response.json('welcome to super secret')
}

module.exports = {
  getLogin: getLogin,
  postLogin: postLogin ,
  getSignup: getSignup,
  postSignup: postSignup,
  getLogout: getLogout,
  secret: secret
}