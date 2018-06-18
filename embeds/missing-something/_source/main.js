(function() {


	function setupUnreadCount() {
		var typewriter = document.querySelector('.missing-something__typewriter');
		
		updateUnreadCount(typewriter);
		window.addEventListener('scroll', function() {
			updateUnreadCount(typewriter);
		});

	}
	
	function updateUnreadCount(typewriter) {
		var typewriterY = typewriter.getBoundingClientRect().y;
		var windowHeight = window.innerHeight;
		var onScreenRatio = (typewriterY/windowHeight);
		var animationMultiplier = 1-Math.max(0,Math.min(1,((onScreenRatio*onScreenRatio)-0.2)));

		if (animationMultiplier < 1) {
			typewriter.classList.add('blink');
		} else {
			typewriter.classList.remove('blink');
		}
		
		var fullText = typewriter.getAttribute('data-text');
		var displayCharacters = animationMultiplier * fullText.length;
		var currentText = fullText.substring(0, displayCharacters);
		typewriter.innerText = currentText;
	}

	function trackLoad() {
		window.guardian.ophan.record({
			component: 'missing something thrasher v3 : load',
			value: 1
		});
	}

	function checkExists(startThrasherFunction) {
		var checkInterval = setInterval(function() {
			if (document.querySelector('.missing-something__typewriter')) {
				startThrasherFunction();
				clearInterval(checkInterval);
			}
		}, 100);
	}

	checkExists(setupUnreadCount);
	checkExists(trackLoad);

})();
