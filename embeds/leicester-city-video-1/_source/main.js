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
var lcfcSource = document.getElementsByClassName('lcfc_source');

loadJSON("https://interactive.guim.co.uk/docsdata-test/1g-nqRQPtxr70cnfyttZSrPJiSkiSgVNam9J53drsZ2g.json", function(data) {
  document.getElementsByClassName('leicester__video--headline')[0].innerHTML = data.sheets.Sheet1[1].Title;
  document.getElementsByClassName('leicester__video--subheadline')[0].innerHTML = data.sheets.Sheet1[1].Body;
  lcfcVideoSrc.innerHTML = data.sheets.Sheet1[1].Video;
  // lcfcSource[0].setAttribute('src', data.sheets.Sheet1[1].Video);
});

function isScrolledIntoView(element) {
      var elementTop = element.getBoundingClientRect().top,
        elementBottom = element.getBoundingClientRect().bottom;

    return elementTop < window.innerHeight && elementBottom >= 0;
}

var lcfcVideo = function(){
	if (isScrolledIntoView(document.getElementById("leicester__video--loader"))) {
        lcfcVideoSrc.play(0);
	} else {
		    lcfcVideoSrc.pause(0);
	     }
  }


window.onscroll = function() {
    lcfcVideo();
};
