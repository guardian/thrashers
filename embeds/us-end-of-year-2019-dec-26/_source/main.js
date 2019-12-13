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
    var progressBarElement = document.querySelector('.us-end-of-year-2019-dec-26__progress-complete');

    if (progressBarElement && progressBarElement instanceof HTMLElement) {
        progressBarElement.style.transform = 'translateX(' + percentageTotalAsNegative() + '%)';
    }
};

function increaseCounter() {
    count += Math.floor(total / 100);
    var counterElement = document.querySelector('.us-end-of-year-2019-dec-26__count');

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
        console.log('yoyoyo');
        total = parseInt(data.total, 10);
        goal = parseInt(data.goal, 10);

        window.setTimeout(function () {
            window.requestAnimationFrame(increaseCounter);
            animateBar();
        }, 500);
    });
};

fetchDataAndAnimate();
