// set day as data-attr
(function() {

  var $thrasher = document.getElementById('rio-2016-header-inner');
  var today = new Date().getDate();
  $thrasher.setAttribute('data-day', today);

  $thrasher.addEventListener('click', function() {
    $thrasher.setAttribute('class', $thrasher.className+' easter')
  });


  // only load today's images
  var $versions = $thrasher.querySelectorAll(".version");
  $versions.forEach(function($version) {
    // if version is visible
    if ($version.offsetParent !== null) {
      var $images = $version.querySelectorAll('img');
      $images.forEach(function($img) {
        $img.setAttribute('src', $img.getAttribute('data-src'));
      });
    }
  });

})();
