var count = 0,
interval,
goal,
total;

function init() {
    getData();
}

function getData() {
    loadJSON("https://interactive.guim.co.uk/docsdata-test/1kxq0b0E4BfoYmevQuAoG-V6Bk6CEJsuVqwKHdosh66A.json", function(data) {
        showCount = data.sheets.Sheet1[0].showCount === 'TRUE' ? true : false;
        total = parseInt(data.sheets.Sheet1[0].total);
        goal = parseInt(data.sheets.Sheet1[0].goal);

        if (showCount) {
            populateText();

            setTimeout(function() {
                animateCount();
                animateBar();
            }, 500);
        }
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
    document.getElementsByClassName('break-the-cycle__label--goal')[0].innerHTML = '$' + toK(goal) + ' goal';
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
    count += Math.floor(total / 100);
    document.getElementsByClassName('break-the-cycle__count')[0].innerHTML = "$" + count.toLocaleString();

    if (count >= total) {
        clearInterval(interval);
        document.getElementsByClassName('break-the-cycle__count')[0].innerHTML = "$" + total.toLocaleString();
    }
}

function animateBar() {
    document.getElementsByClassName('break-the-cycle__filled-progress')[0].style.transform = 'translateX(' + percentageTotalAsNegative() + '%)';
}

function percentageTotalAsNegative() {
    var percentage = total / goal * 100 - 100;

    if (percentage > 0) {
        percentage = 0;
    }

    return percentage;
}

init();
