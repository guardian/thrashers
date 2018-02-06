function parrallaxObjects(){
     var container = document.getElementsByClassName('abour--header-left');
     var block = document.getElementsByClassName('laces');
     var scrolltop = window.pageYOffset // get number of pixels document has scrolled vertically
     var containerOffset =  container[0].getBoundingClientRect().top;
     var parrallax = containerOffset / 10;
     block[0].style.bottom = parrallax * -1.5 + 'px' // move bubble1 at 20% of scroll rate
}

window.addEventListener('scroll', function(){ // on page scroll
     if(document.querySelector('.rainbow--header')){
         requestAnimationFrame(parrallaxObjects)
     } // call parallaxbubbles() on next available screen paint
}, false)
