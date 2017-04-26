var containers = document.getElementsByClassName('fc-container');
var containerID;
var listContainer = document.querySelector('.page-container-list');


//returns an array of container ids
function returnId(el, val){
  ar = [];
  for(i = 0; i < el.length; i++) {
      val = el[i].getAttribute("id");
      if(val != null){
        ar.push(val);
      }
  }
  return ar;
}

//uses the array of container ids to make a list of links
function makelist(){
  var l = "";
  for(k=0; k < returnId(containers, containerID).length; k++) {
    var li = '<a href="#' + returnId(containers, containerID)[k] + '"><li>' + returnId(containers, containerID)[k].replace(/-/g, ' ') + '</li>';
    l += li;
  }
  return l;
}

function init(){
  listContainer.innerHTML = makelist();
}

init();
