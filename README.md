# liri
liri can be used to display tweets, spotify a song, get movie info from OMDB, or run a command in a text file.

### BEFORE USING THIS APP:
1. Create a file called .env and replace the values with your API keys(no quotes)
```
Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret

Twitter API keys

TWITTER_CONSUMER_KEY=your-twitter-consumer-key
TWITTER_CONSUMER_SECRET=your-twitter-consumer-secret
TWITTER_ACCESS_TOKEN_KEY=your-access-token-key
TWITTER_ACCESS_TOKEN_SECRET=your-twitter-access-token-secret
```
2. Install packages in the command line by: ```npm i```
3. Choose one of the following actions to execute through the command line

### TO SHOW TWEETS:
In command line run ```node liri.js my-tweets```

### TO SPOTIFY A SONG:
In command line run ```node liri.js spotify-this-song song name```

This will show:
  - Artist(s)
  - The song's name
  - A preview link of the song from Spotify
  - The album that the song is from

### TO SHOW MOVIE INFO FROM OMDB:
In command line run ```node liri.js movie-this movie name```

This will show:
  * Title of the movie.
   * Year the movie came out.
   * IMDB Rating of the movie.
   * Rotten Tomatoes Rating of the movie.
   * Country where the movie was produced.
   * Language of the movie.
   * Plot of the movie.
   * Actors in the movie.

### TO RUN A COMMAND IN ```random.txt```
In command line run ```node liri.js do-what-it-says```

This will run whatever command is in the ```random.txt``` file.
