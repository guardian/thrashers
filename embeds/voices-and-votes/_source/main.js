var container = document.getElementsByClassName('fc-container');

var hartlepool = '<div class="voices-and-votes__data-container data-hartlepool"><div class="gs-container"><div class="voices-and-votes__data-label mobile-only">Hartlepool in numbers</div><ul><li><span class="lab">Iain Wright</span><span>Labour</span></li><li>90,000 <span>population</span></li><li>3,024 <span>majority</span></li><li>69.9% <span>voted leave</span></li></ul></div></div>'
var cambridge = '<div class="voices-and-votes__data-container data-hartlepool"><div class="gs-container"><div class="voices-and-votes__data-label mobile-only">Cambridge in numbers</div><ul><li><span class="lab">Daniel Zeichner</span><span>Labour</span></li><li>114,740 <span>population</span></li><li>599 <span>majority</span></li><li>73.8% <span>voted remain</span></li></ul></div></div>'
var erdington = '<div class="voices-and-votes__data-container data-hartlepool"><div class="gs-container"><div class="voices-and-votes__data-label mobile-only">Erdington in numbers</div><ul><li><span class="lab">Jack Dromey</span><span>Labour</span></li><li>15,824 <span>population</span></li><li>5,129 <span>majority</span></li><li>63% <span>voted leave</span></li></ul></div></div>'
var wells = '<div class="voices-and-votes__data-container data-hartlepool"><div class="gs-container"><div class="voices-and-votes__data-label mobile-only">Wells in numbers</div><ul><li><span class="con">James Heappey</span><span>Con</span></li><li>104,000 <span>population</span></li><li>7,585 <span>majority</span></li><li>54% <span>voted leave</span></li></ul></div></div>';
var harrow = '<div class="voices-and-votes__data-container data-hartlepool"><div class="gs-container"><div class="voices-and-votes__data-label mobile-only">Harrow West in numbers</div><ul><li><span class="lab">Gareth Thomas</span><span>Labour</span></li><li>70,000 <span>population</span></li><li>2,208 <span>majority</span></li><li>45.4% <span>voted leave</span></li></ul></div></div>';
var glasgow = '<div class="voices-and-votes__data-container data-hartlepool"><div class="gs-container"><div class="voices-and-votes__data-label mobile-only">Glasgow East in numbers</div><ul><li><span class="snp">Natalie McGarry</span><span>SNP</span></li><li>70,378 <span>population</span></li><li>10,387 <span>majority</span></li><li>56% <span>voted remain</span></li></ul></div></div>';

function insertData(id, data){
  var el = document.createElement('div');
  el.setAttribute('class', id + '-data');
  el.innerHTML = data;
  document.getElementById(id).appendChild(el);
}

for(i=0; i<container.length; i++){
  var name = container[i].dataset.component;
  console.log(name)
  if(name != 'undefined') {
    var nameComponent = name.toLowerCase().replace(/-/g, '')
    console.log(nameComponent);
    if(nameComponent === 'hartlepool'){
        insertData(name, hartlepool);
    }
    if(nameComponent === 'erdington'){
        insertData(name, erdington);
    }
    if(nameComponent === 'cambridge'){
        insertData(name, cambridge);
    }
    if(nameComponent === 'wells'){
        insertData(name, wells);
    }
    if(nameComponent === 'harrowwest'){
        insertData(name, harrow);
    }
    if(nameComponent === 'glasgoweast'){
        insertData(name, glasgow);
    }
  }
}
