function getTarget(containers) {
    for (var i = 0; i < containers.length; i++) {
        if(document.getElementById(containers[i]) !== null) {
            return document.getElementById(containers[i]).getElementsByClassName('fc-container__inner')[0];
        }
    }
}

function init() {
    console.log('hey');
    var html = documents.getElementsByClassName('trump-russia__wrapper')[0].innerHTML;
    var target = getTarget(['our-series', 'headlines']);

    target.innerHTML += '<div class=\'trump-russia__treat\'>' + html + '</div>';
}

init();