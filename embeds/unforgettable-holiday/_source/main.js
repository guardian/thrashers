setTimeout(function(){
  var t = document.querySelector('.holiday-thrasher-wrapper');
  document.addEventListener('scroll', function(){
    var p = t.getBoundingClientRect();
    if(p.top <= '300'){
      t.classList.add('inView');
      t.classList.remove('fadeOut');
    }else{
      t.classList.add('fadeOut')
      t.classList.remove('inView');
    }
  });
}, 250);
