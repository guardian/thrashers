setInterval(function() {
    updateCountdownTime();
}, 1000);

setTimeout(function() {
    updateCountdownTime();
}, 200);

function updateCountdownTime() {

    // utc time now
    var now = new Date;
    var utcTime = Date.UTC(now.getUTCFullYear(),now.getUTCMonth(), now.getUTCDate() ,
      now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());


    // polls closing time, timezone independent
    var pollsClose = new Date(Date.UTC(2017,5,8,21,0,0));


    if (utcTime > pollsClose.getTime()) {
        document.querySelector('.polls-close-timer-thrasher').classList.add('polls-closed')
    } else {
        // get total seconds between the times
        var delta = Math.abs(pollsClose - utcTime) / 1000;

        // calculate (and subtract) whole days
        var days = Math.floor(delta / 86400);
        delta -= days * 86400;

        // calculate (and subtract) whole hours
        var hours = Math.floor(delta / 3600) % 24;
        delta -= hours * 3600;

        // calculate (and subtract) whole minutes
        var minutes = Math.floor(delta / 60) % 60;
        delta -= minutes * 60;

        // what's left is seconds
        var seconds = Math.floor(delta % 60);

        if (hours>9) {
            var h1 = document.querySelectorAll('.hour-1');
            for (ih1 = 0; ih1 < h1.length; ih1++) {
                h1[ih1].innerHTML = hours.toString().charAt(0);
            }
            var h2 = document.querySelectorAll('.hour-2');
            for (ih2 = 0; ih2 < h2.length; ih2++) {
                h2[ih2].innerHTML = hours.toString().charAt(0);
            }
        } else {
            var h1 = document.querySelectorAll('.hour-1');
            for (ih1 = 0; ih1 < h1.length; ih1++) {
                h1[ih1].innerHTML = 0;
            }
            var h2 = document.querySelectorAll('.hour-2');
            for (ih2 = 0; ih2 < h2.length; ih2++) {
                h2[ih2].innerHTML = hours;
            }
        }

        if (minutes>9) {
            var m1 = document.querySelectorAll('.minute-1');
            for (im1 = 0; im1 < m1.length; im1++) {
                m1[im1].innerHTML = minutes.toString().charAt(0);
            }
            var m2 = document.querySelectorAll('.minute-2');
            for (im2 = 0; im2 < m2.length; im2++) {
                m2[im2].innerHTML = minutes.toString().charAt(1);
            }
        } else {
            var m1 = document.querySelectorAll('.minute-1');
            for (im1 = 0; im1 < m1.length; im1++) {
                m1[im1].innerHTML = 0;
            }
            var m2 = document.querySelectorAll('.minute-2');
            for (im2 = 0; im2 < m2.length; im2++) {
                m2[im2].innerHTML = minutes;
            }
        }

        if (seconds>9) {
            var s1 = document.querySelectorAll('.second-1');
            for (is1 = 0; is1 < s1.length; is1++) {
                s1[is1].innerHTML = seconds.toString().charAt(0);
            }
            var s2 = document.querySelectorAll('.second-2');
            for (is2 = 0; is2 < s2.length; is2++) {
                s2[is2].innerHTML = seconds.toString().charAt(1);
            }
        } else {
            var s1 = document.querySelectorAll('.second-1');
            for (is1 = 0; is1 < s1.length; is1++) {
                s1[is1].innerHTML = 0;
            }
            var s2 = document.querySelectorAll('.second-2');
            for (is2 = 0; is2 < s2.length; is2++) {
                s2[is2].innerHTML = seconds;
            }
        }
    }


}
