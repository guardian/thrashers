setTimeout(function() {

    function findTargetContainer(container) {
        var prev = container.previousElementSibling;
        var classes = prev.classList;
        if (classes.contains('fc-container--thrasher') || classes.contains('fc-container--video') || classes.contains('fc-container__mpu--mobile') || prev.getAttribute('id')=='manchester-attack' || prev.offsetHeight < 260) {
            var target = findTargetContainer(prev);
        } else {
            var target = prev;
        }
        return target;
    }

    function closest(el, selector) {
        var matchesFn;

        // find vendor prefix
        ['matches','webkitMatchesSelector','mozMatchesSelector','msMatchesSelector','oMatchesSelector'].some(function(fn) {
            if (typeof document.body[fn] == 'function') {
                matchesFn = fn;
                return true;
            }
            return false;
        })

        var parent;

        // traverse parents
        while (el) {
            parent = el.parentElement;
            if (parent && parent[matchesFn](selector)) {
                return parent;
            }
            el = parent;
        }

        return null;
    }

    var SUPPORTER_COOKIE = "gu_paying_member";

    var CONTRIBUTION_COOKIE = "gu.contributions.contrib-timestamp";

    // Taken from https://www.w3schools.com/js/js_cookies.asp
    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie;
        try {
            decodedCookie = decodeURIComponent(document.cookie);
        }
        catch(err) {
            return null;
        }
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return null;
    }

    function isPayingMember() {
        var cookieValue = getCookie(SUPPORTER_COOKIE)
        return cookieValue && cookieValue !== "false";
    }

    function isContributor() {
        return !!getCookie(CONTRIBUTION_COOKIE)
    }

    function shouldReaderSeeGoldenNugget() {
        return !isPayingMember() && !isContributor()
    }

    if (shouldReaderSeeGoldenNugget()) {

        // find this thrasher
        var thrasher = document.querySelector('.ge2017-supporter-nugget');

        // the thrasher's section tag
        var thrasherContainer = closest(thrasher, 'section');

        // section where the treat should go
        var targetContainer = findTargetContainer(thrasherContainer);

        // get thrasher innerHTML
        var thrasherWrap = document.createElement('div');
        thrasherWrap.appendChild(thrasher.cloneNode(true));
        var thrasherHTML = thrasherWrap.innerHTML;

        // clone thrasher into newTreat
        var newTreat = document.createElement('li');
        newTreat.classList.add('treats__list-item');
        newTreat.innerHTML = thrasherHTML;

        // find target container's treats
        // or make it if it doesnt' exist
        var containerTreats = targetContainer.querySelector('.treats__container');
        if (!containerTreats) {
            var newTreatList = document.createElement('ul');
            newTreatList.classList.add('treats__container');
            targetContainer.querySelector('.fc-container__inner').appendChild(newTreatList);
            containerTreats = targetContainer.querySelector('.treats__container');
        }

        // inject on top if there are treats, at bottom otherwise
        var firstTreat = containerTreats.querySelector('li:first-child');
        if (firstTreat) {
            containerTreats.insertBefore(newTreat, firstTreat);
            firstTreat.classList.add('treat-separator');
        } else {
            containerTreats.appendChild(newTreat);
        }


        window.guardian.ophan.record({
            component: 'thrasher : manifestos compared',
            value: 1
        });
    }
  
}, 20);