;(function ( global ) {

  var slideshow = (function() {

    var slides = [];
    var currentSlide = 0

    setTimeout(function() {

          var images = document.getElementById('slideshow_container');

          var slide1 = images.getAttribute('data-image-1');
          var slide2 = images.getAttribute('data-image-2');
          var slide3 = images.getAttribute('data-image-3');

          slides.push(slide1)
          slides.push(slide2)
          slides.push(slide3)
          startSlideshow()
          

    },400)

    var startSlideshow = function() {

      setInterval(function() {

          (currentSlide == 2) ? currentSlide = 0 : currentSlide++ ;

          el = document.querySelector('#slideshow_container')

          el.classList.remove('fade-in');

          el.classList.add('fade-out');

          setTimeout(function() {

            el.classList.add('fade-in');

            el.src = slides[currentSlide] ;

            el.classList.remove('fade-out');
            
          },1000)

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
