////////////////////////////
//                        //
//   **FRONT END JS.**    //
//                        //
////////////////////////////


// ************ GLOBAL VARIABLES *********** //


//-----graph-------//
var angerLevel;
var disgustLevel;
var fearLevel;
var joyLevel;
var sadnessLevel;
//----------------//

var allResults; //list of objects in 'results' collection


// ************** BUTTON FUNCTIONS ************ //


//_________________save results to results collection____________//
$('#saveResults').on('click', function (event){ // Saves results to user db
    console.log("saveResults button clicked")
    var currentTime = new Date().toLocaleString().split(', '); //time stamp
    var resultsUrl="http://localhost:3000/api/results"
    $.ajax({              //ajax POST to db
      method: "POST",
      url: resultsUrl,
      data: {
        anger: angerLevel,
        disgust: disgustLevel,
        fear: fearLevel,
        joy: joyLevel,
        sadness: sadnessLevel,
        postTime: currentTime     //adds current-time timestamp
      },
      success: function(){
        console.log('ajax POST success');
      }
    })
})


//_________get and show all objects in 'results' collection__________//
$('#showHistory').on('click', function(data){ //gets results from db for display
 $.get("http://localhost:3000/api/results")
    .done(function(data){  
    let allResults = data;
    console.log(allResults);
    console.log(allResults.length);
    renderResults(allResults);//triggers all results to render to page
    });
  });


function renderResults(allResults){ //renders results history in HTML
  $('#history').html('');
  $.get("http://localhost:3000/api/results")
    .done(function(data){  
    let allResults = data;
    allResults.forEach(function(result){
    historyHtml=
    "<a href='#' class='list-group-item oneResult' data-result-id='" + result._id + "'>" 
    + result.postTime[0] + " " + "<button type='button' id='commentButton' class='btn-primary'>Add Comment</button> <button type='button' id='deleteResultButton' class='btn-danger'>Remove Result</button> </a>" ;
  
    $('#history').append(historyHtml)
    })
  });
};


//______________________add comment to 'result' object___________//

$('#history').on('click', '#commentButton', function(event){ //renders comment modal on page
  console.log("comment button clicked");
  var byId= $(this).parents('.oneResult').data('result-id');
  console.log(byId);
  $('#commentModal').data(byId);
  $('#commentModal').modal();
  console.log("comment modal front-end");
  $.get("http://localhost:3000/api/results/"+byId+"") //get comment text from db
    .done(function(data){
      console.log(data);
      console.log(data.comment)
      $('#resultComment').val(data.comment);  //render previous comment in comment box
    });
  
  
    $('#saveComment').on('click', function(event){  //saves comment to db
    console.log('saveComment clicked');
    var commentBox = $('#resultComment').val();
    var clickedUrl = "http://localhost:3000/api/results/"+ byId + "";
    console.log(clickedUrl)
      $.ajax({
        method: "PUT",
        url: clickedUrl,
        data:{
          comment: commentBox
        }
      })
  console.log(commentBox);
    });
});

//_________________delete result object______________//

$('#history').on('click', '#deleteResultButton', function(event){
      console.log('deleteResultButton clicked')
      var byId= $(this).parents('.oneResult').data('result-id');
      console.log(byId);
      var clickedUrl = "http://localhost:3000/api/results/"+ byId + "";
        $.ajax({
          method: "DELETE",
          url: clickedUrl,
          success: function(results){
            console.log("ajax DELETE success!");
            renderResults(results)
          }
        })
});



/////////////////////////////
//                         //
//   **WATSON API BELOW**  //
//                         //
//                         //
/////////////////////////////


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
