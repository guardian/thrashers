(function() {
    console.log('hi');

  // Wait for the thrasher to be in view to start animations
    function playThrasher() {
      var thrasher = document.querySelector('.Socialshare__wrapper');

      window.addEventListener('scroll', function() {
        var thrasherY = thrasher.getBoundingClientRect().y;
        var peekSize = 200;

        var windowHeight = window.innerHeight;
              if ((thrasherY - windowHeight + peekSize) < 0) {
                  thrasher.classList.add('playing');
                  console.log ('playing added');
              }
      });
    }

    function checkExists(startThrasherFunction) {
      var checkInterval = setInterval(function() {
        if (document.querySelector('#social-thrasher')) {
          startThrasherFunction();
          clearInterval(checkInterval);
          console.log ('thrasher loaded');
        }
      }, 100);
    }

    checkExists(playThrasher);

})();
