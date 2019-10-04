console.log('hellloo:');


var spelling = document.querySelector('.mispel');
var correction = document.querySelector('.correct');


spelling.addEventListener('click', function(){
  correction.classList.add('display');
})

correction.addEventListener('click', function(){
  this.classList.remove('display');
  spelling.innerHTML = "Corrections"
  spelling.classList.add('correction');
})
