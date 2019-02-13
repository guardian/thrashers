(function() {

	var target = '.contribution-moment';
	// var trigger = document.querySelector('.contribution-moment__heading');

	// trigger.addEventListener('click', toggleClass);

	// function toggleClass(){
	// 	console.log('clicked');
		
	// 	if (target.classList.contains('is-animated')) {
	// 		target.classList.remove('is-animated');
	// 	} else {
	// 		target.classList.add('is-animated');
	// 	}
	// }

	function checkExists(startThrasherFunction) {
		console.log('running');
			var checkInterval = setInterval(function() {
					if (document.querySelector(target)) {
							startThrasherFunction();
							clearInterval(checkInterval);
					}
			}, 100);
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
	toggleClass();

})();
