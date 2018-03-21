require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var Twitter = require("twitter");
var client = new Twitter(keys.twitter);

var request = require('request');

// commands I need:
// my-tweets
// spotify-this-song
// movie-this
// do-what-it-says

// Show my tweets
if (process.argv[2] === "my-tweets") {
    client.get('search/tweets', {q: 'MelMel_1994'}, function(error, tweets, response) {
        if (error) {
            return console.log("error");
        }
        // console.log(JSON.stringify(tweets, null, 2));

        for (var i = 0; i < tweets.statuses.length; i++) {
            console.log('"' + tweets.statuses[i].text + '"' + ' was created on ' +tweets.statuses[i].created_at);
        }
    });
}

// Show song info - Spotify
if (process.argv[2] === "spotify-this-song") {
    spotify.search({type: "track", query: ""}, function(error, data) {
        if (error) {
            return console.log("error");
        }
        console.log(data);
    });
}

// Movie info - OMDB
if (process.argv[2] === "movie-this") {

}

// Use text in random.txt
if (process.argv[2] === "do-what-it-says") {

}