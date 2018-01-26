(function() {

	function animateCircles() {

		var thrasher = document.querySelector('.the-start-thrasher');

		window.addEventListener('scroll', function() {
			var thrasherY = thrasher.getBoundingClientRect().y;
			var windowHeight = window.innerHeight;
			var onScreenRatio = 1-(thrasherY/windowHeight);
			var animationMultiplier = Math.max(0,Math.min(1,((onScreenRatio*5/3)-0.5)));

		});
	}

	function updateTheStartData() {
		loadJSON("https://interactive.guim.co.uk/docsdata-test/1gTLvPPkW6pAbqcEtWSMCjLfEJP1XXdkKHJ2LS_VA3Uo.json", function(data) {

			var thrasher = document.querySelector('.the-start-thrasher');

			var dataGuestName = data.sheets["Latest Episode info"][0].GuestName;
			var dataGuestPhoto = data.sheets["Latest Episode info"][0].GuestPhoto;
			var dataLatestEpisode = data.sheets["Latest Episode info"][0].LatestEpisode;

			var elementGuestName = thrasher.querySelector('.the-start-thrasher__guest-name span');
			var elementGuestPhoto = thrasher.querySelector('.the-start-thrasher__guest-image img');
			var elementLatestEpisode = thrasher.querySelector('.the-start-thrasher__cta');

			elementGuestName.innerHTML = dataGuestName;
			elementGuestPhoto.setAttribute('src', dataGuestPhoto);
			elementLatestEpisode.setAttribute('href', dataLatestEpisode);

			thrasher.classList.add('data-loaded');

		});
	}

	function loadJSON(path, success, error) {
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (xhr.readyState === XMLHttpRequest.DONE) {
				if (xhr.status === 200) {
					if (success)
						success(JSON.parse(xhr.responseText));
				} else {
					if (error) {
						error(xhr);
					}
				}
			}
		};
		xhr.open("GET", path, true);
		xhr.send();
	}

	function checkExists(startThrasherFunction) {
		var checkInterval = setInterval(function() {
			if (document.querySelector('.the-start-thrasher')) {
				startThrasherFunction();
				clearInterval(checkInterval);
			}
		}, 100);
	}

	checkExists(animateCircles);
	checkExists(updateTheStartData);

})();
