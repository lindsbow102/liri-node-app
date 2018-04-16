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
const arg1 = process.argv[2];
const arg2 = process.argv[3];

var x = "";
for (var i = 3; i < process.argv.length; i++) {
    if (i > 3 && i < process.argv.length) {
        x = x + "+" + process.argv[i];
    } else {
        x = x + process.argv[i];
    }
}
switch (arg1) {
    case 'my-tweets':
        myTweets();
        break;
    case 'spotify-this-song':
        if (x) {
            spotifyThisSong(x);
        } else {
            spotifyThisSong('The Sign ace of base');
        }
        break;
    case 'movie-this':
        if (x) {
            movieThis(x);
        } else {
            movieThis('Mr. Nobody');
        }
        break;
    case 'do-what-it-says':
        doWhatItSays();
        break;
    case '':
        if (arg2 === 'undefined') {
            console.log(`You requested ${arg2}`);
        }
        else {
            console.log('Defaulting to The Sign');
        }
    default:
        console.log("We don't know what you're taking about.")
}

//Getting terminal to display last 20 tweets
function myTweets () {

    client.get('search/tweets', params, function (error, tweets, response) {
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

function movieThis(movieName) {
    // Load request npm module
    var request = require("request");
    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);

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

function spotifyThisSong (songName) {
    
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
    })
}

function doWhatItSays() {

    fs.readFile("random.txt", "utf8", function (err, data) {
        console.log(data);
        var dataArr = data.split(',');
        
           spotifyThisSong(dataArr[1]);
    })
}

