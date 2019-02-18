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

		// Checks if in UK
		isUK = ["GB"].includes(JSON.parse(localStorage.getItem('gu.geolocation')).value);
		isAU = ["AU"].includes(JSON.parse(localStorage.getItem('gu.geolocation')).value);

		var thanks = document.getElementsByClassName('thanks');
    	var sell = document.getElementsByClassName('sell');
    	var row = document.getElementsByClassName('row');

		// Is a contributer	
		// if (isCont === true)  {
		// 	for(var i = 0; i < sell.length; i++){
		// 		sell[i].classList.add('hide');
		// 	}

		// 	for(var i = 0; i < row.length; i++){
		// 		row[i].classList.add('hide');
		// 	}
		// 	// console.log('Is a contributor');

		// // Is NOT a contributer	
		// } else {
		// 	for(var i = 0; i < thanks.length; i++){
		// 		thanks[i].classList.add('hide');
		// 	}
		// 	// console.log('Is not a contributor');
		// }

		// If oustside UK ...
		if (isUK === false) {
			// console.log('Is outside the UK');
			for(var i = 0; i < sell.length; i++) {
				sell[i].classList.add('hide');
			}
			for(var i = 0; i < thanks.length; i++) {
				thanks[i].classList.add('hide');
			}
			
		// Is inside UK ...	
		} if (isUK === true) {
			// console.log('Is in the UK');
			for(var i = 0; i < row.length; i++) {
				row[i].classList.add('hide');
			}

		// Is NOT a contributer	
		} if (isCont === false) {
			// console.log('Is not a contributer');
			for(var i = 0; i < thanks.length; i++){
				thanks[i].classList.add('hide');
			}

			for(var i = 0; i < sell.length; i++) {
				sell[i].classList.remove('hide');
			}
		
		// if a contributer and lives anywhere	
		} if ( ((isUK === true) || (isUK === false)) && (isCont === true)) {
			// console.log('match all three');
			
			for(var i = 0; i < sell.length; i++) {
				sell[i].classList.add('hide');
			}
			
			for(var i = 0; i < thanks.length; i++) {
				thanks[i].classList.remove('hide');
			}

			for(var i = 0; i < row.length; i++) {
				row[i].classList.add('hide');
			}
		}
	}
	// function playThrasher() {

	// 	var thrasher = document.querySelector(target);

	// 	window.addEventListener('scroll', function() {
	// 		var thrasherY = thrasher.getBoundingClientRect().y;
	// 		var peekSize = 150;

	// 		var windowHeight = window.innerHeight;

	// 			if ((thrasherY - windowHeight + peekSize) < 0) {
	// 					thrasher.classList.add('is-animated');
	// 			}
	// 	});
	// }
	
	function playThrasher() {

		console.log('fired');

		var target = '.contribution-moment';
		var thrasher = document.querySelector(target);
		var thrasherY = thrasher.getBoundingClientRect().y;
		var peekSize = 250;
		var windowHeight = window.innerHeight;

		if ((thrasherY - windowHeight + peekSize) < 0) {
			thrasher.classList.add('is-animated');
		}

		window.addEventListener('scroll', function() {
			var thrasherY = thrasher.getBoundingClientRect().y;
			var peekSize = 250;
			var windowHeight = window.innerHeight;

			if ((thrasherY - windowHeight + peekSize) < 0) {
				thrasher.classList.add('is-animated');
			}
		});
  	}

	// playThrasher();
	checkExists(playThrasher);
	toggleThrasherElements();
	// toggleClass();

})();
