var FIREFOX = /Firefox/i.test(navigator.userAgent);

if (FIREFOX) {
  var el = document.getElementsByClassName("sixbynine-rotate");
  if (el){
  	el.style.display="none";
  }
}