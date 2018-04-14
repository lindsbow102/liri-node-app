require("dotenv").config();

const keys = require('./keys');

fs = require('fs');

var Twitter = require('twitter');
var client = new Twitter(keys.twitter);

var Spotify = require('node-spotify-api');
var spotify1 = new Spotify(keys.spotify);

var arg1 = process.argv[2];
var arg2 = process.argv[3];


function myTweets() {
    //Display last 20 Tweets
    var params = {
        screen_name: 'Lindsbow102',
        count: 20
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                var date = tweets[i].created_at;
                console.log("@Lindsbow102: " + tweets[i].text + " Created At: " + date.substring(0, 19));
                console.log("-----------------------");
            }
        } else {
            console.log('Error occurred');
        }
    });
}

var movieThis = function (movieQuery) {
    // Load request npm module
    var request = require("request");

    // if query that is passed in is undefined, Mr. Nobody becomes the default
    if (movieQuery === undefined) {
        movieQuery = "mr nobody";
    }

    // HTTP GET request
    request("http://www.omdbapi.com/?t=" + movieQuery + "&y=&plot=short&r=json", function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log("* Title of the movie:         " + JSON.parse(body).Title);
            console.log("* Year the movie came out:    " + JSON.parse(body).Year);
            console.log("* IMDB Rating of the movie:   " + JSON.parse(body).imdbRating);
            console.log("* Country produced:           " + JSON.parse(body).Country);
            console.log("* Language of the movie:      " + JSON.parse(body).Language);
            console.log("* Plot of the movie:          " + JSON.parse(body).Plot);
            console.log("* Actors in the movie:        " + JSON.parse(body).Actors);

            // For loop parses through Ratings object to see if there is a RT rating
            // 	--> and if there is, it will print it
            for (var i = 0; i < JSON.parse(body).Ratings.length; i++) {
                if (JSON.parse(body).Ratings[i].Source === "Rotten Tomatoes") {
                    console.log("* Rotten Tomatoes Rating:     " + JSON.parse(body).Ratings[i].Value);
                    if (JSON.parse(body).Ratings[i].Website !== undefined) {
                        console.log("* Rotten Tomatoes URL:        " + JSON.parse(body).Ratings[i].Website);
                    }
                }
            }
        }
    });
}

switch (arg1) {
    case "my-tweets":
        myTweets();
        break;

    case "movie-this":
        movieThis(arg2);
        break;

    default:
        console.log("{Please enter a command: my-tweets, spotify-this-song, //movie-this, do-what-it-says}");
        break;

}


