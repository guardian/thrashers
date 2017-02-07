
document.onmousemove = throttle(function(e){
    var cursorX = e.pageX;
    var cursorY = e.pageY-window.scrollY;
    moveEyes(cursorX, cursorY);
}, 400);



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


function moveEyes(cursorX, cursorY) {
    var windowX = window.innerWidth;
    var windowY = window.innerHeight;

    var ratioX = cursorX/windowX;
    var ratioY = cursorY/windowY;

    var target = document.querySelector('.eyes .target');
    var targetX = target.getBoundingClientRect().left;
    var targetY = target.getBoundingClientRect().top;

    var diffX = cursorX-targetX;
    var diffY = cursorY-targetY;
    if (diffX>0) {
        var fullOffsetX = (windowX-targetX)/2;
    } else {
        var fullOffsetX = targetX/2;
    }
    if (diffY>0) {
        var fullOffsetY = (windowY-targetY)/2;
    } else {
        var fullOffsetY = (targetY)/2;
    }
    var ratioX = diffX/fullOffsetX;
    var ratioY = diffY/fullOffsetY;

    var percentX = Math.min(Math.max(Math.round((0.5 + (ratioX*0.3))*100), 30), 70);
    var percentY = Math.min(Math.max(Math.round((0.5 + (ratioY*0.3))*100), 30), 70);

    var eyeBalls = document.querySelectorAll('.eye .inside');
    for (var i = 0; i < eyeBalls.length; i++) {
        eyeBalls[i].style.left = percentX + '%';
        eyeBalls[i].style.top = percentY + '%';
    }
}
