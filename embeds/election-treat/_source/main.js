function clock() {
  var angle = 360/60;
  var date = new Date();
  var hour = date.getHours();
  if(hour > 12) {
    hour = hour - 12;
  }
  var minute = date.getMinutes();
  var hour = (360/12)*hour + (360/(12*60))*minute;
  minute = angle*minute;

  document.getElementsByClassName("election-treat__hour-hand")[0].setAttribute("style", "-webkit-transform: rotate(" + hour + "deg);  -moz-transform: rotate(" + hour + "deg); -ms-transform: rotate(" + hour + "deg); -o-transform: rotate(" + hour + "deg); transform: rotate(" + hour + "deg);");

  document.getElementsByClassName("election-treat__minute-hand")[0].setAttribute("style", "-webkit-transform: rotate(" + minute + "deg);  -moz-transform: rotate(" + minute + "deg); -ms-transform: rotate(" + minute + "deg); -o-transform: rotate(" + minute + "deg); transform: rotate(" + minute + "deg);");
}

setInterval(function() {
    clock();
}, 5 * 1000);

clock();

