require("dotenv").config();

const keys = require('./keys');
var fs = require('fs');

var Twitter = require('twitter');
var client = new Twitter(keys.twitter);
var params = {
    screen_name: 'Lindsbow102',
    count: 20
};

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var nodeArgs = process.argv;

//Getting terminal to display last 20 tweets
var myTweets = function() {
	
	client.get('search/tweets', params, function(error, tweets, response) {
	  if (!error) {
        //testing to see if this even works
        console.log(JSON.stringify(response));
	  	// Loops through tweets and prints out tweet text and creation date.
	  	for (var i = 0; i < tweets.statuses.length; i++) {
	  		var tweetText = tweets.statuses[i].text;
	  		console.log("Tweet Text: " + tweetText);
	  		var tweetCreationDate = tweets.statuses[i].created_at;
	  		console.log("Tweet Creation Date: " + tweetCreationDate);
	  	}
	  } 
	})
}

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
    //create empty variable to hold song name
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
                console.log("* Artist(s): " + data.tracks.items[0].artists[i].name);
            } else {
                console.log("  " + data.tracks.items[0].artists[i].name);
            }
        }
        console.log("* Song: " + data.tracks.items[0].name);
        console.log("* Preview Link: " + data.tracks.items[0].preview_url);
        console.log("* Album: " + data.tracks.items[0].album.name);
        //console.log(JSON.stringify(data, null, 2)); 
    })
}

function doWhatItSays() {

	fs.readFile("random.txt", "utf8", function(err, data) {
		if (err) {
			logOutput.error(err);
		} else {

			// Creates array with data.
			var randomArray = data.split(",");

			// Sets action to first item in array.
			action = randomArray[0];

			// Sets optional third argument to second item in array.
			argument = randomArray[1];

			// Calls main controller to do something based on action and argument.
			spotifyThisSong(action, argument);
		}
	});
}

switch (nodeArgs[2]) {
    case "my-tweets":
        myTweets();
        break;

    case "movie-this":
        movieThis();
        break;

    case "spotify-this-song":
        spotifyThisSong();
        break;

    case "do-what-it-says":
        doWhatItSays();
        break;

    default:
     console.log("{Please enter a command: my-tweets, spotify-this-song, movie-this, do-what-it-says}");
     break;

}



