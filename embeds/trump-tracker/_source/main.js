function loadJSON(path, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success)
                    success(JSON.parse(xhr.responseText));
            } else {
                if (error)
                    error(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}

function randomStat() {
    var options = [
        'obamaActions',
        'nightsAtWhiteHouse',
        'numberOfTweets',
        'metersOfWall'
    ];

    var randomNumber = Math.floor(Math.random() * options.length);

    return options[randomNumber];
}

function getTarget(containers) {
    for (var i = 0; i < containers.length; i++) {
        if(document.getElementById(containers[i]) !== null) {
            return document.getElementById(containers[i]);
        }
    }
}

var statLabels = {
    'obamaActions' : 'Obama actions unpicked',
    'nightsAtWhiteHouse' : 'Nights spent at White House',
    'numberOfTweets' : 'Number of Tweets',
    'metersOfWall' : 'Meters of the wall built'
}

loadJSON("https://interactive.guim.co.uk/docsdata/1TTV-g36nUE8uxVb882sC2lCeR8Yt8SGjIbJtN12yF0E.json", function(data) {
    // Sort data
    data = data.sheets.data;

    var stats = {}

    for (var i = 0; i < data.length; i++) {
        stats[data[i].option] = data[i].value
    }

    // move html to the headline container
    var html = document.getElementsByClassName('supertreat')[0].outerHTML;
    var target = getTarget(['trump-presidency', 'headlines']);
    target.getElementsByClassName('fc-container__inner')[0].innerHTML += html;
    target.className += ' fc-container--trumped';

    // add class
    var random = randomStat();
    document.getElementsByClassName('supertreat__stat')[0].innerHTML = statLabels[random];
    document.getElementsByClassName('supertreat__number')[0].innerHTML = stats[random];
    document.getElementsByClassName('supertreat')[0].className += ' supertreat--' + random;

}, function(xhr) {
    console.log("error fetching trump tracker data");
});

