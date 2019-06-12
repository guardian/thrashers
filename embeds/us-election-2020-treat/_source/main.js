function getTarget(containers) {
    for (var i = 0; i < containers.length; i++) {
        if(document.getElementById(containers[i]) !== null) {
            return document.getElementById(containers[i]).getElementsByClassName('fc-container__inner')[0];
        }
    }
}

var treat = document.getElementsByClassName('us-elections-treat')[0];

function checkForElectionsFront() {
    var url = window.location.href;
        url = url.split('/');
        url = url[url.length - 1];

    if (url !== 'us-elections-2020') {
        treat.classList.add('is-front');
    }
}

function setDate() {
    var today = new Date();
    var electionDate = new Date(2020, 10, 3);
    var day = 24 * 60 * 60 * 1000;
    var delta = electionDate.getTime() - today.getTime();
    var daysLeft = Math.floor(delta / day);

    if (Math.sign(daysLeft) === -1) {
        treat.classList.add('is-post-election');
    } else if (daysLeft === 0) {
        treat.classList.add('is-today')
        daysLeft = 'Today';
    } else if (daysLeft === 1) {
        treat.classList.add('is-tomorrow');
        daysLeft = 'Tomorrow';
    }

    var count = document.getElementsByClassName('us-elections-treat__count')[0];
        count.innerHTML = daysLeft;
}

function moveTreatToTarget() {
    var target = getTarget(['in-focus', 'headlines', 'top-stories']);
        target.classList.add('fc-container__inner--no-treats');
        target.innerHTML += document.getElementsByClassName('us-elections-treat')[0].outerHTML;
}

checkForElectionsFront();
setDate();
moveTreatToTarget();

// tuesday november 3, 2020
