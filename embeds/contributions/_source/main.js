(function() {

	var target = '.contribution-moment'

	function checkExists(startThrasherFunction) {
		var checkInterval = setInterval(function() {
				if (document.querySelector(target)) {
						startThrasherFunction();
						clearInterval(checkInterval);
				}
		}, 100);
	}
	
	// If a contributor, show appropriate thrahser content
	function toggleThrasherElements() {
		isCont = document.cookie.split(';').map(a => a.trim()).map(a => a.split('=', 2)).filter(a => ['gu_paying_member', 'gu_digital_subscriber', 'gu_recurring_contributor', 'gu.contributions.contrib-timestamp'].includes(a[0])).filter(a => a[1] != 'false').length != 0

		var thanks = document.getElementsByClassName('thanks');
    var sell = document.getElementsByClassName('sell');

		if (isCont === true) {
			for(var i = 0; i < sell.length; i++){
				sell[i].classList.add('hide');
			}
			console.log('Is a contributor');

		} else {
			for(var i = 0; i < thanks.length; i++){
				thanks[i].classList.add('hide');
			}
			console.log('Is not a contributor');
		}
	}

	function playThrasher() {

		var thrasher = document.querySelector(target);

		window.addEventListener('scroll', function() {
			var thrasherY = thrasher.getBoundingClientRect().y;
			var peekSize = 150;

			var windowHeight = window.innerHeight;

				if ((thrasherY - windowHeight + peekSize) < 0) {
						thrasher.classList.add('is-animated');
				}
		});
	}

	checkExists(playThrasher);
	toggleThrasherElements();
	// toggleClass();

})();
