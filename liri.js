


var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var request = require('request');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);





var commandInput = process.argv[2];
var item = process.argv[3];




var movieFunction = function () {
  var queryUrl = "http://www.omdbapi.com/?t=" + item + "&y=&plot=short&apikey=trilogy";

  request(queryUrl, function (error, response, body) {
    if(!error && response.statusCode === 200){
    console.log(JSON.parse(body).Year, JSON.parse(body).Ratings[1]);
    // console.log();
    }
  });

};

var spotifyFunction = function(){
  spotify.search({ type: 'track', query: item }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  console.log(data); 
  });


};

var concertFunction = function(){
  var queryUrl = "https://rest.bandsintown.com/artists/" + item + "/events?app_id=codingbootcamp";

  request(queryUrl, function (body){
    console.log(JSON.stringify(body, null, 2));
  });



};


if(commandInput === "movie-this"){
    movieFunction();
}

else if(commandInput === "conert-this"){
  concertFunction();
}

else if(commandInput === "spotify-this-song"){
  spotifyFunction();
};




//Spotify API info
// Client ID 82feda22363241bb8acda145c2346bc5
// Client Secret a300163c2ad54424a8577af447886949
// var spotify = new Spotify(keys.spotify);