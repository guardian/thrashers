(function() {

  var isCont;

  var isUK;
  var isAU;

  var thanks;
  var sell;
  var subcribeButtonSell;
  var subcribeButtonThanks;
  var dots;
  var dotsTwo;

  var allSell;
  var allThanks;
  var ausOnlySell;
  var ausOnlyThanks;
  


  function loadThrasherElements() {

      // find the wrapper
      var thrasher = document.querySelector('.million-thrasher__wrapper');

      // Checks if a contriubtor or not
      isCont = document.cookie.split(';').map(a => a.trim()).map(a => a.split('=', 2)).filter(a => ['gu_paying_member', 'gu_digital_subscriber', 'gu_recurring_contributor', 'gu.contributions.contrib-timestamp'].includes(a[0])).filter(a => a[1] != 'false').length != 0
      // isCont = true;

      // Checks if in UK
      isUK = ["GB"].includes(JSON.parse(localStorage.getItem('gu.geolocation')).value);
      isAU = ["AU"].includes(JSON.parse(localStorage.getItem('gu.geolocation')).value);
      // isAU = true;
      // isUK = false;
      

      thanks = document.getElementById("million-wrap-thanks");
      sell = document.getElementById("million-wrap-sell");
      subcribeButtonSell = document.getElementById("uk-only-sell");
      subcribeButtonThanks = document.getElementById("uk-only-thanks");
      dots = document.getElementById("dots-one");
      dotsTwo = document.getElementById("dots-two");

      allSell = document.getElementById("all-sell");
      allThanks = document.getElementById("all-thanks");
      ausOnlySell = document.getElementById("aus-only-sell");
      ausOnlyThanks = document.getElementById("aus-only-thanks");

      // If a contributor, show appropriate thrahser
      if (isCont == true) {
        thanks.classList.add("show");
        console.log('Is a contributor');

      } else {
        sell.classList.add("show");
        console.log('Is not a contributor');
      }

      // If oustside UK hide the subscibe button
      if (isUK == false) {
        subcribeButtonSell.classList.add("hide");
        subcribeButtonThanks.classList.add("hide");
        console.log('Is outside the UK');
      }

      // just for debugging
      else if (isUK == true) {
        console.log('Is in the UK');
        subcribeButtonThanks.classList.add("hide");
      }

      // If in AU hide the subscibe button and show the correct copy
      if (isAU == true) {
        thrasher.classList.add('aus');
        
        // this is needed after all
        // subcribeButtonSell.classList.add("hide");
        subcribeButtonThanks.classList.add("hide");

        // hide the rest of the world copy
        allSell.classList.add("hide");
        allThanks.classList.add("hide");

        // show the aus specific copy
        ausOnlySell.classList.add("show");
        ausOnlyThanks.classList.add("show");

        console.log('Is in AUS');

      } else {
        // hide the world copy
        allSell.classList.add("show");
        allThanks.classList.add("show");

        // show the aus copy
        ausOnlySell.classList.add("hide");
        ausOnlyThanks.classList.add("hide");
      }
      
      // for rest of world, show only one CTA
      if (isAU != true && isUK != true) {
        subcribeButtonSell.classList.add("hide");
        subcribeButtonThanks.classList.add("hide");
        
      }
  }

    // Wait for the thrasher to be in view to start animations
    function playThrasher() {
      var thrasher = document.querySelector('.million-thrasher__wrapper');

      window.addEventListener('scroll', function() {
        var thrasherY = thrasher.getBoundingClientRect().y;
              var peekSize = 200;

        var windowHeight = window.innerHeight;
              if ((thrasherY - windowHeight + peekSize) < 0) {
                  thrasher.classList.add('playing');
                  dots.classList.add('show');
                  dotsTwo.classList.add('show');
              }
      });
    }

    function checkExists(startThrasherFunction) {
      var checkInterval = setInterval(function() {
        if (document.querySelector('#million-wrap-thanks')) {
          startThrasherFunction();
          clearInterval(checkInterval);
        }
      }, 100);
    }

    function trackLoad() {
      window.guardian.ophan.record({
        component: 'Thrasher : Million campaign : Load',
        value: 1
      });
    }

    checkExists(loadThrasherElements);
    checkExists(playThrasher);
    checkExists(trackLoad);

})();
