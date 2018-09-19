(function() {
    function variantAssignator() {
        // var backgrounds = ["var-a", "var-b"];
        // var elements = document.getElementsByClassName("wrapper-september");
        // var len = backgrounds.length;
        // for (i = 0; i < elements.length; i++) {
        //     elements[i].className += ' ' + backgrounds[i%len];
        // }

        var el = document.querySelector(".wrapper-september");
        var variant;
        if (Math.random() > 0.5) {
            variant = 'a';
        } else {
            variant = 'b';
        }

        el.classList.add('var-'+variant);
        window.guardian.ophan.record({
			component: ('thrasher : september campaign : variant '+variant),
			value: 1
		});

    }


    function checkExists(startThrasherFunction) {
        var checkInterval = setInterval(function() {
            if (document.querySelector('.SeptemberCampaign__wrapper')) {
                startThrasherFunction();
                clearInterval(checkInterval);
            }
        }, 100);
    }

	function playThrasher() {

		var thrasher = document.querySelector('.SeptemberCampaign__wrapper');

		window.addEventListener('scroll', function() {
			var thrasherY = thrasher.getBoundingClientRect().y;
            var peekSize = 50;

			var windowHeight = window.innerHeight;

            if ((thrasherY - windowHeight + peekSize) < 0) {
                thrasher.classList.add('playing');
            }
		});
	}

    checkExists(variantAssignator);
    checkExists(playThrasher);

})();
