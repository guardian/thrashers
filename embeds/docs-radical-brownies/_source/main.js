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

loadJSON("https://interactive.guim.co.uk/docsdata-test/1tZ4zY1P3k5jOtVR7a-e0DY_C7ND2_0zNvLjiff7-Rgw.json", function(data) {
    var backgroundImage = data.sheets.Sheet1[0].backgroundImage;

    var featuredPoster = data.sheets.Sheet1[0].featuredPoster;
    var featuredCopy = data.sheets.Sheet1[0].featuredCopy;
    var featuredLink = data.sheets.Sheet1[0].featuredLink;

    var secondPoster = data.sheets.Sheet1[0].secondPoster;
    var secondTitle = data.sheets.Sheet1[0].secondTitle;
    var secondCopy = data.sheets.Sheet1[0].secondCopy;
    var secondLink = data.sheets.Sheet1[0].secondLink;

    var thirdPoster = data.sheets.Sheet1[0].thirdPoster;
    var thirdTitle = data.sheets.Sheet1[0].thirdTitle;
    var thirdCopy = data.sheets.Sheet1[0].thirdCopy;
    var thirdLink = data.sheets.Sheet1[0].thirdLink;

    document.getElementsByClassName("featured-doc-poster-source")[0].setAttribute("src", featuredPoster);
    document.getElementsByClassName("featured-doc-quote")[0].innerHTML = featuredCopy;
    document.getElementsByClassName("featured-doc--cta")[0].setAttribute("src", featuredLink);

    document.getElementsByClassName("second-doc-poster-source")[0].setAttribute("src", secondPoster);
    document.getElementsByClassName("second-title")[0].innerHTML = secondTitle;
    document.getElementsByClassName("second-doc-quote")[0].innerHTML = secondCopy;
    document.getElementsByClassName("second-doc--cta")[0].setAttribute("src", secondLink);

    document.getElementsByClassName("third-doc-poster-source")[0].setAttribute("src", thirdPoster);
    document.getElementsByClassName("third-title")[0].innerHTML = thirdTitle;
    document.getElementsByClassName("third-doc-quote")[0].innerHTML = thirdCopy;
    document.getElementsByClassName("third-doc--cta")[0].setAttribute("src", thirdLink);

    // var source = data.sheets.Sheet1[0].Trailer;
    // var mp3 = data.sheets.Sheet1[0].Mp3;
    // document.getElementsByClassName("audio")[0].setAttribute("src", source);
    // document.getElementsByClassName("subscription__download")[0].setAttribute("href", mp3);
    // var audio = document.getElementsByClassName("audio")[0];
    // var playButton = document.getElementsByClassName("player__play")[0];
    // var thrasher = document.getElementById("got-the-citadel-player-thrasher");
    // document.getElementsByClassName("episode-info__title")[0].innerHTML = '<h1>' + name + '</h1>';
    // document.getElementsByClassName("episode-info__heading")[0].setAttribute('href', episode);
});



var buttonDown = document.querySelector('.toggle-button');
var buttonUp = document.querySelector('.toggle-button-close');

buttonDown.addEventListener('click', function(event) {
    var expand = document.getElementById('expand');
    var buttonMore = document.getElementById('buttonMore');

    if (expand.style.display == "none") {
        // buttonMore.style.display = "none";
        expand.style.display = "block";

    } else {
        // buttonMore.style.display = "block";
        expand.style.display = "none";
    }
});