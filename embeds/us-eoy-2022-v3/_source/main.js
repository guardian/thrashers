var count = 0;
var goal;
var total;
var barTotal;
var completedGoal = false;

function percentageTotalAsNegative() {
	var percentage = (barTotal / goal) * 100 - 100;
	if (percentage > 0) {
		percentage = 0;
	}
	return percentage;
}

function animateBar() {
	var progressBarElement = document.querySelector('.us-eoy-container-v3 .us-end-of-year__progress-complete');

	if (progressBarElement && progressBarElement instanceof HTMLElement) {
		progressBarElement.style.transform = 'translateX(' + percentageTotalAsNegative() + '%)';
	}
}

function increaseCounter() {
	count += Math.floor(total / 100);
	var counterElement = document.querySelector('.us-eoy-container-v3 .us-end-of-year__count span');

	if (counterElement && counterElement instanceof HTMLElement) {
		counterElement.innerHTML = '$' + count.toLocaleString();
		if (count >= total) {
			counterElement.innerHTML = '$' + total.toLocaleString();
		} else {
			window.requestAnimationFrame(increaseCounter);
		}
	}
}

function fetchDataAndAnimate() {
	fetch('https://support.theguardian.com/ticker/US_2022.json')
		.then(function(resp) {
			return resp.json();
		})
		.then(function(data) {
			total = parseInt(data.total, 10);
			if (total > 1000000) {
				document.querySelector('.us-end-of-year__maintext').innerHTML = 'We’re proud to say that the Guardian is a reader-funded global news organisation, with more than 1.5 million supporters in 180 countries. Support from readers keeps us fiercely independent and allows us to keep our reporting open for all. <strong>Thank you to everyone who has helped us reach our goal. It’s not too late to make a gift to support Guardian journalism in 2023.</strong>';
			}
			barTotal = total;
			goal = parseInt(1000000, 10);
			if (total >= 1000000) {
				if (total > 1100000) {
					barTotal = 1200000;
				}
				goal = 1270000;
				document.querySelector('.us-eoy-container-v3 #us-end-of-year__our_goal').innerHTML = "<span class='us-end-of-year__red'>But it's not too late to give!</span>";
				document.querySelector('.us-eoy-container-v3 .us-end-of-year__total').classList.add('us-end-of-year__goal_reached');
				completedGoal = true;
			}

			window.setTimeout(function() {
				window.requestAnimationFrame(increaseCounter);
				animateBar();
			}, 500);
		});
}

fetchDataAndAnimate();
