var count = 60,
    target,
    interval;

function init() {
    animateCountdown();
}

function animateCountdown() {
    target = getCountdownTarget();

    if (interval === undefined) {
        interval = setInterval(increaseCounter, 30);
    }
}

function getCountdownTarget() {
    var oneDay = 24*60*60*1000;
    var currentDate = new Date();
    var targetDate = new Date('Jul 31, 2017');

    return Math.floor(Math.abs((targetDate.getTime() - currentDate.getTime())/(oneDay))) + 1;
}


function increaseCounter() {
    count -= 1;

    document.getElementsByClassName('this-land-is-your-land__countdown__number')[0].innerHTML = count;

    if (count <= target) {
        document.getElementsByClassName('this-land-is-your-land__countdown__number')[0].innerHTML = target;
    }
}

init();
