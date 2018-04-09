// /* Written by Erik Terwan - MIT license - https://github.com/terwanerik */
// !function(){"use strict";var t=function(t){this.element=t,this.showCallback=null,this.hideCallback=null,this.visibleClass="visible",this.hiddenClass="invisible",this.addWidth=!1,this.addHeight=!1,this.once=!1;var e=0,n=0;this.left=function(t){return function(){return t.element.getBoundingClientRect().left}}(this),this.top=function(t){return function(){return t.element.getBoundingClientRect().top}}(this),this.xOffset=function(t){return function(n){var i=e;return t.addWidth&&!n?i+=t.width():n&&!t.addWidth&&(i-=t.width()),i}}(this),this.yOffset=function(t){return function(e){var i=n;return t.addHeight&&!e?i+=t.height():e&&!t.addHeight&&(i-=t.height()),i}}(this),this.width=function(t){return function(){return t.element.offsetWidth}}(this),this.height=function(t){return function(){return t.element.offsetHeight}}(this),this.addClass=function(t){var e=function(e,n){t.element.classList.contains(e)||(t.element.classList.add(e),"function"==typeof n&&n())},n=function(e,n){e=e.trim();var i=new RegExp("(?:^|\\s)"+e+"(?:(\\s\\w)|$)","ig"),l=t.element.className;i.test(l)||(t.element.className+=" "+e,"function"==typeof n&&n())};return t.element.classList?e:n}(this),this.removeClass=function(t){var e=function(e,n){t.element.classList.contains(e)&&(t.element.classList.remove(e),"function"==typeof n&&n())},n=function(e,n){e=e.trim();var i=new RegExp("(?:^|\\s)"+e+"(?:(\\s\\w)|$)","ig"),l=t.element.className;i.test(l)&&(t.element.className=l.replace(i,"$1").trim(),"function"==typeof n&&n())};return t.element.classList?e:n}(this),this.init=function(t){return function(){var i=t.element.getAttribute("data-scroll");t.showCallback=t.element.getAttribute("data-scroll-showCallback"),t.hideCallback=t.element.getAttribute("data-scroll-hideCallback");var l=i.split("toggle(");if(l.length>1){var s=l[1].split(")")[0].split(",");String.prototype.trim||(String.prototype.trim=function(){return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")}),t.visibleClass=s[0].trim().replace(".",""),t.hiddenClass=s[1].trim().replace(".","")}var o=i.split("offset(");if(o.length>1){var r=o[1].split(")")[0].split(",");e=parseInt(r[0].replace("px","")),n=parseInt(r[1].replace("px",""))}return t.addWidth=i.indexOf("addWidth")>-1,t.addHeight=i.indexOf("addHeight")>-1,t.once=i.indexOf("once")>-1,i.indexOf("centerHorizontal")>-1&&(e=t.element.offsetWidth/2),i.indexOf("centerVertical")>-1&&(n=t.element.offsetHeight/2),t}}(this)},e=function(){function e(){var t=a.scrollElement.innerWidth,c=a.scrollElement.innerHeight,d=a.bindElement.scrollTop?a.bindElement.scrollTop:document.documentElement.scrollTop,u=a.bindElement.scrollLeft?a.bindElement.scrollLeft:document.documentElement.scrollLeft;if(s.left!=u||s.top!=d){for(var f=0;f<i.length;f++){var h=i[f],m=h.left(),p=h.top();s.left>u?m-=h.xOffset(!0):s.left<u&&(m+=h.xOffset(!1)),s.top>d?p-=h.yOffset(!0):s.top<d&&(p+=h.yOffset(!1)),t>m&&m>=0&&c>p&&p>=0?(h.addClass(h.visibleClass,function(){h.showCallback&&n(h,h.showCallback)}),h.removeClass(h.hiddenClass),h.once&&i.splice(f,1)):(h.addClass(h.hiddenClass),h.removeClass(h.visibleClass,function(){h.hideCallback&&n(h,h.hideCallback)}))}for(var g=0;g<l.length;g++){var v=l[g];v.call(a,u,d,t,c)}s.left=u,s.top=d}i.length>0||l.length>0?(r=!0,o(e)):r=!1}function n(t,e){var n=e.split("("),i=n[0];n=n.length>1?n[1].split(")")[0]:void 0,window[i]&&window[i].call(t.element,n)}this.scrollElement=window,this.bindElement=document.body;var i=[],l=[],s={left:-1,top:-1},o=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||window.oRequestAnimationFrame||function(t){setTimeout(t,1e3/60)},r=!0;this.init=function(n){return function(l,s){return void 0!=l&&null!=l?n.bindElement=l:n.bindElement=document.body,void 0!=s&&null!=s?n.scrollElement=s:n.scrollElement=window,i=[].slice.call(n.bindElement.querySelectorAll("[data-scroll]")),i=i.map(function(e){var n=new t(e);return n.init()}),i.length>0?(r=!0,e()):r=!1,n}}(this),this.attach=function(t){return function(n){return l.push(n),r||(r=!0,e()),t}}(this),this.detach=function(t){return function(e){return l.splice(l.indexOf(e),1),t}}(this);var a=this};window.ScrollTrigger=new e}();

setTimeout(function() {
    // var images = ['@@assetPath@@/bg1.jpg', '@@assetPath@@/bg2.jpg', '@@assetPath@@/bg3.jpg'];

    // var randomImage = Math.floor(Math.random() * 3)

    // document.getElementsByClassName("vr-app-launch__wrapper")[0].style.backgroundImage  = 'url('" + images[randomImage] + "')';

    // var imageWrapper = document.getElementsByClassName('vr-app-launch__wrapper');
    // if (imageWrapper.length >= 1) {
    //     var count = splashImage.length;

    //     function getRandomInt(min, max) {
    //         min = Math.ceil(min);
    //         max = Math.floor(max);
    //         return Math.floor(Math.random() * (max - min)) + min;
    //     }

    //     imageWrapper[getRandomInt(0, count)].classList.add('show');
    // }

}, 100);

// function splash() {
//     var imageWrapper = document.getElementsByClassName('imageWrapper');
//     if (imageWrapper.length >= 1) {
//         var count = splashImage.length;

//         function getRandomInt(min, max) {
//             min = Math.ceil(min);
//             max = Math.floor(max);
//             return Math.floor(Math.random() * (max - min)) + min;
//         }

//         imageWrapper[getRandomInt(0, count)].classList.add('show');
//     }
// }