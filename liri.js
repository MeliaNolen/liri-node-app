// Packages to npm install:
// dotenv
// node-spotify-api
// request
// twitter
// fs
// =======================================================
// require things and set up variables
require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var Twitter = require("twitter");
var client = new Twitter(keys.twitter);

var request = require('request');

var fs = require('fs');
// =======================================================
// Set up functions:

// Show my tweets
function tweetFunc() {
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
// =======================================================
// Show song info - Spotify
function spotSong(song) {
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
};
// =======================================================
// Movie info - OMDB
function movieFunc(movie) {
    request('http://www.omdbapi.com/?apikey=trilogy&t='+ movie, function(error, response, body) {
        if (error) {
            return console.log('error');
        }
        // console.log(JSON.parse(body, null, 2));
        
        // title
        console.log("TITLE: " + JSON.parse(body).Title + "\n-----------------");
        // Year released
        console.log("YEAR RELEASED: " + JSON.parse(body).Year + "\n-----------------");
        // IMDB rating
        console.log("IMDB RATING: " + JSON.parse(body).imdbRating + "\n-----------------");
        //Rotten Tomatoes rating
        console.log("ROTTEN TOMATOES RATING: " + JSON.parse(body).Ratings[1].Value + "\n-----------------");
        // Country where produced
        console.log("PRODUCTION COUNTRY: " + JSON.parse(body).Production + "\n-----------------");
        // Language of movie
        console.log("LANGUAGES: " + JSON.parse(body).Language + "\n-----------------");
        // plot
        console.log("PLOT: " + JSON.parse(body).Plot + "\n-----------------");
        // actors
        console.log("ACTORS: " + JSON.parse(body).Actors + "\n-----------------");
    });
};
// =======================================================
// Use text in random.txt
function whatItSays() {
    fs.readFile('./random.txt', 'utf8', function(err, data) {
        if (err) {
            return console.log(err);
        }
        var fsText = data.split(",");
        console.log(fsText);
        if (fsText[0] === 'spotify-this-song'){   
            spotSong(fsText[1]);     
        }
        if (fsText[0] === 'my-tweets'){   
            tweetFunc();     
        }
    });
};
// =======================================================

// Switch case to decide what to do when
var action = process.argv[2];
switch(action) {
case 'my-tweets':    // I ONLY HAVE TWO TWEETS!
    tweetFunc();
    break;
case 'spotify-this-song':
    var song = process.argv.slice(3).join('+');
    if (song) {
        spotSong(song);
    }
    else {
        spotSong("The Sign");
    }
    break;
case 'movie-this':
    var movie = process.argv.slice(3).join('+');
    if (movie) {
        movieFunc(movie);
    } else {
    movieFunc("Mr.+Nobody");
    }
    break;
case 'do-what-it-says':
    whatItSays();
    break;
}