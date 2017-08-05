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
	response.render('app.ejs')
}

////////////////////////
//                    //
//  **MY FUNCTIONS**  //
//                    //
//                    //
////////////////////////

//POST results
// function postResults(request, response){
// 	console.log('results hit');
//     db.Result.create(req.body, function(error, result){
//       res.json(result);
//       console.log(result);
//     })
// }


//PUT results
// function putResults(request, response){
// 	console.log('results hit');
// 	db.Result.update(req.body, function(error, result){
// 		console.log(result)
// 		res.json(result);
// 	})
// }




module.exports = {
  //putResults: putResults,
  //postResults: postResults,
  getLogin: getLogin,
  postLogin: postLogin,
  getSignup: getSignup,
  postSignup: postSignup,
  getLogout: getLogout,
  secret: secret
}