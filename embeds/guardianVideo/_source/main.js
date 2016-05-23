console.log('thithihsihso');
var video = document.getElementsByClassName('video__test')[0];
var headlineOne = document.getElementsByClassName('video__headline--one');
var headlineTwo = document.getElementsByClassName('video__headline--two');
var videoLength = 0;
var CurrentTime = 0;
if(video.readyState === 3){
  console.log('playing');
  video.play();
}

var videoLength = video.duration;
// video.ontimeupdate = function(){
//   console.log('updating')
//   var CurrentTime = video.currentTime;
//   var timer = CurrentTime / videoLength;
//   console.log(timer);
// }

video.addEventListener("timeupdate",function(){
  console.log('updating')
  var CurrentTime = Math.floor(video.currentTime);
  console.log(CurrentTime);
  if(CurrentTime === 13){
    headlineOne.innerHTMl = "for the things that matter"
    console.log(headlineOne);
    console.log('13!!')
  }
});
