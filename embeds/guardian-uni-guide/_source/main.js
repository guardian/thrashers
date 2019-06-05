(function() {

	function thrasherMain() {


	}


	function checkExists(startThrasherFunction) {
		var checkInterval = setInterval(function() {
			if (document.querySelector('.the-start-thrasher')) {
				startThrasherFunction();
				clearInterval(checkInterval);
			}
		}, 100);
	}

	checkExists(thrasherMain);

})();
