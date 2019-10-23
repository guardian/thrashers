;(function ( global ) {

  var app = {

    init: function() {

      var mp4Supported = (!!document.createElement('video').canPlayType('video/mp4; codecs=avc1.42E01E,mp4a.40.2'));

      var elements = document.getElementsByClassName("deaths-inside-2019__wrapper")[0];

      var elementTop = window.pageYOffset + elements.getBoundingClientRect().top

      var elementTBottom = elementTop - window.innerHeight;

      var video_duration = 2

      var pixels_per_second = window.innerHeight / video_duration

      elements.addEventListener('click',() => {

        window.location.href = "https://www.theguardian.com/australia-news/ng-interactive/2018/aug/28/deaths-inside-indigenous-australian-deaths-in-custody"

      });

      if (mp4Supported && window.requestAnimationFrame) {

        console.log("Set up video... mp4Supported")

        var videoCandidates = document.getElementById("videoplayer")
        var video = document.createElement('video');
        video.src = "https://interactive.guim.co.uk/embed/2018/08/deaths-inside-cards/deaths_inside.mp4";
        video.type = 'video/mp4';
        video.align = 'right';
        video.poster = videoCandidates.getAttribute('data-poster');
        document.getElementById("videoplayer").appendChild(video); 
        video.load();

        var renderLoop = function(){
          requestAnimationFrame( function(){
            if (window.pageYOffset > elementTBottom && window.pageYOffset < elementTop) {
              let position = window.pageYOffset - elementTBottom;
              video.currentTime = (position / pixels_per_second)
            }
            renderLoop();
          });
        };

        renderLoop();

      } 

    }

  }

  var deathsinsider = (function() {

    app.init()

  }());

  // CommonJS module
  if ( typeof module !== 'undefined' && module.exports ) {
    module.exports = deathsinsider;
  }

  // AMD module
  else if ( typeof define !== 'undefined' && define.amd ) {
    define( function () { return deathsinsider; });
  }

  // browser global
  else {
    global.deathsinsider = deathsinsider;
  }
}((typeof window !== 'undefined') ? window : this ));
