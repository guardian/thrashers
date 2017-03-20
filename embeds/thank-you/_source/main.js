var thankYou = document.getElementById('thank-you');
var t = document.querySelector('.thank-you-wrapper');
console.log(t);

function elementInViewport(el) {
  var top = el.offsetTop;
  var left = el.offsetLeft;
  var width = el.offsetWidth;
  var height = el.offsetHeight;

  while(el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return (
    top >= window.pageYOffset &&
    left >= window.pageXOffset &&
    (top + height) <= (window.pageYOffset + window.innerHeight) &&
    (left + width) <= (window.pageXOffset + window.innerWidth)
  );
}

document.addEventListener('scroll', function(){
  if (elementInViewport(thankYou)){
    thankYou.classList.add('visible');
    t.classList.add('inView');
  }else {
    t.classList.remove('inView');
    thankYou.classList.remove('visible');
  }
});
