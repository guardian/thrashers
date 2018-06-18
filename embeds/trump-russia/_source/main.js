function getTarget(containers) {
    for (var i = 0; i < containers.length; i++) {
        if(document.getElementById(containers[i]) !== null) {
            return document.getElementById(containers[i]).getElementsByClassName('fc-container__inner')[0];
        }
    }
}

var target = getTarget(['headlines', 'us-headlines', 'our-series']);
    target.className += " fc-container__inner--no-treats";
    target.innerHTML += '<div class=\'trump-russia__treat\'><h2 class=\'trump-russia__headline\'><span class=\'trump-russia__main\'>Trump and Russia</span><br /><span class=\'trump-russia__sub\'>The key questions answered</span></h2><a class=\'trump-russia__button\' href=\'https://www.theguardian.com/us-news/ng-interactive/2017/dec/08/donald-trump-russia-investigation-key-questions-latest-news-collusion-timeline?cmp=trumprussiathrasher\'>Get answers</a></div>';
