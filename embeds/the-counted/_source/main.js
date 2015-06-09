var parent = document.getElementsByClassName("the-counted__list-holding")[0];
var child = document.getElementsByClassName("the-counted__list-names")[0];

function getOffsetTop( elem ) {
    var offsetTop = 0;
    do {
      if ( !isNaN( elem.offsetTop ) )
      {
          offsetTop += elem.offsetTop;
      }
    } while( elem = elem.offsetParent );
    return offsetTop;
}

function percentageSeen(el) {
    var viewportHeight = window.innerHeight,
        scrollTop = window.pageYOffset,
        elementOffsetTop = getOffsetTop(el),
        elementHeight = el.clientHeight;

    if (elementOffsetTop > (scrollTop + viewportHeight)) {
        return 0;
    } else if (scrollTop > (elementOffsetTop + elementHeight)) {
        return 100;
    } else {
        var distance = (scrollTop + viewportHeight) - elementOffsetTop;
        var percentage = distance / ((viewportHeight + elementHeight) / 100);
        percentage = Math.round(percentage);
        return percentage;
    }
}

window.addEventListener('scroll', function() {
    child.setAttribute('style', 'margin-top: ' + '-' + percentageSeen(parent) * 5 + 'px;');
});