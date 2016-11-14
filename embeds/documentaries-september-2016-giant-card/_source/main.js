setTimeout(function() {
  // set day as data-attr
  var today = new Date().getDate();
  var $thrasher = document.getElementById('docs-xl-card');

  var $photoSetAll = $thrasher.querySelectorAll('.photo__set');
  var $todaysPhotoSet = false;
  [].forEach.call($photoSetAll, function ($photoSet) {
    // if version is visible
    if ($photoSet.getAttribute('data-day') == today) {
      $todaysPhotoSet = $photoSet;
    }
  });

  // if no image for today, use the first
  if ($todaysPhotoSet==false) {
    $todaysPhotoSet = $photoSetAll[0];
  }

  var $todaysPhotoAll = $todaysPhotoSet.querySelectorAll('img');
  // now load the image
  [].forEach.call($todaysPhotoAll, function ($todaysPhoto) {
    $todaysPhoto.setAttribute('srcset', $todaysPhoto.getAttribute('data-srcset'));
    $todaysPhoto.setAttribute('src', $todaysPhoto.getAttribute('data-src'));
  });

  // update data-link-name with image details
  var $link = $thrasher.querySelector('.link')
  var n = $link.getAttribute('data-link-name') + ' : ' + $todaysPhotoSet.getAttribute('data-alt');
  $link.setAttribute('data-link-name', n);

}, 100);
// function r(f){/in/.test(document.readyState)?setTimeout('r('+f+')',90):f()}
