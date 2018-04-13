// (function() {
// 
// 	function thrasherMain() {
// 		var h = Math.floor((document.body.offsetHeight-1000)/2000)*2000
// 		document.querySelector('.treatment__left').style.height = h + 'px';
// 		document.querySelector('.treatment__right').style.height = h + 'px';
// 	}
// 
// 
// 	function checkExists(startThrasherFunction) {
// 		var checkInterval = setInterval(function() {
// 			if (document.querySelector('.cambridge-analytica-files-header__wrapper')) {
// 				startThrasherFunction();
// 				clearInterval(checkInterval);
// 			}
// 		}, 100);
// 	}
// 
// 	checkExists(thrasherMain);
// 
// })();
