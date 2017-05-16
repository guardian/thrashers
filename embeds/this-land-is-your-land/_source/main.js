
function loadJSON(path, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
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
    document.getElementsByClassName('this-land-is-your-land__count')[0].innerHTML = "$" + addCommas(Math.floor(count));
    if (count >= number) {
        clearInterval(interval);
        document.getElementsByClassName('this-land-is-your-land__count')[0].innerHTML = "$" + addCommas(Math.floor(number));
    }
}

var animatable = true,
    count = 0,
    target = 40000,
    interval,
    number;

var animate = function() {
    if (animatable) {
        if (isScrolledIntoView(document.getElementById("this-land-is-your-land"))) {
            loadJSON("https://interactive.guim.co.uk/docsdata-test/1no5r1O5A0omDkz4HALce4SrFWDGzSuR_jdB2MYOsPt4.json", function(data) {
                number = data.sheets.Sheet1[0].total;

                setTimeout(function() {
                    if (interval === undefined) {
                        interval = setInterval(function() { increaseCounter() } , 30);
                    }

                    var percentage = number / target * 100 - 100;

                    if (percentage > 0) {
                        percentage = 0;
                    }

                    document.getElementsByClassName('this-land-is-your-land__filled-progress')[0].style.transform = 'translateX(' + percentage + '%)';
                    document.getElementsByClassName("this-land-is-your-land__wrapper")[0].className += " animate";
                    animatable = false;
                }, 500);
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
