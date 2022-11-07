var count = 0;
var goal;
var total;
var barTotal;
var completedGoal = false;

function percentageTotalAsNegative() {
    var percentage = barTotal / goal * 100 - 100;
    if (percentage > 0) {
        percentage = 0;
    }
    return percentage;
};

function animateBar() {
    var progressBarElement = document.querySelector('.us-eoy-container .us-end-of-year__progress-complete');

    if (progressBarElement && progressBarElement instanceof HTMLElement) {
        progressBarElement.style.transform = 'translateX(' + percentageTotalAsNegative() + '%)';
    }
};

function increaseCounter() {
    count += Math.floor(total / 100);
    var counterElement = document.querySelector('.us-eoy-container .us-end-of-year__count span');

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
        barTotal = total;
        goal = parseInt(data.goal, 10);
        if (total >= 1250000) {
            if (total > 1300000) {
                barTotal = 1300000;
            }
            goal = 1388889;
            document.getElementById('us-end-of-year__our_goal').innerHTML = "<span class='us-end-of-year__red'>But it's not too late to give!</span>";
            document.querySelector('.us-end-of-year__total').classList.add("us-end-of-year__goal_reached");
            completedGoal = true;
        }

        window.setTimeout(function () {
            window.requestAnimationFrame(increaseCounter);
            animateBar();
        }, 500);
    });
};

fetchDataAndAnimate();
