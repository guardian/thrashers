(function() {

	var guToday;

	function elementInViewport(el) {
	  var top = el.offsetTop;
	  var left = el.offsetLeft;
	  var width = el.offsetWidth;
	  var height = el.offsetHeight;

	  while(el.offsetParent) {
	    el = el.offsetParent;
	    top += el.offsetTop;
	    left += el.offsetLeft;
	  }

	  return (
	    top >= window.pageYOffset &&
	    left >= window.pageXOffset &&
	    (top + height) <= (window.pageYOffset + window.innerHeight) &&
	    (left + width) <= (window.pageXOffset + window.innerWidth)
	  );
	}

	function animate(guToday){
		document.addEventListener('scroll', function(){
			if(elementInViewport(guToday)) {
				console.log('in view');
				guToday.classList.add('animated');
			}else {
				console.log('out view');
				guToday.classList.remove('animated');
			}
		});
	}

	function updateCountdownTime() {

	    // utc time now
	    var now = new Date;
	    var utcTime = Date.UTC(now.getUTCFullYear(),now.getUTCMonth(), now.getUTCDate() ,
	      (now.getUTCHours()), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());

	    // polls closing time, timezone independent
	    var pollsClose = new Date(Date.UTC(2018,4,1,0,0));


	    if (utcTime > pollsClose.getTime()) {
	        document.querySelector('.update-time').innerHTML = "0";
	    } else {
	        // get total seconds between the times
	        var delta = Math.abs(pollsClose - utcTime) / 1000;

	        // calculate (and subtract) whole days
	        var days = Math.floor(delta / 86400);
	        delta -= days * 86400;

			document.querySelector('.update-time').innerHTML = days + " ";
	    }
	}


	function thrasherMain() {
		guToday = document.querySelector('.ZCK-GT--wrapper');

		animate(guToday);
		updateCountdownTime()
	}


	function checkExists(startThrasherFunction) {
		var checkInterval = setInterval(function() {
			if (document.querySelector('.ZCK-GT--wrapper')) {
				startThrasherFunction();
				clearInterval(checkInterval);
			}
		}, 100);
	}

	checkExists(thrasherMain);

})();
