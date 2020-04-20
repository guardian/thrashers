(function() {
    console.log('running 1');

    function trackLoad() {
          window.guardian.ophan.record({
              component: 'thrasher : election-countdown-timer : load',
              value: 1
          });
      }


   // update the target to your own selector!
      var target = '.general-election-countdown';

      function checkExists(startThrasherFunction) {
          var checkInterval = setInterval(function() {
                  if (document.querySelector(target)) {
                      startThrasherFunction();
                      clearInterval(checkInterval);
                  }
          }, 100);
      }


      function playThrasher() {



        // function updateCountdownTime() {

          console.log('running 2');

          // utc time now
          var now = new Date;
          var utcTime = Date.UTC(now.getUTCFullYear(),now.getUTCMonth(), now.getUTCDate() ,
            (now.getUTCHours()), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());

          // polls closing time, timezone independent
          var pollsClose = new Date(Date.UTC(2019,11,12,23,59,59));


          if (utcTime > pollsClose.getTime()) {
              // document.querySelector('.countdown').innerHTML = "0";
              document.querySelector('#general-election-countdown, .general-election-countdown__wrapper').style.display = 'none';
          } else {
              // get total seconds between the times
              var delta = Math.abs(pollsClose - utcTime) / 1000;

              // calculate (and subtract) whole days
              var days = Math.floor(delta / 86400);
              delta -= days * 86400;

              console.log('days', days);

              if (days == 0){
                console.log('lastDay')
                var electionHeadline = document.querySelector('.general-election-countdown__headline')
                electionHeadline.innerHTML = "<strong>Polls are open until 10pm</strong> to vote in the UK general election";
                // document.querySelector ('.general-election-countdown__wrapper').classList.add('last-day');

                console.log('electionHeadline', electionHeadline)
              } else {
                console.log('notLastDay')
                document.querySelector('.countdown').innerHTML = days + " ";
              }


          }
        }




    // checkExists(playThrasher);
    checkExists(trackLoad);

  })();
