(function() {

	function trackLoad() {
		window.guardian.ophan.record({
			component: 'good morning australia thrasher v1 : load : aus',
			value: 1
		});
	}

	function checkExists(startThrasherFunction) {
		var checkInterval = setInterval(function() {
			if (document.querySelector('.good-morning-australia__cta')) {
				startThrasherFunction();
				clearInterval(checkInterval);
			}
		}, 100);
	}

	checkExists(trackLoad);

})();
