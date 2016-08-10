function loadJSON(path, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success)
                    success(JSON.parse(xhr.responseText));
            } else {
                if (error) {
                    error(xhr);
                }
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}

loadJSON("http://interactive.guim.co.uk/docsdata-test/1pVaEqgTQNLxZL3TcvwkvvFCBNKjTmjwtgK_1NZjONrE.json", function(data) {

    var  source =  data.sheets.Sheet1[0].Trailer;
    var  mp3 = data.sheets.Sheet1[0].Mp3;
    var  itunes = data.sheets.Sheet1[0].Itunes;
    var  title = data.sheets.Sheet1[0].Title;
    var  subhead = data.sheets.Sheet1[0].Subhead;
    var  full_episode_link = data.sheets.Sheet1[0].Link;

    document.getElementsByClassName("audio")[0].setAttribute("src", source);
    document.getElementsByClassName("subscription__download--link")[0].setAttribute("href", mp3);
    document.getElementsByClassName("subscription__itunes--link")[0].setAttribute("href", itunes);
    document.getElementsByClassName("episode-info_full")[0].setAttribute("href", full_episode_link);
    var audio = document.getElementsByClassName("audio")[0];
    var playButton = document.getElementsByClassName("player__play")[0];
    var thrasher = document.getElementById("football-daily-euro-2016-podcast-thrasher");
    document.getElementsByClassName("episode-info__kicker")[0].innerHTML = '<h1>' + title + '</h1>';
    document.getElementsByClassName("episode-info__title")[0].innerHTML = '<h1>' + subhead + '</h1>';
    var audioLength = 0;
    audio.oncanplaythrough = function(){
        audioLength = audio.duration;

        var mind = audioLength % (60 * 60);
        var minutes = Math.floor(mind / 60);

        var secd = mind % 60;
        var seconds = Math.floor(secd);
        document.getElementsByClassName("episode-info__time")[0].innerHTML = '<h2>' + minutes + ':' + seconds + '</h2>';
    }
    playButton.onclick = function(){
        if(audio.paused){
            audio.play();
            thrasher.setAttribute("data-playing", "playing");
            setTimeout(function() {
              playButton.setAttribute('data-link-name', 'euro 2016 football daily podcast thrasher: pause');
            }, 1000);
        }else{
            audio.pause();
            thrasher.removeAttribute("data-playing");
            setTimeout(function() {
              playButton.setAttribute('data-link-name', 'euro 2016 football daily podcast thrasher: play');
            }, 1000);
        }
    };
    audio.ontimeupdate = function(){
        var timer = audio.currentTime / audioLength * 750;
        document.getElementById("progress").setAttribute("stroke-dasharray", Math.floor(timer) + "," + "1000");
    }
});

setTimeout(function() {
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = 'section#the-citadel.fc-container.fc-container--thrasher.fc-container--has-toggle { background-color: #333;   overflow: visible !important; } section#the-citadel.fc-container.fc-container--thrasher.fc-container--has-toggle div.fc-container__inner, section#the-citadel.fc-container.fc-container--thrasher.fc-container--has-toggle div.facia-snap.facia-snap--default.fc-item.fc-item--audio.fc-item--has-image.fc-item--has-metadata.fc-item--is-commentable.fc-item--is-media-link.js-fc-item.js-snap.tone-media--item.fc-item--fluid-mobile.fc-item--fluid-tablet.js-snappable.facia-snap-embed.facia-snap-point--huge, div.facia-snap.facia-snap--default.fc-item.fc-item--audio.fc-item--has-image.fc-item--has-metadata.fc-item--is-commentable.fc-item--is-media-link.js-fc-item.js-snap.tone-media--item.fc-item--fluid-mobile.fc-item--fluid-tablet.js-snappable.facia-snap-embed.facia-snap-point--huge .fc-slice-wrapper {   overflow: visible !important; }';
  document.body.appendChild(css);
}, 2000);

