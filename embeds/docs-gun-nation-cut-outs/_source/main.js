setTimeout(function() {

  // load hi res image
  var $cardSources = document.querySelectorAll('#documentaries picture source');
  [].forEach.call($cardSources, function ($source) {
    var media = $source.getAttribute('media').replace('740', '0').replace('980', '0');
    $source.setAttribute('media', media);
  });

}, 100);
// function r(f){/in/.test(document.readyState)?setTimeout('r('+f+')',90):f()}
