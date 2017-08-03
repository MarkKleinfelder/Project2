
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


app.use(bodyParser.urlencoded({ extended: true }));



/////////////////////////
//                     //
// **PASSPORT BELOW**  //
//                     //
/////////////////////////                  

mongoose.connect('mongodb://localhost/project2'); 

app.use(morgan('dev')); 
app.use(cookieParser());
app.use(bodyParser()); 

app.set('views', './views');
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.use(session({ secret: 'WDI-GENERAL-ASSEMBLY-EXPRESS' })); 
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











/***********WATSON CLIENT LIBRARY**************/

var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
// var tone_analyzer = new ToneAnalyzerV3({
//   username: '{b9219ac2-92c6-4752-9c7d-5baf887b2199}',
//   password: '{iMlAST68Iyqk}',
//   version_date: '{2016-05-19}'
// });

// var params = {
//   // Get the text from the JSON file.
//   text: require('tone.json').text,
//   tones: 'emotion'
// };

// tone_analyzer.tone(params, function(error, response) {
//   if (error)
//     console.log('error:', error);
//   else
//     console.log(JSON.stringify(response, null, 2));
//   }
// );

/***********DATABASE*************/
var db = require('./models');



/********ROUTS************/
//app.use(express.static('public'));



/********HTML END POINTS**********/
// app.get('/', function homepage(req, res) {
//   res.sendFile(__dirname + '/views/index.html');
// });

// app.get("https://watson-api-explorer.mybluemix.net/tone-analyzer/api/v3/tone?text="+$("#textToSubmit").val()+"&sentences=true&version=2016-05-19", function(req,res){
//     console.log(res.body);
//   })

/************JSON API ENDPOINTS****************/

// const apiUrl = "https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2016-05-19&sentences=false";

// request(apiUrl function(error, response, body){
// 	console.log(json.parse(body));
// })










/*************SERVER***************/

//listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});