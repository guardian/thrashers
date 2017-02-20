var thrasher = document.querySelector('.the-intelligence-explosion__wrapper');
var robotTimeout;
window.onscroll = throttle(function() {
    animateRobot();
}, 200);

// also try on load for 3 of seconds
var onLoadAnimation = setInterval(function() {
    animateRobot();
}, 900);
setTimeout(function() {
    clearTimeout(onLoadAnimation);
}, 3000);

function animateRobot() {
    var top = thrasher.getBoundingClientRect().top;
    var windowHeight = window.innerHeight;
    var thrasherHeight = thrasher.offsetHeight;
    var thrasherVideo = thrasher.querySelector('video');
    var thrasherTagline = thrasher.querySelector('.tagline');
    var videoDelay = parseInt(thrasher.querySelector('[data-wants-video-intelligence]').getAttribute('data-video-delay'));

    if (top < (windowHeight-(thrasherHeight/2)) && top > (-1*(thrasherHeight/2))) {
        if (!thrasher.classList.contains('animate')) {
            thrasherTagline.classList.add('animate');
            clearTimeout(robotTimeout);
            robotTimeout = setTimeout(function() {
                if (thrasherVideo != null) {
                    thrasherVideo.play();
                }
            }, videoDelay);
        }
    } else {
        clearTimeout(robotTimeout);
        thrasherTagline.classList.remove('animate');
        if (thrasherVideo != null) {
            thrasherVideo.pause();
            thrasherVideo.currentTime = 0;
        }
    }
}

// https://remysharp.com/2010/07/21/throttling-function-calls
function throttle(fn, threshhold, scope) {
  threshhold || (threshhold = 250);
  var last,
      deferTimer;
  return function () {
    var context = scope || this;

    var now = +new Date,
        args = arguments;
    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}
