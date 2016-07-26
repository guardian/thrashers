var colour = ['#204583', '#c1272c', '#faaf3a', '#8bc53e','#204583', '#c1272c', '#faaf3a', '#8bc53e','#204583', '#c1272c', '#faaf3a', '#8bc53e','#204583', '#c1272c', '#faaf3a', '#8bc53e', '#204583', '#c1272c', '#faaf3a', '#8bc53e','#204583', '#c1272c', '#faaf3a', '#8bc53e','#204583', '#c1272c', '#faaf3a', '#8bc53e','#204583', '#c1272c', '#faaf3a', '#8bc53e'];
var block = document.getElementsByClassName('block');
var container = document.getElementsByClassName('aus-campaign');

function randomNumber(){
 return Math.floor((Math.random()*30) +1)
}

// for(i=0; i < block.length; i++){
// 	var number = randomNumber();
// 	block[i].style.backgroundColor = colour[number];
// }

// Create cross browser requestAnimationFrame method:
window.requestAnimationFrame = window.requestAnimationFrame
 || window.mozRequestAnimationFrame
 || window.webkitRequestAnimationFrame
 || window.msRequestAnimationFrame
 || function(f){setTimeout(f, 1000/60)}
 
function parallaxbubbles(){
 var scrolltop = window.pageYOffset // get number of pixels document has scrolled vertically
 var containerOffset =  container[0].getBoundingClientRect().top;
 var parrallax = containerOffset / 10;
 console.log(containerOffset);
 block[0].style.marginTop = parrallax * -2 + 'px' // move bubble1 at 20% of scroll rate
 block[1].style.marginTop = parrallax * -1 + 'px'
 block[2].style.marginTop = parrallax * -1.5 + 'px'
 block[3].style.marginTop = parrallax * -2.5 + 'px'
 block[4].style.marginTop = parrallax * -1 + 'px'
 block[5].style.marginTop = parrallax * -2 + 'px'
 block[6].style.marginTop = parrallax * -1.5 + 'px'
 block[7].style.marginTop = parrallax * -2 + 'px'
 block[8].style.marginTop = parrallax * -2.8 + 'px'
}
 
window.addEventListener('scroll', function(){ // on page scroll
 requestAnimationFrame(parallaxbubbles) // call parallaxbubbles() on next available screen paint
}, false)