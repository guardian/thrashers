(function() {

	function thrasherMain() {
		checkThrasherOnScreen();

		window.addEventListener('scroll', function() {
			checkThrasherOnScreen();
		});
	}

	function checkThrasherOnScreen() {
		var t = document.querySelector('.docs-share__wrapper');
		var r = onScreenRatio(t);

		if (r < 0.8 && r > 0.15) {
			t.classList.remove('off-view');
		} else {
			t.classList.add('off-view');
		}
	}

	function onScreenRatio(el) {
    var viewportHeight = window.innerHeight,
        scrollTop = window.scrollY,
				elementOffsetTop = el.getBoundingClientRect().top,
				elementHeight = el.offsetHeight,
				elementOffsetMiddle = (elementOffsetTop+(elementHeight/2));

    if (elementOffsetMiddle > (viewportHeight)) {
      return 1;
    } else if (elementOffsetMiddle < 0) {
      return 0;
    } else {
			var ratio = (elementOffsetMiddle/viewportHeight);
			return ratio;
    }
	}


	function checkExists(startThrasherFunction) {
		var checkInterval = setInterval(function() {
			if (document.querySelector('.docs-share__wrapper')) {
				startThrasherFunction();
				clearInterval(checkInterval);
			}
		}, 100);
	}

	checkExists(thrasherMain);

})();
