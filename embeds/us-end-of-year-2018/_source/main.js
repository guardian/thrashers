var count = 0;
var goal;
var total;

function percentageTotalAsNegative() {
    var percentage = total / goal * 100 - 100;
    if (percentage > 0) {
        percentage = 0;
    }
    return percentage;
};

function animateBar() {
    var progressBarElement = document.querySelector('.us-end-of-year-2018__progress-complete');

    if (progressBarElement && progressBarElement instanceof HTMLElement) {
        progressBarElement.style.transform = 'translateX(' + percentageTotalAsNegative() + '%)';
    }
};

function increaseCounter() {
    count += Math.floor(total / 100);
    var counterElement = document.querySelector('.us-end-of-year-2018__count');

    if (counterElement && counterElement instanceof HTMLElement) {
        counterElement.innerHTML = '$' + count.toLocaleString();
        if (count >= total) {
            counterElement.innerHTML = '$' + total.toLocaleString();
        } else {
            window.requestAnimationFrame(increaseCounter);
        }
    }
};

function fetchDataAndAnimate() {
    fetch('https://interactive.guim.co.uk/docsdata-test/1ySn7Ol2NQLvvSw_eAnVrPuuRnaGOxUmaUs6svtu_irU.json').then(function (resp) {
        return resp.json();
    }).then(function (data) {
        var showCount = data.sheets.Sheet1[0].showCount === 'TRUE';
        total = parseInt(data.sheets.Sheet1[0].total, 10);
        goal = parseInt(data.sheets.Sheet1[0].goal, 10);

        if (showCount) {
            window.setTimeout(function () {
                window.requestAnimationFrame(increaseCounter);
                animateBar();
            }, 500);
        }
    });
};

fetchDataAndAnimate();
