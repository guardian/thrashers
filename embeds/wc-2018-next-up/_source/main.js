(function() {


	// change INTERFACE to reflect a team selection (or 'all teams')
	function updateTeamFiltering(teamName=false) {
		var thrasher = document.querySelector('.wc-2018-next-up__wrapper');

		if (teamName=='All teams') {
			teamName = false;
		}
		
		// update checkmark in select
		var teamSelectOptions = document.querySelectorAll('.wc-next-up__title__team-select__option');
		teamSelectOptions.forEach(function(teamSelectOption) {
			var searchTerm = (teamName ? teamName : 'All teams');
			if (teamSelectOption.innerText == searchTerm) {
				teamSelectOption.classList.add('selected');
			} else {
				teamSelectOption.classList.remove('selected');
			}
		});
		
		loadContent(teamName);
	}

	// change CONTENT to reflect a team selection (or 'all teams')
	function loadContent(teamName) {
		
		// note, the old json address was:
		// https://interactive.guim.co.uk/thrashers/wc-2018-next-up
		// /hashed/wc-schedule-linked-1536110618.23bd7aae.json
		loadJSON("https://interactive.guim.co.uk/docsdata-test/1YWKqp9_wKyy7WDO64x27qsxM3wwWMymMcIj2kyDHakM.json",
			function(data) {
				var schedule = data.sheets['world-cup-schedule'];
				
				var today = new Date();
				// var today = new Date(Date.UTC(2018,5,24,16));

				// still display matches while they're going on
				today = today - (1000*60*60*2);

				// first filter out past matches
				var selectedMatches = schedule.filter(function(matchInfo) {
					var matchEpoch = Date.UTC(2018,parseInt(matchInfo.month),parseInt(matchInfo.day),parseInt(matchInfo.hour),0,0);
					var matchDate = new Date(matchEpoch);
					return (today < matchDate);
				});
				
				// filter out matches not involving teamName
				// if one is selected (i.e not 'all teams')				
				if (teamName!=false) {
					selectedMatches = selectedMatches.filter(function(matchInfo) {
						return (matchInfo.home==teamName || matchInfo.away==teamName);
					}); 
				}

				// finally, trim to the first 4 only;
				var selectedMatches = selectedMatches.slice(0,4)

				if (selectedMatches.length==0) {
					// no matches with current settings
					
					if (teamName==false) {
						// this basically means the world cup must have ended
						console.warn('Hiding next up thrasher: no future matches to display');
						hideSelf();
						repositionWithWorldCupSection();
					} else {
						// this means the selected team is no longer running
						console.warn('No upcoming matches for', teamName, 'so resetting to all teams');
						updateTeamFiltering(false);
					}
				} else {
					// we have fixtures to show;
					
					// clear current content
					var matchesEl = document.querySelector('.wc-next-up__matches');
					matchesEl.innerHTML = '';
					
					// inject all selectedMatches
					selectedMatches.forEach(function(matchInfo) {
						injectMatch(matchInfo);
					});

					// resize thrasher
					repositionWithWorldCupSection();
				}
				
				
			}, function() {
				console.warn('Next up thrasher failed to load schedule — hiding');
				hideSelf();
			});
	}
	
	function injectMatch(m) {
		// get timezone independent match time
		var matchDate = new Date(Date.UTC(2018,parseInt(m.month),parseInt(m.day),parseInt(m.hour),0,0));
		
		// setup blank match element
		var el = document.createElement('div');
		el.classList.add('wc-next-up__match');
		el.innerHTML = "<a  data-link-name='wc next up : match page' class='wc-next-up__match__link link'></a><div class='wc-next-up__match__timing'></div><div class='wc-next-up__match__teams'><em></em> v <em></em></div>";
		
		// fill in the team names
		var teams = el.querySelectorAll('em');
		teams[0].innerText = m.home;
		teams[1].innerText = m.away;

		// fill in link target
		var link = el.querySelector('.wc-next-up__match__link');
		var linkTarget = "https://www.theguardian.com/football/match-redirect/"+m.link
		link.href = linkTarget;
		link.innerText = m.home + " v " + m.away + " match report"
		
		// fill in match time
		var timing = el.querySelector('.wc-next-up__match__timing');
		timing.dataset.time = matchDate.getHours()+':00';
		
		
		// fill in match date
		// and whether the match is live
		var today = new Date();
		var tomorrow = new Date(today.getYear(), today.getMonth(), today.getDate()+1);
		
		var months = ['', '', '', '', '', 'June', 'July'];
		var weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
		
		if (today.getDate() == matchDate.getDate()
		&& today.getHours() >= matchDate.getHours()) {
			timing.innerText = 'live now '
			timing.classList.add('now');
			timing.parentElement.classList.add('live');
			
		} else if (today.getDate() == matchDate.getDate()) {
			timing.innerText = 'today';
			
		} else if (tomorrow.getDate() == matchDate.getDate()) {
			timing.innerText = 'tomorrow';
			
		} else {
			
			timing.innerText = [
				weekdays[matchDate.getDay()],
				matchDate.getDate(),
				months[matchDate.getMonth()]
			].join(' ');
			
		}
		
		// the element data is all in
		// so actually add it to the DOM
		document.querySelector('.wc-next-up__matches').appendChild(el);
	}
	
	// this hides the thrasher
	// in case there were no matches left in the world cup
	// or the JSON data load failed!
	function hideSelf() {
		var thrasherSection = document.querySelector('.wc-2018-next-up__wrapper').closest('section');
		thrasherSection.style.display = 'none';
	}
	
	// this sets a negative margin-top to the thrasher,
	// and padding-bottom in the world cup section
	// so the world cup section background image
	// is present in the thrasher too
	function repositionWithWorldCupSection() {
		var thrasherSection = document.querySelector('.wc-2018-next-up__wrapper').closest('section');
		var prevSection = thrasherSection.previousElementSibling;
		if (prevSection.id.indexOf('world-cup')>=0) {
			var thrasherHeight = thrasherSection.clientHeight;
			var thrasherStyle = '-'+(thrasherHeight+6)+'px';
			var prevStyle = (thrasherHeight+12)+'px';
			
			thrasherSection.style.marginTop = thrasherStyle;
			prevSection.style.paddingBottom = prevStyle;
		}
	}
	window.addEventListener('resize', repositionWithWorldCupSection);

	// this function runs on load
	// and moves the thrasher before an ad section
	// if there is one immediately before it
	function windUp() {
		var thrasherSection = document.querySelector('.wc-2018-next-up__wrapper').closest('section');
		var prevSection = thrasherSection.previousElementSibling;

		if (prevSection.classList.contains('fc-container__mpu--mobile')
		||  prevSection.classList.contains('fc-container--commercial')) {
			var front = thrasherSection.parentElement;
			front.insertBefore(thrasherSection, prevSection);
		}
		
		repositionWithWorldCupSection();
	}
	
	
	// Utility functions below
	
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
	
	function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
	}
	function getCookie(name) {
	    var nameEQ = name + "=";
	    var ca = document.cookie.split(';');
	    for(var i=0;i < ca.length;i++) {
	        var c = ca[i];
	        while (c.charAt(0)==' ') c = c.substring(1,c.length);
	        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	    }
	    return null;
	}

	function trackLoad() {
		window.guardian.ophan.record({
			component: 'thrasher : world cup next up : load',
			value: 1
		});
	}

	function checkExists(startThrasherFunction) {
		var checkInterval = setInterval(function() {
			if (document.querySelector('.wc-2018-next-up__wrapper')) {
				startThrasherFunction();
				clearInterval(checkInterval);
			}
		}, 100);
	}

	checkExists(windUp);
	checkExists(loadContent);
	checkExists(trackLoad);

})();
