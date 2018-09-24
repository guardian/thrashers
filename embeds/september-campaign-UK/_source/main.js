(function() {
    function variantAssignator() {
        var el = document.querySelector(".wrapper-september");
        var variant;
        if (Math.random() > 0.5) {
            variant = 'a';
        } else {
            variant = 'b';
        }

        el.classList.add('var-'+variant);
        window.guardian.ophan.record({
			component: ('thrasher : september campaign uk : variant '+variant),
			value: 1
		});

    }


    function checkExists(startThrasherFunction) {
        var checkInterval = setInterval(function() {
            if (document.querySelector('.september-campaign-UK__wrapper')) {
                startThrasherFunction();
                clearInterval(checkInterval);
            }
        }, 100);
    }

	function playThrasher() {

		var thrasher = document.querySelector('.september-campaign-UK__wrapper');

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
