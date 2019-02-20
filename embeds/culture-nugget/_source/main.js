console.log('hellloo:');

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


function thrasherMain() {
    // find this thrasher
    var thrasher = document.querySelector('.cultural-nugget');

    // the thrasher's section tag
    var thrasherContainer = closest(thrasher, 'section');

    // section where the treat should go
    var targetContainer = findTargetContainer(thrasherContainer);

    console.log('target:', targetContainer);


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
}

function checkExists(startThrasherFunction) {
  var checkInterval = setInterval(function() {
    if (document.querySelector('.cultural-nugget')) {
      startThrasherFunction();
      clearInterval(checkInterval);
    }
  }, 2000);
}

checkExists(thrasherMain);
