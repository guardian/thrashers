(function() {
    // Switch off
    return;

    // Underscore's throttle.
    var throttle = function(func, wait, options) {
        var context, args, result;
        var timeout = null;
        var previous = 0;
        options = options || {};
        var later = function() {
            previous = new Date();
            timeout = null;
            result = func.apply(context, args);
        };

        return function() {
            var now = new Date();
            if (!previous && options.leading === false) { previous = now; }
            var remaining = wait - (now - previous);
            context = this;
            args = arguments;

            if (remaining <= 0) {
                clearTimeout(timeout);
                timeout = null;
                previous = now;
                result = func.apply(context, args);
            } else if (!timeout && options.trailing !== false) {
                timeout = setTimeout(later, remaining);
            }
            return result;
        };
      };

    function animate($, bean, cookies) {
        var COOKIE_NAME = '_thunder2';
        var cookieDays = 30;
        var thrasherCookie = cookies.get(COOKIE_NAME);
        if (navigator.cookieEnabled === false || thrasherCookie) {
          return;
        }

        cookies.add(COOKIE_NAME, 1, cookieDays);

        var wrapperEl = $('.environment-takeover__overlay');
        if (!wrapperEl) { return; }
        wrapperEl.addClass('environment-takeover__active');


        var closeBtn = $('.environment-takeover__close-wrapper');
        bean.on(closeBtn[0], 'click', function() {
            wrapperEl.removeClass('environment-takeover__active');
        });


        var imgWrapper = $('.thunder-images');
        function setScale() {
          var ratio = window.innerWidth/960;
          var scale = (ratio < 1) ? ratio : 1;
          imgWrapper.css('transform', 'scale(' + scale + ')');
        }

        bean.on(window, 'resize', throttle(setScale, 300) );
        setScale();
    }

    setTimeout(function() {
        require(['common/utils/$', 'bean', 'common/utils/cookies'], animate);
    }, 1000);

}());
