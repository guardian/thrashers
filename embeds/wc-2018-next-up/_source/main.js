(function() {

	function loadTeamSelect() {
		var selectedTeamEl = document.querySelector('.wc-next-up__title__selected-team');
		selectedTeamEl.addEventListener('click', function(e) {
			e.stopPropagation();
			this.classList.toggle('open');
		});
		document.body.addEventListener('click', function() {
			selectedTeamEl.classList.remove('open');
		});
		
		var teamOptions = document.querySelectorAll('.wc-next-up__title__team-select__option');
		teamOptions.forEach(function(teamOption) {
			teamOption.addEventListener('click', function() {
				var teamName = teamOption.innerText;
				updateTeamFiltering(teamName);
				setCookie('wc-2018-next-up', teamName);
			});
		});
		
	}

	function updateTeamFiltering(teamName=false) {
		var thrasher = document.querySelector('.wc-2018-next-up__wrapper');

		if (teamName=='All teams') {
			teamName = false;
		}
		
		// update team name in title
		var selectedTeamEl = thrasher.querySelector('.wc-next-up__title__selected-team');
		if (teamName) {
			selectedTeamEl.innerText = teamName;
			selectedTeamEl.classList.add('team');
		} else {
			selectedTeamEl.innerText = 'all teams';
			selectedTeamEl.classList.remove('team');
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

	function loadContent(teamName) {
		if (typeof(teamName)==='undefined') {
			var cookieTeam = getCookie('wc-2018-next-up');

			if (cookieTeam && cookieTeam != 'All teams') {
				teamName = cookieTeam;
				updateTeamFiltering(teamName);
				return false;
			} else {
				teamName = false;
			}
		}

		var jsonAddress = "https://interactive.guim.co.uk/thrashers/wc-2018-next-up/hashed/wc-schedule-linked-1536110618.23bd7aae.json";
		// var jsonAddress = '@@assetPath@@/wc-schedule-linked-1536110618.23bd7aae.json';
		loadJSON(jsonAddress,
			function(schedule) {
				var today = new Date();
				// var today = new Date(Date.UTC(2018,5,24,16));

				// still display matches up to three hours after they finish
				today = today - (1000*60*60*3);

				// first filter to future matches
				var selectedMatches = schedule.filter(function(matchInfo) {
					var matchEpoch = Date.UTC(2018,matchInfo.month,matchInfo.day,matchInfo.hour,0,0);
					var matchDate = new Date(matchEpoch);
					return (today < matchDate);
				});
				
				
				// if a team is assigned, filter by team
				if (teamName!=false) {
					selectedMatches = selectedMatches.filter(function(matchInfo) {
						return (matchInfo.home==teamName || matchInfo.away==teamName);
					}); 
				}

				// now trim to the first 4 only;
				var selectedMatches = selectedMatches.slice(0,4)
				
				// if there are no matches to display, hide this
				if (selectedMatches.length==0) {
					console.warn('Hiding next up thrasher: no matches to display')
					hideSelf();
				} else {
					clearMatches();
					selectedMatches.forEach(function(matchInfo) {
						injectMatch(matchInfo);
					});
				}
				
				
			}, function() {
				console.warn('Next up thrasher failed to load schedule — hiding');
				hideSelf();
			});
	}
	
	function clearMatches() {
		var matchesEl = document.querySelector('.wc-next-up__matches');
		matchesEl.innerHTML = '';
	}
	
	function injectMatch(m) {
		// get timezone independent match time
		var matchEpoch = Date.UTC(2018,m.month,m.day,m.hour,0,0);
		var matchDate = new Date(matchEpoch);
		
		// create match div
		var el = document.createElement('div');
		el.classList.add('wc-next-up__match');
		el.innerHTML = "<a  data-link-name='wc next up : match page' class='wc-next-up__match__link link'></a><div class='wc-next-up__match__timing'></div><div class='wc-next-up__match__teams'><em></em> v <em></em></div>";
		
		// fill in the teams
		var teams = el.querySelectorAll('em');
		var timing = el.querySelector('.wc-next-up__match__timing');
		var link = el.querySelector('.wc-next-up__match__link');

		teams[0].innerText = m.home;
		teams[1].innerText = m.away;

		// inject the link to the match screen
		var matchLink = "https://www.theguardian.com/football/match-redirect/"+m.link
		link.href = matchLink;
		link.innerText = m.home + " v " + m.away + " match report"
		

		// add the localised time
		timing.dataset.time = matchDate.getHours()+':00';
		
		
		// Add classes to state wether it's live,
		// later today, tomorrow, or later in the week
		var today = new Date();
		var tomorrow = new Date(today.getYear(), today.getMonth(), today.getDate()+1);
		// var today = new Date(Date.UTC(2018,5,24,15));
		// var tomorrow = new Date(Date.UTC(2018,5,25));		
		
		var months = ['', '', '', '', '', 'June', 'July'];
		if (today.getDate() == matchDate.getDate()
		&& today.getHours() >= matchDate.getHours()
		&& today.getHours() <= matchDate.getHours()+2) {
			timing.innerText = ' live now '
			timing.classList.add('now');
			timing.parentElement.classList.add('live');
		} else if (today.getDate() == matchDate.getDate()) {
			timing.innerText = ' today'
		} else if (tomorrow.getDate() == m.day) {
			timing.innerText = ' tomorrow'
		} else {
			timing.innerText = ' '+matchDate.getDate()+' '+months[matchDate.getMonth()]
		}
		
		// actually inject this in the DOM
		document.querySelector('.wc-next-up__matches').appendChild(el);
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
	
	function hideSelf() {
		var thrasherSection = document.querySelector('.wc-2018-next-up__wrapper').closest('section');
		thrasherSection.style.display = 'none';
	}
	
	function trackLoad() {
		window.guardian.ophan.record({
			component: 'thrasher : world cup next up : load',
			value: 1
		});
	}

	function windUp() {
		var thrasherSection = document.querySelector('.wc-2018-next-up__wrapper').closest('section');
		var prevSection = thrasherSection.previousElementSibling;

		if (prevSection.classList.contains('fc-container__mpu--mobile')
		||  prevSection.classList.contains('fc-container--commercial')) {
			var front = thrasherSection.parentElement;
			front.insertBefore(thrasherSection, prevSection);
		}
		
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
	checkExists(loadTeamSelect);
	checkExists(trackLoad);

})();
