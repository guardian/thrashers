// set day as data-attr
(function() {

  var $thrasher = document.getElementById('rio-2016-header-inner');
  var today = new Date().getDate();
  $thrasher.setAttribute('data-day', today);


  var $ma_long = document.getElementById('malong');
  $thrasher.addEventListener('click', function() {
    $thrasher.setAttribute('class', $thrasher.className+' easter')
  });

})();
