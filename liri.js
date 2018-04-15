require("dotenv").config();

const keys = require('./keys');

fs = require('fs');

var Twitter = require('twitter');
var client = new Twitter(keys.twitter);

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var nodeArgs = process.argv;


//function myTweets() {

//screen_name: 'Lindsbow102',
//count: 20
// };
//client.get('statuses/user_timeline', params, function (error, tweets, response) {
//if (!error) {
//for (var i = 0; i < tweets.length; i++) {
// var date = tweets[i].created_at;
// console.log("@Lindsbow102: " + tweets[i].text + " Created At: " + date.substring(0, 19));
// console.log("-----------------------");
//  }
//  } else {
//      console.log('Error occurred');
//  }
//   });
//}

var movieThis = function (movieName) {
    // Load request npm module
    var request = require("request");
    // Create an empty variable for holding the movie name
    var movieName = "";
    // Loop through all the words in the node argument
    // And do a little for-loop magic to handle the inclusion of "+"s
    for (var i = 3; i < nodeArgs.length; i++) {
        if (i > 3 && i < nodeArgs.length) {
            movieName = movieName + "+" + nodeArgs[i];
        } else {
            movieName += nodeArgs[i];
        }
    }
    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);
    if (movieName === undefined) {
        movieName = "mr nobody";
    }
    request(queryUrl, function (error, response, body) {
        // If the request is successful
        if (!error && response.statusCode === 200) {
            // Display movie info in terminal
            console.log("* Title of the movie: " + JSON.parse(body).Title);
            console.log("* Year the movie came out: " + JSON.parse(body).Year);
            console.log("* IMDB Rating of the movie: " + JSON.parse(body).imdbRating);
            console.log("* Country produced: " + JSON.parse(body).Country);
            console.log("* Language of the movie: " + JSON.parse(body).Language);
            console.log("* Plot of the movie: " + JSON.parse(body).Plot);
            console.log("* Actors in the movie: " + JSON.parse(body).Actors);
        }
    });
}

var spotifyThisSong = function () {

    var songName = "";

    if (songName === undefined) {
        songName = "the sign ace of base";
    }

    for (var i = 3; i < nodeArgs.length; i++) {
        if (i > 3 && i < nodeArgs.length) {
            songName = songName + "+" + nodeArgs[i];
        } else {
            songName += nodeArgs[i];
        }
    }
    spotify.search({ type: 'track', query: songName }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        for (var i = 0; i < data.tracks.items[0].artists.length; i++) {
            if (i === 0) {
                console.log("Artist(s): " + data.tracks.items[0].artists[i].name);
            } else {
                console.log("  " + data.tracks.items[0].artists[i].name);
            }
        }
        console.log("Song: " + data.tracks.items[0].name);
        console.log("Preview Link: " + data.tracks.items[0].preview_url);
        console.log("Album: " + data.tracks.items[0].album.name);
        //console.log(JSON.stringify(data, null, 2)); 
    })
}

switch (nodeArgs[2]) {
    //case "my-tweets":
    // myTweets();
    // break;

    case "movie-this":
        movieThis();
        break;

    case "spotify-this-song":
        spotifyThisSong();
        break;

    default:
     console.log("{Please enter a command: my-tweets, spotify-this-song, movie-this, do-what-it-says}");
     break;

}
//}


