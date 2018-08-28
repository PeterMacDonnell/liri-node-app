

//npms and other linked files
var fs = require('fs');
var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var request = require('request');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);




//user command line inputs
var commandInput = process.argv[2];
var item = process.argv[3];



//the function for omdb api functionality
var movieFunction = function () {
  var queryUrl = "http://www.omdbapi.com/?t=" + item + "&y=&plot=short&apikey=trilogy";

  request(queryUrl, function (error, response, body) {
    if(!error && response.statusCode === 200){
    console.log(JSON.parse(body).Title, JSON.parse(body).Year, JSON.parse(body).Ratings[0], JSON.parse(body).Ratings[1], JSON.parse(body).Country, JSON.parse(body).Language, JSON.parse(body).Plot, JSON.parse(body).Actors);
  
    }
  });

};

//the function for Spotify NPM functionality
var spotifyFunction = function(){
  spotify.search({ type: 'track', query: item }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    var response = data.tracks.items;
    response.forEach(song => {
      console.log(song.name)
      console.log(song.artists[0].name) 
      console.log(song.album.name)
      console.log(song.href)
  
    })
  
  });


};

//function for bandsintown api functionality
var concertFunction = function(){
  var queryUrl = "https://rest.bandsintown.com/artists/" + item + "/events?app_id=codingbootcamp";
  // console.log(queryUrl);

  request(queryUrl, function (error, response, body){
    if (!error && response.statusCode === 200) {
      var bandArray = JSON.parse(body);
      // console.log(bandArray);
      bandArray.forEach(function(event){
          console.log(event.venue.name)
          console.log(event.venue.city)
          console.log(event.datetime)
          // This will only send "this is loaded" to console I don't know why :'(
          // console.log(event.venue.name, event.venue.city, event.venue.datetime)
      });
    };
  });
  };

  //function for reading from text file
  var randomText = function(){
    fs.readFile('random.txt', 'utf8', function(err, data){
        data = data.split(',');
        console.log(data)
    })
};


//selects for apporpiate function execution depending on user's command input
if(commandInput === "movie-this"){
    movieFunction();
}

else if(commandInput === "concert-this"){
  concertFunction();
}

else if(commandInput === "spotify-this-song"){
  spotifyFunction();
}

else if(commandInput === "do-what-it-says"){
  randomText();
};




//Spotify API info
// Client ID 82feda22363241bb8acda145c2346bc5
// Client Secret a300163c2ad54424a8577af447886949
