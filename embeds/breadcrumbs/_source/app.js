;(function ( global ) {

  var thrasher_app = (function() {

    var elements = document.getElementsByClassName("breadbin");

    elements[0].addEventListener('click',() => {
      window.location.href = "https://www.theguardian.com/australia-news/2018/jul/12/life-on-the-breadline-despite-the-stress-i-tell-myself-the-best-things-in-life-are-free";
    });

  }());

  // CommonJS module
  if ( typeof module !== 'undefined' && module.exports ) {
    module.exports = thrasher_app;
  }

  // AMD module
  else if ( typeof define !== 'undefined' && define.amd ) {
    define( function () { return thrasher_app; });
  }

  // browser global
  else {
    global.thrasher_app = thrasher_app;
  }
}((typeof window !== 'undefined') ? window : this ));
