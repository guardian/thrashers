(function() {


	function trackLoad() {
		window.guardian.ophan.record({
			component: 'missing something thrasher v4 : load : uk',
			value: 1
		});
	}

	function checkExists(startThrasherFunction) {
		var checkInterval = setInterval(function() {
			if (document.querySelector('.missing-something__cta')) {
				startThrasherFunction();
				clearInterval(checkInterval);
			}
		}, 100);
	}

	checkExists(trackLoad);

})();
