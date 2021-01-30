
var request      = require('request');
var express      = require('express');
var app          = express();
var mongoose     = require('mongoose');
var passport     = require('passport');
var flash        = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var twit         = require ('twit');
// var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
const { IamAuthenticator } = require('ibm-watson/auth');
var watson       = require('watson-developer-cloud');

//app.use(bodyParser.urlencoded());

//app.use(bodyParser.json());




/////////////////////////
/////////////////////////
//                     //
// **PASSPORT BELOW**  //
//                     //
///////////////////////// 
/////////////////////////

//mongoose.connect('mongodb://localhost/project2' || process.env.MONGODB_URI); 

app.use(morgan('dev')); 
app.use(cookieParser());
//app.use(bodyParser()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', './views');
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.use(session({ secret: "this is marks app" })); 
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash()); 

require('./config/passport')(passport);

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});


var routes = require('./config/routes');
app.use(routes);



/***********DATABASE*************/
var db = require('./models');


/********JSON API END POINTS**********/


app.get('/api', function api_index (req, res){
  res.json({
    message: "Welcome to Mark Kleinfelder's Project 2",
    documentation_url: "",
    base_url: "",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes available endpoints"}
    ]
  });
});


//____________get all users___________//
app.get('/api/users', function user_index(req, res){
  	db.User.find({},function(error, users){
    console.log(users);
    res.json(users);
 });
});


//______________GET results from API_________//




//______________INDEX all results____________//
app.get('/api/results', function results_index(req, res){
  db.Result.find({},function(error, results){
    console.log(results);
    res.json(results);
 });
});

//_______________SHOW results by id_________//
app.get('/api/results/:id', function(req,res){
  db.Result.findOne({ _id:req.params.id
	}, function(err,result){
	  res.json(result);
  })
})

//____________CREATE result object____//
app.post('/api/results', function(req,res){
    console.log('hit results');
	db.Result.create(req.body, function(error, result){
		console.log(result);
		res.json(result);
	});
});

//_______UPDATE result by id with comment__//
app.put('/api/results/:id', function(req,res){
	console.log("PUT hit");
	console.log(req.params.id);
    db.Result.findOneAndUpdate({_id: req.params.id},
   	{$set:{comment:req.body.comment}}, {new: false},
  	  function (err,result){
      if(err){
      	console.log("PUT error");
      }
       console.log("back-end PUT good")
       res.json(result);
      });
    });

 
//______________DELETE result by id_____//
app.delete('/api/results/:id', function(req,res){
	console.log("DELETE hit");
	console.log(req.params.id);
	db.Result.findOneAndRemove({_id: req.params.id}, function(err,deleted){
		if(err){
			console.log(err);
		}else{
			res.json(deleted);
		};
	});
});

// new

// const toneAnalyzer = new ToneAnalyzerV3({
//   version: '2017-09-21',
//   authenticator: new IamAuthenticator({
//     apikey: '-5AVVCPcTzCgostyM-A-EbS5eF7Vq9cdsm7fbOvfd91V',
//   }),
//   serviceUrl: 'https://api.us-south.tone-analyzer.watson.cloud.ibm.com/instances/5dd551bb-a22e-4728-831d-2a0162df7ca8',
//   headers: {
//     'X-Watson-Learning-Opt-Out': 'true'
//   }
// });

const text = 'Team, I know that times are tough! Product '
  + 'sales have been disappointing for the past three '
  + 'quarters. We have a competitive product, but we '
  + 'need to do a better job of selling it!';


const toneAnalyzer = new ToneAnalyzerV3({
  version: '2017-09-21',
  authenticator: new IamAuthenticator({
    apikey: '-5AVVCPcTzCgostyM-A-EbS5eF7Vq9cdsm7fbOvfd91V',
  }),
  serviceUrl: 'https://api.us-south.tone-analyzer.watson.cloud.ibm.com',
  disableSslVerification: true,
});
  


// const tone_analyzer = new ToneAnalyzerV3({
//   username: 'b9219ac2-92c6-4752-9c7d-5baf887b2199',
//   password: 'iMlAST68Iyqk',
//   version_date: '2016-05-19'
// });

const toneParams = {
  toneInput: { 'text': text },
  contentType: 'application/json',
};

// app.get('/api/tone'), function(req,res){
//   console.log('hit server.js with req', req);
//   toneAnalyzer.tone(toneParams)
//   .then(toneAnalysis => {
//     console.log(JSON.stringify(toneAnalysis, null, 2));
//   })
//   .catch(err => {
//     console.log('error:', err);
//   });
// }

app.get('/api/tone', function getTone(req, res){
  console.log('hit server.js with req2');
  toneAnalyzer.tone(toneParams)
  .then(toneAnalysis => {
    console.log(JSON.stringify(toneAnalysis, null, 2));
  })
  .catch(err => {
    console.log('error:', err);
  });
});












/*************SERVER***************/

//listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('server running');
});