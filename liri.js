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
var song = process.argv[3];

if (process.argv[2] === "spotify-this-song") {
    spotify.search({type: "track", query: song}, function(error, data) {
        if (error) {
            return console.log("error");
        }
        
        // Song name
        var title = data.tracks.items[0].name;
        console.log("TRACK TITLE: \n" + title + "\n-----------------");
        
        // Album
        var album = data.tracks.items[0].album.name;
        console.log("ALBUM: \n" + album + "\n-----------------");
       
        // Artists names
        var artists = data.tracks.items[0].artists;
        var artistsArray = [];
        for (var i = 0; i < artists.length; i++) {
            artistsArray.push("\n" + artists[i].name);
        }
        console.log("ARTISTS: " + artistsArray + "\n-----------------");
        
        // Prewiew link to song
        var preview = data.tracks.items[0].external_urls.spotify;
        console.log("SPOTIFY PREVIEW: \n" + preview + "\n-----------------");
    });
}

// Movie info - OMDB
if (process.argv[2] === "movie-this") {
    request('http://www.omdbapi.com/?apikey=trilogy&t='+process.argv[3], function(error, response, body) {
        console.log(JSON.stringify(body, null, 2));
    });
}

// Use text in random.txt
if (process.argv[2] === "do-what-it-says") {

}