(function() {
    'use strict';

    /*
     * Cookies.js - 1.2.1
     * https://github.com/ScottHamper/Cookies
     *
     * This is free and unencumbered software released into the public domain.
     */
    var factory=function(e){if("object"!=typeof e.document)throw new Error("Cookies.js requires a `window` with a `document` object");var t=function(e,r,n){return 1===arguments.length?t.get(e):t.set(e,r,n)};return t._document=e.document,t._cacheKeyPrefix="cookey.",t._maxExpireDate=new Date("Fri, 31 Dec 9999 23:59:59 UTC"),t.defaults={path:"/",secure:!1},t.get=function(e){return t._cachedDocumentCookie!==t._document.cookie&&t._renewCache(),t._cache[t._cacheKeyPrefix+e]},t.set=function(e,r,n){return n=t._getExtendedOptions(n),n.expires=t._getExpiresDate(void 0===r?-1:n.expires),t._document.cookie=t._generateCookieString(e,r,n),t},t.expire=function(e,r){return t.set(e,void 0,r)},t._getExtendedOptions=function(e){return{path:e&&e.path||t.defaults.path,domain:e&&e.domain||t.defaults.domain,expires:e&&e.expires||t.defaults.expires,secure:e&&void 0!==e.secure?e.secure:t.defaults.secure}},t._isValidDate=function(e){return"[object Date]"===Object.prototype.toString.call(e)&&!isNaN(e.getTime())},t._getExpiresDate=function(e,r){if(r=r||new Date,"number"==typeof e?e=1/0===e?t._maxExpireDate:new Date(r.getTime()+1e3*e):"string"==typeof e&&(e=new Date(e)),e&&!t._isValidDate(e))throw new Error("`expires` parameter cannot be converted to a valid Date instance");return e},t._generateCookieString=function(e,t,r){e=e.replace(/[^#$&+\^`|]/g,encodeURIComponent),e=e.replace(/\(/g,"%28").replace(/\)/g,"%29"),t=(t+"").replace(/[^!#$&-+\--:<-\[\]-~]/g,encodeURIComponent),r=r||{};var n=e+"="+t;return n+=r.path?";path="+r.path:"",n+=r.domain?";domain="+r.domain:"",n+=r.expires?";expires="+r.expires.toUTCString():"",n+=r.secure?";secure":""},t._getCacheFromString=function(e){for(var r={},n=e?e.split("; "):[],o=0;o<n.length;o++){var i=t._getKeyValuePairFromCookieString(n[o]);void 0===r[t._cacheKeyPrefix+i.key]&&(r[t._cacheKeyPrefix+i.key]=i.value)}return r},t._getKeyValuePairFromCookieString=function(e){var t=e.indexOf("=");return t=0>t?e.length:t,{key:decodeURIComponent(e.substr(0,t)),value:decodeURIComponent(e.substr(t+1))}},t._renewCache=function(){t._cache=t._getCacheFromString(t._document.cookie),t._cachedDocumentCookie=t._document.cookie},t._areEnabled=function(){var e="cookies.js",r="1"===t.set(e,1).get(e);return t.expire(e),r},t.enabled=t._areEnabled(),t},Cookies=factory(window);

    /*
     * Thrasher: Environment takeover
     */
    var COOKIE_NAME = 'thrasher-takeover';
    var thrasherCookie = Cookies.get(COOKIE_NAME);

    // Check if user has cookies disabled or has seen the takeover quit early
    if (Cookies.enabled === false || thrasherCookie) {
       // return;
    }
    
    // Set cookie so user only sees takeover once
    Cookies.set(COOKIE_NAME, true, { expires: new Date(2015, 2, 28) });

    // Trigger overlay with CSS class
    var el = document.querySelector('.environment-takeover__wrapper');
    el.setAttribute('class', el.getAttribute('class') + ' environment-takeover__active');

    // Close overlay
    function closeOverlay() {
        el.setAttribute('class', 
            el.getAttribute('class').replace('environment-takeover__active', ''));
    }
    var closeBtn = document.querySelector('.environment-takeover__close');
    closeBtn.addEventListener('click', closeOverlay, false);
}());

