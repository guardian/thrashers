;(function ( global ) {

  var fundraiser = (function() {

  var count = 0,
  interval,
  goal,
  total,showCount

  function getData() {
      loadJSON("https://support.theguardian.com/ticker.json", function(data) {

          total = parseInt(data.total, 10);
          goal = parseInt(data.goal, 10);

          populateText();

          setTimeout(function() {
              animateCount();
              animateBar();
          }, 500);

      });
  }

  function loadJSON(path, success, error) {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
          if (xhr.readyState === XMLHttpRequest.DONE) {
              if (xhr.status === 200) {
                  if (success)
                      success(JSON.parse(xhr.responseText));
              } else {
                  if (error)
                      error(xhr);
              }
          }
      };
      xhr.open("GET", path, true);
      xhr.send();
  }

  function populateText() {
      document.getElementsByClassName('the-frontline__label--goal')[0].innerHTML = toK(goal) + ' goal';
  }

  function toK(val) {
      return val / 1000 + 'K';
  }

  function animateCount() {
      if (interval === undefined) {
          interval = setInterval(increaseCounter, 30);
      }
  }

  function increaseCounter() {
      count += Math.floor(total / 100);
      document.getElementsByClassName('the-frontline__count')[0].innerHTML = "$" + count.toLocaleString();

      if (count >= total) {
          clearInterval(interval);
          document.getElementsByClassName('the-frontline__count')[0].innerHTML = "$" + total.toLocaleString();
      }
  }

  function animateBar() {
      document.getElementsByClassName('the-frontline__filled-progress')[0].style.transform = 'translateX(' + percentageTotalAsNegative() + '%)';
  }

  function percentageTotalAsNegative() {
      var percentage = total / goal * 100 - 100;

      if (percentage > 0) {
          percentage = 0;
      }

      return percentage;
  }

  getData();



  }());

  // CommonJS module
  if ( typeof module !== 'undefined' && module.exports ) {
    module.exports = fundraiser;
  }

  // AMD module
  else if ( typeof define !== 'undefined' && define.amd ) {
    define( function () { return fundraiser; });
  }

  // browser global
  else {
    global.fundraiser = fundraiser;
  }
}((typeof window !== 'undefined') ? window : this ));
