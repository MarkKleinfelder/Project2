var express = require('express'),
    app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var request = require('request');

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
app.use(express.static('public'));



/********HTML END POINTS**********/
app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// app.get("https://watson-api-explorer.mybluemix.net/tone-analyzer/api/v3/tone?text="+$("#textToSubmit").val()+"&sentences=true&version=2016-05-19", function(req,res){
//     console.log(res.body);
//   })

/************JSON API ENDPOINTS****************/

// app.get('/api', function api_index(req, res) {

//   res.json({ 
//     message: "PROJECT 2 API!",
//     documentation_url: "", 
//     base_url: "https://*****.herokuapp.com/", // CHANGE ME
//     endpoints: [
//       {method: "GET", path: "/api", description: "Describes all available endpoints"},
//       {method: "GET", path: "/api/**", description: ""}, // CHANGE ME
//       {method: "GET", path: "/api/**/", description: ""},
//       {method: "POST", path: "/api/**", description: ""}, // CHANGE ME
//       {method: "PUT", path: "/api/**", description: ""},
//       {method: "DELETE", path: "/api/**", description: ""}
//     ]
//   })
// });




// app.get('/api/profile', function (req,res){
//   res.json({
//     name: "Mark",
//     human: true,
//     github: "https://github.com/MarkKleinfelder",
//     profile_image:"https://avatars3.githubusercontent.com/u/27730336?v=4&u=114faacadfb0312481daa040892580aa1eb7cabc&s=400",
//     current_city: "Denver",
//     family: [{name: "David", relationship:"Brother", occupation: 'Police Officer'}, {name: "Steven", relationship: "Brother", occupation: "USMC"}]
//   })
// })
// const apiUrl = "https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2016-05-19&sentences=false";

// request(apiUrl function(error, response, body){
// 	console.log(json.parse(body));
// })










/*************SERVER***************/

//listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});