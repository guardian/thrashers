
r(function(){

  // set day as data-attr
  var today = new Date().getDate();
  var $thrasher = document.getElementById('rio-2016-header-inner');
  $thrasher.setAttribute('data-day', today);

  // easter egg on click
  $thrasher.addEventListener('click', function() {
    $thrasher.setAttribute('class', $thrasher.className+' easter')
  });


  // only load today's images
  var $versions = $thrasher.querySelectorAll(".version");
  [].forEach.call($versions, function ($version) {
    // if version is visible
    if ($version.offsetParent !== null) {
      var $images = $version.querySelectorAll('img');
      [].forEach.call($images, function ($img) {
        $img.setAttribute('src', $img.getAttribute('data-src'));
      });
    }
  });


});
function r(f){/in/.test(document.readyState)?setTimeout('r('+f+')',9):f()}
NodeList.prototype.forEach = Array.prototype.forEach;
