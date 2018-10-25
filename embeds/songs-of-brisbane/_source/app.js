;(function ( global ) {

  var app = {

    pollclose: 1537279199000,

    interval: null,

    pointers: ["Vote now", "Stage door", "Chart toppers", "Number one"],

    loader: function() {

      app.interval = setInterval(function(){ 

        var ts = Math.round((new Date()).getTime());

        if (ts < app.pollclose) {

          app.displayTime(ts)

        } else {

          clearTimeout(app.interval);

          document.querySelector("#timeEnd").innerHTML = "Voting has closed."

        }

      }, 1000);

      
    },

    displayTime: function(time) {

      var millisecondsinSecond = 1000,
      millisecondsinMinute = 60 * millisecondsinSecond,
      millisecondsinHour = 60 * millisecondsinMinute,
      millisecondsInDay = 24 * millisecondsinHour,
      millisecondsinYear = 365 * millisecondsInDay;

      var timeUntil = app.pollclose - time;
      var years = Math.floor(timeUntil/millisecondsinYear),
      days = Math.floor((timeUntil % millisecondsinYear)/millisecondsInDay),
      hours = Math.floor((timeUntil % millisecondsInDay)/millisecondsinHour),
      mins = Math.floor((timeUntil % millisecondsinHour)/millisecondsinMinute),
      secs = Math.floor((timeUntil % 60000)) / 1000;

      document.querySelector("#untilHour").innerHTML = hours
      document.querySelector("#untilMinute").innerHTML = mins
      document.querySelector("#untilSecond").innerHTML = parseInt(secs)


    }
    
  }

  var spotlight = (function() {

    app.loader()

  }());

  // CommonJS module
  if ( typeof module !== 'undefined' && module.exports ) {
    module.exports = spotlight;
  }

  // AMD module
  else if ( typeof define !== 'undefined' && define.amd ) {
    define( function () { return spotlight; });
  }

  // browser global
  else {
    global.spotlight = spotlight;
  }
}((typeof window !== 'undefined') ? window : this ));

