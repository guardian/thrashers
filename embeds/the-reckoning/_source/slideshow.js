;(function ( global ) {

  var slideshow = (function() {

    document.getElementsByClassName('the-reckoning__wrapper')[0].onclick = function() {
      window.open("https://www.theguardian.com/australia-news/audio/2017/dec/15/the-reckoning-part-2-david-marr-on-the-appalling-truth-revealed-at-the-child-sexual-abuse-commission", '_self');
    };

  }());

  console.log("Init");

  // CommonJS module
  if ( typeof module !== 'undefined' && module.exports ) {
    module.exports = slideshow;
  }

  // AMD module
  else if ( typeof define !== 'undefined' && define.amd ) {
    define( function () { return slideshow; });
  }

  // browser global
  else {
    global.slideshow = slideshow;
  }
}((typeof window !== 'undefined') ? window : this ));
