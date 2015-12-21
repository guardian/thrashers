
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

function addCommas(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

function increaseCounter() {
    count += number / 100;
    console.log(addCommas(Math.floor(number / 100)));
    document.getElementsByClassName('charity-appeal__count')[0].innerHTML = "£" + addCommas(Math.floor(count));
    if (count >= number) {
        clearInterval(interval);
        document.getElementsByClassName('charity-appeal__count')[0].innerHTML = "£" + addCommas(Math.floor(number));
    }
}

var animatable = true,
    count = 0,
    interval;

var number = 575246;

var animate = function() {
    if (animatable) {
        if (isScrolledIntoView(document.getElementById("charity-appeal-2015"))) {
            loadJSON("http://interactive.guim.co.uk/docsdata-test/1ZTa2UdF2Z4_GwoBvGb4q3iQnn0sCm6cZapGCt4ac6ds.json", function(data) {
                number = data.sheets.Sheet1[0].total;
                if (interval === undefined) {
                    interval = setInterval(function() { increaseCounter() } , number / 70000);
                }

                document.getElementsByClassName("charity-appeal__wrapper")[0].className += " animate";
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
