(function() {

	function setupUnreadCount() {
		
		var marker = document.querySelector('.missing-something__marker');
		var markerNum = marker.querySelector('.number');
		
		updateUnreadCount(marker, markerNum);
		window.addEventListener('scroll', function() {
			updateUnreadCount(marker, markerNum);
		});

	}
	
	function updateUnreadCount(marker, markerNum) {
		var markerY = marker.getBoundingClientRect().y;
		var windowHeight = window.innerHeight;
		var onScreenRatio = (markerY/windowHeight);
		var animationMultiplier = Math.max(0,Math.min(1,((onScreenRatio*2)-0.75)));
		
		var maxEmails = 12;
		var emails = parseInt(maxEmails*animationMultiplier);
		
		if (emails > 0) {
			marker.classList.add('on');
			markerNum.setAttribute('data-num', emails);
		} else {
			marker.classList.remove('on');
		}
	}

	function trackLoad() {
		window.guardian.ophan.record({
			component: 'missing something thrasher : load',
			value: 1
		});
	}

	function checkExists(startThrasherFunction) {
		var checkInterval = setInterval(function() {
			if (document.querySelector('.missing-something__marker')) {
				startThrasherFunction();
				clearInterval(checkInterval);
			}
		}, 100);
	}

	checkExists(setupUnreadCount);
	checkExists(trackLoad);

})();
