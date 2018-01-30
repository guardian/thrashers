;(function ( global ) {

  var slideshow = (function() {

    var slides = [];
    var colours = ['#197caa','#d61d00','#4a7801']
    var comps = ['#94b1ca','#fdadba','#ffce4b']
    var messages = []
    var currentSlide = 0

    document.getElementsByClassName('firstdog__wrapper')[0].onclick = function() {
      window.open("https://membership.theguardian.com/au/supporter?INTCMP=gdnwb_aumsp_banner_mem_GLabs_Thomson_Reuters_071217FirstDogXmas_Thrasher_", '_self');
    };

    setTimeout(function() {

          var vector = document.getElementById('animation_station');

          var vector1 = vector.getAttribute('data-svg-1');
          var vector2 = vector.getAttribute('data-svg-2');
          var vector3 = vector.getAttribute('data-svg-3');

          messages.push(vector1)
          messages.push(vector2)
          messages.push(vector3)

          startSlideshow()
          

    },400)

    function m1() {
      console.log("Message 1")
    }

    function m2() {
      console.log("Message 2")
    }

    function m3() {
      console.log("Message 3")
    }

    var startSlideshow = function() {

      setInterval(function() {

          (currentSlide == 2) ? currentSlide = 0 : currentSlide++ ;

          var as = document.querySelector('#animation_station')
          var ep = document.querySelector('#editorial_platform')

          var mClass = document.querySelectorAll('.m'),
              i = 0,
              l = mClass.length;

          for (i; i < l; i++) {
              mClass[i].style.display = 'none';
          }

          
          mClass[currentSlide].style.display = "block";
          as.style.backgroundColor = colours[currentSlide];
          (ep.offsetWidth < 784) ? ep.style.backgroundColor = comps[currentSlide] : '' ;
          ep.style.backgroundImage = "url(" + messages[currentSlide] + ")";


      }, 5000)

    }

  }());

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
