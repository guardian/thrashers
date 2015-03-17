(function() {

    function isAnimationSupported(elm) {
        var animation = false,
        animationstring = 'animation',
        keyframeprefix = '',
        domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),
        pfx  = '';
        if( elm.style.animationName !== undefined ) { animation = true; }    
        if( animation === false ) {
          for( var i = 0; i < domPrefixes.length; i++ ) {
            if( elm.style[ domPrefixes[i] + 'AnimationName' ] !== undefined ) {
              pfx = domPrefixes[ i ];
              animationstring = pfx + 'Animation';
              keyframeprefix = '-' + pfx.toLowerCase() + '-';
              animation = true;
              break;
            }
          }
        }
        return animation;
    }

    var isIE = false;
    if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0) {
      isIE = true;
    }

    function animate($, bean, cookies) {
        var COOKIE_NAME = '_thunder';
        var cookieDays = 30;
        var thrasherCookie = cookies.get(COOKIE_NAME);
        if (navigator.cookieEnabled === false || thrasherCookie) {
          return;
        }


        cookies.add(COOKIE_NAME, 1, cookieDays);

        var wrapperEl = $('.environment-takeover__overlay');
        if (!wrapperEl) { return; }
        wrapperEl.addClass('environment-takeover__active');

        // IE has keyframe animation bugs, so skip to last frame
        if (!isAnimationSupported(wrapperEl[0]) || isIE) {
          wrapperEl.addClass('environment-takeover__no-animation');
        }
        
        var closeBtn = $('.environment-takeover__close-wrapper');
        bean.on(closeBtn[0], 'click', function() {
            wrapperEl.removeClass('environment-takeover__active');
        });
    }

    setTimeout(function() {
        require(['common/utils/$', 'bean', 'common/utils/cookies'], animate);
    }, 1000);

}());