(function() {

	// function animateCircles() {

	// 	var thrasher = document.querySelector('.the-start-thrasher');
	// 	var video = thrasher.querySelector('#the-start-background-artwork-video');
	// 	var testVideo = thrasher.querySelector('#the-start-test-video');
	// 	testVideoPlay()

	// 	function testVideoPlay() {
	// 		testVideo.play();
	// 		testVideo.addEventListener("playing", function() {
	// 			thrasher.classList.add('can-autoplay');
	// 			testVideo.parentNode.removeChild(testVideo);
	// 			video.setAttribute('preload', 'auto');
	// 		}, false);
	// 	}

	// 	window.addEventListener('scroll', function() {
	// 		var thrasherY = thrasher.getBoundingClientRect().y;
	// 		var windowHeight = window.innerHeight;
	// 		var onScreenRatio = 1 - (thrasherY/windowHeight);
	// 		if (onScreenRatio>0 && onScreenRatio<=1) {
	// 			window.requestAnimationFrame(function() {
	// 				var videoTime = onScreenRatio*video.duration;
	// 				videoTime = Math.ceil(videoTime*100)/100;
	// 				video.currentTime = videoTime;
	// 				console.log(onScreenRatio, videoTime)
	// 			});
	// 		}
	// 	});
	// }

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

	// checkExists(animateCircles);
	checkExists(updateTheStartData);

})();
