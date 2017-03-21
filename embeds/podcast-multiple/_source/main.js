(function() {
  var animation = document.querySelector('.equalizer--1, equalizer--2, equalizer--3, equalizer--4');

  function onAnimation( evt ) {
    evt.stopPropagation();
  }

  animation.addEventListener('webkitAnimationStart', onAnimation, false);
  animation.addEventListener('webkitAnimationIteration', onAnimation, false);
  animation.addEventListener('animationStart', onAnimation, false);
  animation.addEventListener('animationIteration', onAnimation, false);
}());
