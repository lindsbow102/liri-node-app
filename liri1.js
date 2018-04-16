require("dotenv").config();

const keys = require('./keys');
var fs = require('fs');

var Twitter = require('twitter');
var client = new Twitter(keys.twitter);
/*var params = {
    screen_name: 'Lindsbow102',
    count: 20
};*/

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var nodeArgs = process.argv;

var doWhatItSays = function () {

    fs.readFile("random.txt", "utf8", function (err, data) {
        console.log(data);
    })
}

switch (nodeArgs[2]) {
    case "do-what-it-says":
        doWhatItSays();
        break;
}
