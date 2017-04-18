var timeofday;
var breakfastImage = "https://media.guim.co.uk/fa5f16cebc0a18e1d63d50d6c850cbe01d4e546b/0_0_5635_4112/2000.jpg";
var lunchImage = "https://media.guim.co.uk/b1524b5e217e1a158feb7d9e85859ff11dd36f37/0_477_5671_3403/2000.jpg";
var dinnerImage = "https://media.guim.co.uk/51f397f794a73ccd83b0bb79b982b4fff20c32bf/0_277_4666_2800/2000.jpg";
var mainImage;
var styleType;
var dinnerStyle = "object-position: center 28%;";
var lunchStyle = "object-position: center 66%;";
var breakfastStyle = "object-position: center 45%;";

var headline = document.querySelector(".recipes-headline");
var background = document.querySelector(".recipes-background");

var imageContainer = document.querySelector('.recipes');

var date = new Date();
var currentHour = date.getHours();

function initMealTime(){
  if(currentHour >= 0 && currentHour < 11) {
    timeofday = "breakfast";
    mainImage = breakfastImage;
    styleType = breakfastStyle;
    headlineClass = "breakfast";
  }
  if(currentHour >= 11 && currentHour < 16) {
    timeofday = "lunch"
    mainImage = lunchImage;
    styleType = lunchStyle;
    headlineClass = "breakfast";
  }
  if(currentHour >= 16 && currentHour < 23) {
    timeofday = "dinner";
    mainImage = dinnerImage;
    styleType = dinnerStyle;
    headlineClass = "dinner";
  }
  var image = document.createElement('img');
  image.setAttribute('class', 'recipe--image animated fadeIn');
  image.setAttribute('src', mainImage);
  image.setAttribute('style', styleType);
  imageContainer.appendChild(image);
  headline.classList.add(headlineClass);
  headline.classList.add("animated");
  headline.classList.add("fadeIn");
}
initMealTime();
