;(function ( global ) {

  var thrasher_app = (function() {

    console.log("Inside the function like Tron")

    var target = document.querySelector('[data-thrasher-breadline]');

    var elements = document.getElementsByClassName("breadbin");

    if (elements[0].offsetWidth >= 980) {

      target.style.position = 'absolute';

      console.log(elements[0].offsetWidth)

      console.log("See you at the party Richter")

    }

    iframeMessenger.enableAutoResize();

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
