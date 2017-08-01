
function findTargetContainer(container) {
    var prev = container.previousElementSibling;
    // console.log('prev for ', container, 'is ', prev);
    var classes = prev.classList;
    if (classes.contains('fc-container--thrasher') || classes.contains('fc-container--video') || classes.contains('fc-container__mpu--mobile') || prev.getAttribute('id')=='manchester-attack') {
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

setTimeout(function() {

    // set up
    var regThrasher = document.querySelector('.polls-close-timer-thrasher');
    var regContainer = closest(regThrasher, 'section');


    // prep to clone thrasher
    var regThrasherWrap = document.createElement('div');
    regThrasherWrap.appendChild(regThrasher.cloneNode(true));
    var regThrasherHTML = regThrasherWrap.innerHTML;

    // clone thrasher into new treat
    var newTreat = document.createElement('li');
    newTreat.classList.add('treats__list-item');
    newTreat.innerHTML = regThrasherHTML;

    // get treats ul, or create if if target doesnt have one
    var targetContainer = findTargetContainer(regContainer);


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
    } else {
        containerTreats.appendChild(newTreat);
    }

}, 300);

//
//
// window.guardian.ophan.record({
//     component: 'thrasher : time left to vote',
//     value: 1
// });
