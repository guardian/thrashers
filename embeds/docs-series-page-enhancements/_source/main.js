
hideThrasher('docs-series-page-enhancements');
setTimeout(function() {
    hideThrasher('docs-series-page-enhancements');
}, 50);
setTimeout(function() {
    hideThrasher('docs-series-page-enhancements');
}, 1500);

function closest(el, predicate) {
  do if (predicate(el)) return el;
  while (el = el && el.parentNode);
}
function hideThrasher(t) {
    var wrapper = document.querySelector('.'+t+'__wrapper');

    var section = closest(wrapper, function(el) { return el.classList.contains('fc-container'); });
    section.style.display = 'none';

    var nextSection =  section.nextSibling;
    if (nextSection.querySelectorAll('.ad-slot').length>0) {
        nextSection.style.display = 'none'
    };
}
