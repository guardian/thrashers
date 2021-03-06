(function () {

	function thrasherMain() {
		checkThrasherOnScreen();

		window.addEventListener('scroll', function () {
			checkThrasherOnScreen();
		});
	}

	function checkThrasherOnScreen() {
		var thrasher = document.querySelector('.docs-open-water__wrapper');
		var sea = thrasher.querySelector('.sea-group')
		var r = onScreenRatio(thrasher);
		// r = 1 when the the thrasher at the bottom or further
		// r = 0.5 when the thrasher is in the middle
		// r = 0 when the thrasher hits the top of the screen
		// this uses the vertical middle of the thrasher as a
		// reference point (i.e 140px down the top on a 280px thrasher)

		if (r > 0.65) {
			sea.dataset.step = '1';
		} else if (r > 0.45) {
			sea.dataset.step = '2';
		} else {
			sea.dataset.step = '3';
		}
	}

	function onScreenRatio(el) {
		var viewportHeight = window.innerHeight,
			scrollTop = window.scrollY,
			elementOffsetTop = el.getBoundingClientRect().top,
			elementHeight = el.offsetHeight,
			elementOffsetMiddle = (elementOffsetTop + (elementHeight / 2));

		if (elementOffsetMiddle > (viewportHeight)) {
			return 1;
		} else if (elementOffsetMiddle < 0) {
			return 0;
		} else {
			var ratio = (elementOffsetMiddle / viewportHeight);
			return ratio;
		}
	}


	function checkExists(startThrasherFunction) {
		var checkInterval = setInterval(function () {
			if (document.querySelector('.docs-open-water__wrapper')) {
				startThrasherFunction();
				clearInterval(checkInterval);
			}
		}, 100);
	}

	checkExists(thrasherMain);

})();
