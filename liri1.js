require("dotenv").config();
const keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var nodeArgs = process.argv;

var spotifyThisSong = function () {

    var songName = "";

    if (songName === undefined){
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
    case "spotify-this-song":
        spotifyThisSong();
        break;
}
