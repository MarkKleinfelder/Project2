////////////////////////////
//                        //
//   **FRONT END JS.**    //
//                        //
////////////////////////////


// ************ GLOBAL VARIABLES *********** //
var angerLevel;
var disgustLevel;
var fearLevel;
var joyLevel;
var sadnessLevel;


// ************** BUTTON FUNCTIONS ************ //

$('#saveResults').on('click', function (event){ // Saves results to user db
    console.log("saveResults button clicked")

    var resultsUrl="http://localhost:3000/api/results"
    $.ajax({
      method: "POST",
      url: resultsUrl,
      data: {
        anger: angerLevel,
        disgust: disgustLevel,
        fear: fearLevel,
        joy: joyLevel,
        sadness: sadnessLevel
      },
      success: function(){
        console.log('successful ajax');
      }
})

})

$('#showHistory').on('click', function(event){ //gets results from db for display
  $.get('http://localhost:3000/api/results')
})



/////////////////////////////
//                         //
//   **API APP BELOW**     //
//      (front-end js)     //
//                         //
/////////////////////////////


var angerLevel;
var disgustLevel;
var fearLevel;
var joyLevel;
var sadnessLevel;


var submitText = function(){
	console.log("Text to submit: " + $("#textToSubmit").val())
	$.ajax ({
		url:"https://watson-api-explorer.mybluemix.net/tone-analyzer/api/v3/tone?text="+$("#textToSubmit").val()+"&tones=emotion&sentences=false&version=2016-05-19",
		type: 'Get',
		success: function(data){
		console.log(data.document_tone.tone_categories[0].tones);
		var tones=data.document_tone.tone_categories[0].tones;
		angerLevel= tones[0].score * 100;
		disgustLevel=tones[1].score *100;
		fearLevel = tones[2].score *100;
		joyLevel = tones[3].score *100;
		sadnessLevel = tones[4].score *10;
		graphResults();
	  }
  })
}

function graphResults() {
    var chart = new CanvasJS.Chart("chartContainer",
    	
    {
      backgroundColor: "transparent",
      title:{
        text: "Emotions"    
      },
    
      animationEnabled: true,
      axisY: {
        title: ""
      },
      legend: {
      	
      	fontFamily: "Gruppo", //******font for legend(bottom)******//
        verticalAlign: "bottom",
        horizontalAlign: "center"
      },

      

      theme: "theme2",
      data: [

      {        
        type: "column",  
        showInLegend: true, 
        // legendMarkerColor: "grey",
        // legendText: "MMbbl = one million barrels",
        dataPoints: [      
        {y: angerLevel, label: "Anger", color:"#e23852"},
        {y: disgustLevel,  label: "Disgust", color:"#529b56"},
        {y: fearLevel,  label: "Fear", color: "#f9e070"},
        {y: joyLevel,  label: "Joy", color: "#ff9bf8"},
        {y: sadnessLevel,  label: "Sadness", color: "#5d7ae2"}               
        ]
      }   
      ]
    });
     chart.render();
     // saveResults();
     // discardResults();
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




//app.listen(3000);
