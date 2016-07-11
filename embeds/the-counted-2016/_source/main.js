
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

function isScrolledIntoView(element) {
    var elementTop    = element.getBoundingClientRect().top,
        elementBottom = element.getBoundingClientRect().bottom;

    return elementTop < window.innerHeight && elementBottom >= 0;
}

var animatable = true;

var animate = function() {
    if (animatable) {
        if (isScrolledIntoView(document.getElementById("the-counted"))) {
            loadJSON("https://interactive.guim.co.uk/2015/the-counted/thrasher-2016.json", function(data) {
                countLength = data.count.toString().length;

                if (countLength == 4) {
                    document.getElementsByClassName("the-counted__count")[0].className += " the-counted__count--fourfig";
                } else {
                    document.getElementsByClassName("the-counted__count")[0].className += " the-counted__count--threefig";
                }

                document.getElementsByClassName("the-counted__number--one")[0].className += " number--" + String(data.count).charAt(countLength - 1);
                document.getElementsByClassName("the-counted__number--ten")[0].className += " number--" + String(data.count).charAt(countLength - 2);
                document.getElementsByClassName("the-counted__number--hundred")[0].className += " number--" + String(data.count).charAt(countLength - 3);
                document.getElementsByClassName("the-counted__number--thousand")[0].className += " number--" + String(data.count).charAt(countLength - 4);
                document.getElementsByClassName("the-counted-2016__wrapper")[0].className += " animate";
                animatable = false;
            }, function(xhr) {
                console.log("error");
            });
        }
    }
}

animate();

window.onscroll = function() {
    animate();
};
