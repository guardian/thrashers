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

    function animate($, bean, cookies) {
        var COOKIE_NAME = '_thunder';
        var thrasherCookie = cookies.get(COOKIE_NAME);
        if (navigator.cookieEnabled === false || thrasherCookie) {
           //return;
        }

        cookies.add(COOKIE_NAME, 1, 1);

        var wrapperEl = $('.environment-takeover__overlay');
        if (!wrapperEl) { return; }
        wrapperEl.addClass('environment-takeover__active');
        
        var closeBtn = $('.environment-takeover__close');
        bean.on(closeBtn[0], 'click', function() {
            wrapperEl.removeClass('environment-takeover__active');
        });
    }

    setTimeout(function() {
        require(['common/utils/$', 'bean', 'common/utils/cookies'], animate);
    }, 1000);

}());