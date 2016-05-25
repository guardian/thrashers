console.log('thithihsihso');
var video = document.getElementsByClassName('video__test')[0];
var headlineOne = document.getElementsByClassName('video__headline--one')[0];
var headlineTwo = document.getElementsByClassName('video__headline--two')[0];
var videoLength = 0;
var CurrentTime = 0;
var videoLength = video.duration;

video.addEventListener("timeupdate",function(){
  var CurrentTime = Math.floor(video.currentTime);
  if(CurrentTime >= 13){
    headlineOne.setAttribute("data-status", "off");
    headlineTwo.setAttribute("data-status", "on");
  }else{
    headlineOne.setAttribute("data-status", "on");
    headlineTwo.setAttribute("data-status", "off");
  }
});

console.log(window.innerHeight, video.getBoundingClientRect().top, video.getBoundingClientRect().bottom);

function isScrolledIntoView(element) {
    var elementTop    = element.getBoundingClientRect().top,
        elementBottom = element.getBoundingClientRect().bottom;
    return elementTop < window.innerHeight && elementBottom >= 0;
}

window.onscroll = function (e) {
		if(isScrolledIntoView(headlineOne) === true){
		video.play();
	}else{
    video.pause();
  }
  lcfcVideo();
}

function loadJSON(path, success, error)
{
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

var lcfcVideoSrc = document.getElementById("leicester__video--loader");

loadJSON("http://interactive.guim.co.uk/docsdata-test/1g-nqRQPtxr70cnfyttZSrPJiSkiSgVNam9J53drsZ2g.json", function(data) {
  console.log('this ihsihsihoihsaoha,djfhakh');
  document.getElementsByClassName('leicester__video--headline')[0].innerHTML = data.sheets.Sheet1[1].Title;
  document.getElementsByClassName('leicester__video--subheadline')[0].innerHTML = data.sheets.Sheet1[1].Body;
  lcfcVideoSrc.innerHTML = data.sheets.Sheet1[1].Video;
});

var lcfcVideo = function(){
	if (isScrolledIntoView(document.getElementById("leicester__video--loader"))) {
        lcfcVideoSrc.play(0);
	} else {
		    lcfcVideoSrc.pause(0);
	     }
  }
