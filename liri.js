//require("dotenv").config();

//var spotify = new spotify(keys.spotify);
//var client = new Twitter(keys.twitter);

var keys = require('./keys.js');
var twitter = require('twitter');
var Spotify = require('node-spotify-api');
//console.log(keys);
var spotify = new Spotify(keys.spotify);
var request = require('request');
var fs = require('fs');

var getMyTweets = function() {
 
    var client = new twitter(keys.twitterKeys);
 
    var params = {screen_name: 'stilgolfndude'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            //console.log(tweets);
            for(var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].created_at);
                console.log(' ');
                console.log(tweets[i].text);
            }
        }
    });
}
 
//var spotify = new Spotify({
  //id: <your spotify client id>,
  //secret: <your spotify client secret>
//});

var getArtistNames = function(artist) {
    return artist.name;
}

var getMeSpotify = function(songName) {
 
    spotify.search({ type: 'track', query: songName }, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;  
        }
        //console.log(data.tracks.items[0]);
        console.log(data); 
        var songs = data.tracks.items;
        for(var i = 0; i < songs.length; i++) {
            console.log(i);
            console.log('artist(s): ' + songs[i].artists.map(getArtistNames));
            console.log('song name: ' + songs[i].name);
            console.log('preview song: ' + songs[i].preview_url);
            console.log('album: ' + songs[i].album.name);
            console.log('------------------------------------------------');
        }
    });
}

var getMeMovie = function(movieName) {
    
    //request('http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&r=json', function (error, response, body) {
        request('http://www.omdbapi.com/?t=' + movieName + '&apikey=a753d9fa', function (error, response, body) {
        //console.log('error:', error); // Print the error if one occurred
        //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        //console.log(response.statusCode);
        //console.log(error);
        if(!error && response.statusCode == 200) {
            
            var jsonData = JSON.parse(body);

            console.log('Title: ' + jsonData.Title);
            console.log('Year: ' + jsonData.Year);
            //console.log('Rated: ' + jsonData.Rated);
            console.log('IMDB Rating: ' + jsonData.imbdRating);
            console.log('Rotten tomatoes rating: ' + jsonData.tomatoRating);
            console.log('Country: ' + jsonData.Country);
            console.log('Language: ' + jsonData.Language);
            console.log('Plot: ' + jsonData.Plot);
            console.log('Actors: ' + jsonData.Actors);
            //console.log('Rotten tomatoes URL: ' + jsonData.tomatoURL);
        }   
        //console.log('body:', body); // Print the HTML for the Google homepage.
    });
}

var doWhatItSays = function() {
    fs.readFile('random.txt', 'utf8', function(err, data) {
        if (err) throw err;
        
        var dataArr = data.split(',');

        if (dataArr.length == 2) {
            pick(dataArr[0], dataArr[1]);
        } else if (dataArr.length == 1) {
            pick(dataArr[0]);
        }
    });
}

var pick = function(caseData, functionData) {
    switch(caseData) {
        case 'my-tweets' :
            getMyTweets();
            break;
        case 'spotify-this-song':
            getMeSpotify(functionData);
            break;
        case 'movie-this':
            getMeMovie(functionData);
            break;
        case 'do-what-it-says':
            doWhatItSays();
            break;
        default:
        console.log('LIRI does not know that')
    }
}

var runThis = function(argOne, argTwo) {
    pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);