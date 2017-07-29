$(document).ready(function(){
	console.log("JS is running!");
});





var submitText = function(){
	console.log("Text to submit: " + $("#textToSubmit").val())
	$.ajax ({
		url:"https://watson-api-explorer.mybluemix.net/tone-analyzer/api/v3/tone?text="+$("#textToSubmit").val()+"&tones=emotion&sentences=false&version=2016-05-19",
		type: 'Get',
		success: function(data){
		console.log(data);
	}
  })
}

// var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
// var tone_analyzer = new ToneAnalyzerV3({
//   username: '{b9219ac2-92c6-4752-9c7d-5baf887b2199}',
//   password: '{iMlAST68Iyqk}',
//   version_date: '{2016-05-19}'
// });

//  var submitText =tone_analyzer.tone({ text: 'Greetings from Watson Developer Cloud!' },
//   function(err, tone) {
//     if (err)
//       console.log(err);
//     else
//       console.log(JSON.stringify(tone, null, 2));
// });
