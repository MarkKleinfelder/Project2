Project 2

For this project I am using IBM's Watson API. While this api offers a wide range of technologies to utilize, I am focusing on the tone analyzer. In IBM's words,"The IBM Watson™ Tone Analyzer service uses linguistic analysis to detect emotional, social, and language tones in written text. The service can analyze tone at both the document and sentence levels." 

To use the tone analyzer, the user will login or register as a new user and be routed to analyzer page. The user will simply enter text into the provided text box and submit it to the Tone Analyzer api. The api responds with a series of numbers corresponding to various catagories of emotions, these results are automatically rendered in an easily readable graph. At this point the user can save their results to the database, create and edit comments, and re-render the graph with past results. 


IBM's Watson API offers a wide range of feedback based on the data provided to it. To start, I utilized a small peice of this technology that analyzes the entire body of text sent to the Tone Analyzer, responding only to the emotional tones. The API responds to the client with a series of objects, each containing information about the analyzed text. The returned data can then be extracted and displayed for consumption. 


Technologies Used:<br>
• Mongo Database<br>
• Mocha / Chai Testing<br>
• Express routing<br>
• Bootstrap CSS<br>


The app can be found here:<br>
<a href="https://quiet-shore-93946.herokuapp.com/" target="_blank">Tone Analyzer</a>

<img src="https://github.com/MarkKleinfelder/Project2/blob/master/Project%202%20Wireframe.jpg">




