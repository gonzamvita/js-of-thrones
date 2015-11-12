var fs = require('fs');

function fileActions(err, file) {
    if (err) {
        throw err;
    }

    var episodes = JSON.parse(file);

    episodes = episodes.sort(function(a,b){
        return a.episode_number - b.episode_number;
    });

    getWorstEpisodes(episodes, printEpisodes);
    searchFor(episodes);
}

function getWorstEpisodes(episodes, callback) {
    episodes = episodes.filter(function(episode){
        return episode.rating < 8.5;
    });

    callback(episodes);
}


function printEpisodes(episodes) {
    episodes.forEach(function(episode){
        console.log("Title: %s \r\n %s \r\n Rating: %s", episode.title,
            episode.description, getStarRating(episode.rating));
    });
}

function getStarRating(rating){
    var stars = "";
    for (var i = 0; i < Math.round(rating); i++) {
        stars += "*";
    };

    return stars;
}

function searchFor(episodes) {
    episodes.forEach(function(episode){
        if(episode.description.indexOf("Jon Snow") > -1){
            console.log("Jon Snow appears in the episode number %s - %s",
                episode.episode_number, episode.title);
        }
    });
}

fs.readFile("gotepisodes.json", "utf8", fileActions);


