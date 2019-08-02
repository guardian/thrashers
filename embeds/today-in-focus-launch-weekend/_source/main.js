(function() {

	var target = '.tif';
	
	function checkExists(startThrasherFunction) {
		var checkInterval = setInterval(function() {
			if (document.querySelector(target)) {
				startThrasherFunction();
				clearInterval(checkInterval);
			}
		}, 100);
	}

	function playThrasher() {

		var podcastThrasher = document.getElementsByClassName('tif__lines')[0];

		function handler(entries, observer) {
			for (entry of entries) {

				if (entry.isIntersecting) {
					podcastThrasher.classList.add('tif__lines--active');
				} else {
					podcastThrasher.classList.remove('tif__lines--active');
				}
			}
		}

		let observer = new IntersectionObserver(handler);
		observer.observe(podcastThrasher);

	}

	checkExists(playThrasher);

})();
