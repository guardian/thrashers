(function() {

	function thrasherMain() {
		console.log('3');
		pickGuestImage();
		checkThrasherOnScreen();

		window.addEventListener('scroll', function() {
			checkThrasherOnScreen();
		});
	}

	function pickGuestImage() {
		var guests = document.querySelectorAll('.image__guest .pick-me');
		var todaysGuest = (guests[Math.floor(Math.random()*guests.length)]);
		todaysGuest.classList.add('picked')

		var guestImgs = todaysGuest.querySelectorAll('img');
		for (var i = 0; i<guestImgs.length; i++) {
			guestImgs[i].setAttribute('src', guestImgs[i].dataset.src);
			guestImgs[i].setAttribute('srcset', guestImgs[i].dataset.srcset);
		}
	}

	function checkThrasherOnScreen() {
		var t = document.querySelector('.modern-masculinity__wrapper');
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
			if (document.querySelector('.modern-masculinity__wrapper')) {
				startThrasherFunction();
				clearInterval(checkInterval);
			}
		}, 100);
	}

	checkExists(thrasherMain);

})();
