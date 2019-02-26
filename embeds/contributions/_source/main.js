(function() {

	// alert('running');
	// var targetClass = document.getElementsByClassName('contribution-moment');
	// console.log('test');
	// targetClass.classList.remove('is-animated');

	var target = '.contribution-moment';

	function checkExists(startThrasherFunction) {
		var checkInterval = setInterval(function() {
				if (document.querySelector(target)) {
					startThrasherFunction();
					clearInterval(checkInterval);
				}
		}, 100);
	}


	function toggleCopyState(copy, hideOrShow, name) {
			if(hideOrShow === 'hide') {
				for(var i = 0; i < copy.length; i++) {
					copy[i].classList.add('hide');
					console.log('hiding', name);
				}
			}
			if (hideOrShow === 'show') {
				for(var i = 0; i < copy.length; i++) {
				copy[i].classList.remove('hide');
				console.log('showing', name);
			}
		}
	}

	// If a contributor, show appropriate thrahser content
	function toggleThrasherElements() {
		try {
			isCont = document.cookie.split(';')
				.map(function(a) { return a.trim() })
				.map(function(a) { return a.split('=', 2) })
				.filter(function(a) { return ['gu_paying_member', 'gu_digital_subscriber', 'gu_recurring_contributor', 'gu.contributions.contrib-timestamp'].includes(a[0]) })
				.filter(function(a) { return a[1] != 'false' })
				.length != 0
		} catch(err) {
			isCont = true;
		}

		if (localStorage && localStorage.getItem('gu.geolocation')) {
			isUK = ["GB"].includes(JSON.parse(localStorage.getItem('gu.geolocation') ).value);
			isUS = ["US"].includes(JSON.parse(localStorage.getItem('gu.geolocation') ).value);
		} else {
			isUK = true;
		}

		// Checks if in UK
		// isUK = ["GB"].includes(JSON.parse(localStorage.getItem('gu.geolocation') ).value);
		// console.log("isUK: " + isUK)
		// console.log("isCont: " + isCont)
		
		// Checks if in US
		isUS = ["US"].includes(JSON.parse(localStorage.getItem('gu.geolocation') ).value);
		console.log("isUS: " + isUS)

		// all Supporter copy
		var thanks = document.getElementsByClassName('thanks');
		// all non supporter coppy
		var sell = document.getElementsByClassName('sell');
		// Rest Of World copy
		var row = document.getElementsByClassName('row');
		// Us Button
		var sellUs = document.getElementsByClassName('sellUs');
		

		toggleCopyState(row, 'show', 'row');
		toggleCopyState(thanks, 'show', 'thanks');


		// If oustside UK ...
		if (isUK === false && isUS === false) {
			console.log('Is outside the UK');
			toggleCopyState(sell, 'hide', 'sell');
			if (isCont === true) {
				toggleCopyState(row, 'hide', 'row');
			} else {
				toggleCopyState(row, 'show', 'row');
				toggleCopyState(thanks, 'hide', 'thanks');
			}
		// Is inside UK ...
		}else if(isUS === true) {
			console.log('Is in the US');
			toggleCopyState(sell, 'hide', 'sell');
			if (isCont === true) {
				toggleCopyState(row, 'hide', 'row');
			} else {
				toggleCopyState(sellUs, 'show', 'sellUs'); //show button
				toggleCopyState(thanks, 'hide', 'thanks');
			}
		}else{
			console.log('Is in the UK');
			toggleCopyState(row, 'hide', 'row');
			if (isCont === true) {
				toggleCopyState(sell, 'hide', 'sell');
			} else {
				toggleCopyState(thanks, 'hide', 'thanks');
			}
		} 
	}

	function playThrasher() {

		// console.log('fired');
		var target = '.contribution-moment';
		var thrasher = document.querySelector(target);
		var thrasherY = thrasher.getBoundingClientRect().y;
		var peekSize = 250;
		var windowHeight = window.innerHeight;

		if(thrasherY != undefined){
			// play thtrasher if in view on load
			if ((thrasherY - windowHeight + peekSize) < 0) {
				thrasher.classList.add('is-animated');
			}

			// play thtrasher aftre scroll eventt if not initially in view
			window.addEventListener('scroll', function() {
				var thrasherY = thrasher.getBoundingClientRect().y;
				var peekSize = 250;
				var windowHeight = window.innerHeight;

				if ((thrasherY - windowHeight + peekSize) < 0) {
					thrasher.classList.add('is-animated');
				}
			});
		} else {
			thrasher.classList.add('is-animated');
		}
		}

	checkExists(playThrasher);
	toggleThrasherElements();

})();
