<<<<<<< HEAD
function getTarget(containers) {
    for (var i = 0; i < containers.length; i++) {
        if(document.getElementById(containers[i]) !== null) {
            return document.getElementById(containers[i]).getElementsByClassName('fc-container__inner')[0];
        }
    }
}

function init() {
    console.log('hey');
    var html = documents.getElementsByClassName('trump-russia__wrapper')[0].innerHTML;
    var target = getTarget(['our-series', 'headlines']);

    target.innerHTML += '<div class=\'trump-russia__treat\'>' + html + '</div>';
}

init();
=======
(function() {

	function animateCircles() {

		var circleDelta = 40;
		var thrasher = document.querySelector('.the-start-thrasher');
		var elTopA = thrasher.querySelector('#the-start-thrasher__circ__top_a');
		var elTopB = thrasher.querySelector('#the-start-thrasher__circ__top_b');
		var elBottom = thrasher.querySelector('#the-start-thrasher__circ__bottom');
		var elMiddle = thrasher.querySelector('#the-start-thrasher__circ__middle');


		window.addEventListener('scroll', function() {
			var thrasherY = thrasher.getBoundingClientRect().y;
			var windowHeight = window.innerHeight;
			var onScreenRatio = (thrasherY/windowHeight);
			var animationMultiplier = Math.max(0,Math.min(1,((onScreenRatio*5/3)-0.5)));

			var cirlceScale = 1 - Math.max(0,Math.min(1,((animationMultiplier+.66))));

			elMiddle.style = 'transform: scale('+cirlceScale+')';

			elBottom.style = 'transform: translate(-'+animationMultiplier*circleDelta+'px,'+animationMultiplier*circleDelta+'px)';

			elTopA.style = 'transform: translate('+animationMultiplier*circleDelta+'px, -'+animationMultiplier*circleDelta+'px)';
			elTopB.style = 'transform: translate('+animationMultiplier*circleDelta+'px, -'+animationMultiplier*circleDelta+'px)';
		});
	}

	function updateTheStartData() {
		loadJSON("https://interactive.guim.co.uk/docsdata-test/1gTLvPPkW6pAbqcEtWSMCjLfEJP1XXdkKHJ2LS_VA3Uo.json", function(data) {

			var thrasher = document.querySelector('.the-start-thrasher');

			var dataGuestName = data.sheets["Latest Episode info"][0].GuestName;
			var dataGuestPhoto = data.sheets["Latest Episode info"][0].GuestPhoto;
			var dataLatestEpisode = data.sheets["Latest Episode info"][0].LatestEpisode;
			var dataEpisodeNumber = data.sheets["Latest Episode info"][0].EpisodeNumber;

			var elementGuestName = thrasher.querySelector('.the-start-thrasher__guest-name span');
			var elementGuestPhoto = thrasher.querySelector('.the-start-thrasher__guest-image img');
			var elementLatestEpisode = thrasher.querySelector('.the-start-thrasher__cta');
			var elementEpisodeNumber = thrasher.querySelector('.the-start-thrasher__episode-number');

			elementGuestName.innerHTML = dataGuestName;
			elementEpisodeNumber.innerHTML = dataEpisodeNumber;
			elementGuestPhoto.setAttribute('src', dataGuestPhoto);
			elementLatestEpisode.setAttribute('href', dataLatestEpisode);

			thrasher.classList.add('data-loaded');

		});
		
		// set the circles to the right initial position
		animateCircles();
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

	function trackLoad() {
		window.guardian.ophan.record({
			component: 'thrasher : the start podcast : load',
			value: 1
		});
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
	checkExists(trackLoad);

})();
>>>>>>> a4dcea2db9ae6fe72beec1cb5ed4ec2362ffc64d
