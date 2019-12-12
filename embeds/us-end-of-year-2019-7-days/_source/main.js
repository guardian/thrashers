var newYearCount = 60
target,
interval;
var count = 0;
var goal;
var total;


function animateCountdown() {
    target = getCountdownTarget();

    if (interval === undefined) {
        interval = setInterval(increaseNewYearCounter, 1);
    }
};

function getCountdownTarget() {
    var oneDay = 24*60*60*1000;
    var currentDate = new Date();
    var targetDate = new Date('Jan 1, 2020');

    return Math.floor(Math.abs((targetDate.getTime() - currentDate.getTime())/(oneDay))) + 1;
};

function increaseNewYearCounter() {
    newYearCount -= 1;

    document.getElementsByClassName('new-year__countdown__number')[0].innerHTML = newYearCount;

    if (newYearCount <= target) {
        document.getElementsByClassName('new-year__countdown__number')[0].innerHTML = target;
    }
};

function percentageTotalAsNegative() {
    var percentage = total / goal * 100 - 100;
    if (percentage > 0) {
        percentage = 0;
    }
    return percentage;
};

function animateBar() {
    var progressBarElement = document.querySelector('.us-end-of-year-2019__progress-complete');

    if (progressBarElement && progressBarElement instanceof HTMLElement) {
        progressBarElement.style.transform = 'translateX(' + percentageTotalAsNegative() + '%)';
    }
};

function increaseCounter() {
    count += Math.floor(total / 100);
    var counterElement = document.querySelector('.us-end-of-year-2019__count');

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
    fetch('https://support.theguardian.com/ticker.json').then(function (resp) {
        return resp.json();
    }).then(function (data) {
        total = parseInt(data.total, 10);
        goal = parseInt(data.goal, 10);

        window.setTimeout(function () {
            window.requestAnimationFrame(increaseCounter);
            animateBar();
        }, 500);
    });
};

fetchDataAndAnimate();
animateCountdown();
