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

function currentDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;

    if(dd<10){
        dd='0'+dd
    }

    if(mm<10){
        mm='0'+mm
    }

    // return "16-09";
    return dd + '-' + mm;
}

function getTarget(containers) {
    for (var i = 0; i < containers.length; i++) {
        if(document.getElementById(containers[i]) !== null) {
            return document.getElementById(containers[i]).getElementsByClassName('fc-container__inner')[0];
        }
    }
}

loadJSON("https://interactive.guim.co.uk/docsdata/1fNisB3WhTASkm-htWJs36BPbDktwid3UbNbca2pMloM.json", function(data) {
    data = data.sheets.Sheet1;
    currentDate = currentDate();

    for (var i = 0; i < data.length; i++) {
        if (data[i].Date == currentDate) {
            var target = getTarget(['headlines', 'top-stories']);

            target.className += " fc-container__inner--no-treats";

            target.innerHTML += "<div class='countdown'><a class='countdown__link' href='https://www.theguardian.com/us-news/us-elections-2016'><div class='countdown__logo'><img class='countdown__image' src='https://interactive.guim.co.uk/thrashers/us_election_front/hashed/election_logo.f5e6b843.png'><span>election</span><span>2016</span></a></div><h2 class='countdown__number'>" + data[i].Day + "</h2><p class='countdown__text'><span class='countdown__lead-in'>day" + (data[i].Day !== 1 ? "s" : "") + " to go...</span>..." + data[i].Fact + "</p></div>";
        }
    }
}, function(xhr) {
    console.log("error fetching election countdown");
});