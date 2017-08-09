
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
var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
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

mongoose.connect('mongodb://localhost/project2'); 

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














/*************SERVER***************/

//listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('server running');
});