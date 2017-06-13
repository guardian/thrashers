var count = 0,
target,
overfund,
interval,
pledged;

function init() {
    getData();
    console.log('init');
}

function getData() {
    loadJSON("https://interactive.guim.co.uk/docsdata-test/1no5r1O5A0omDkz4HALce4SrFWDGzSuR_jdB2MYOsPt4.json", function(data) {
        console.log(data);
        pledged = parseInt(data.sheets.Sheet1[0].total);
        target = parseInt(data.sheets.Sheet1[0].target);
        overfund = parseInt(data.sheets.Sheet1[0].overfund);

        populateText();
        positionTarget();

        setTimeout(function() {
            animateCount();
            animateBar();
        }, 500);
    });
}

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

function populateText() {
    document.getElementsByClassName('this-land-is-your-land__label--target')[0].innerHTML = toK(target) + ' goal';
    document.getElementsByClassName('this-land-is-your-land__label--last')[0].innerHTML = toK(overfund);
}

function positionTarget() {
    var percentage = target / overfund * 100;

    document.getElementsByClassName('this-land-is-your-land__label--target')[0].style.left = percentage + '%';
}

function toK(val) {
    return val / 1000 + 'K';
}

function animateCount() {
    if (interval === undefined) {
        interval = setInterval(increaseCounter, 30);
    }
}

function increaseCounter() {
    count += Math.floor(pledged / 100);
    document.getElementsByClassName('this-land-is-your-land__count')[0].innerHTML = "$" + count.toLocaleString();

    if (count >= pledged) {
        clearInterval(interval);
        document.getElementsByClassName('this-land-is-your-land__count')[0].innerHTML = "$" + pledged.toLocaleString();
    }
}

function animateBar() {
    document.getElementsByClassName('this-land-is-your-land__filled-progress')[0].style.transform = 'translateX(' + percentagePledgedAsNegative() + '%)';
}

function percentagePledgedAsNegative() {
    if (overfund) {
        var percentage = pledged / overfund * 100 - 100;
    } else {
        var percentage = pledged / target * 100 - 100;
    }

    if (percentage > 0) {
        percentage = 0;
    }

    return percentage;
}

init();
