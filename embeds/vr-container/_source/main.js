(function(){

  injectVideo();

  function injectVideo() {
    console.log('runs')
    // https://uploads.guim.co.uk/2016/11/08/Underworld_tunnel_loop_abr800.mp4
    var videoTag = document.createElement('div');
    videoTag.setAttribute('class', 'video');
    videoTag.innerHTML = '<video poster="https://uploads.guim.co.uk/2016/11/03/in-play@1x.jpg" loop="true"><source src="https://uploads.guim.co.uk/2016/11/08/Underworld_tunnel_loop_abr800.mp4" type="video/mp4"></video>';

    var underworldCard = document.querySelector('#vr-container .card.major');
    underworldCard.appendChild(videoTag);

    var video = underworldCard.querySelector('video');
    video.load();
    video.play();
  }


})();
