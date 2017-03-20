var timeofday;
var breakfastImage = "https://media.guim.co.uk/75e54bf492279484181cd152aa0a8c9bf31c5d5d/0_192_8688_5213/2000.jpg";
var lunchImage = "https://media.guim.co.uk/578b312ee44ec86f901b5f40b80a166a04bcce5b/0_87_7360_4416/2000.jpg";
var dinnerImage = "https://media.guim.co.uk/532cf499f348b378f769e01e2665229da6b6c931/0_0_5457_3276/2000.jpg";
var mainImage;
var styleType;

var dinnerStyle = "object-position: center 60%; width: 100%; transform: rotate(180deg);";
var lunchStyle = "object-position: center 67%; width: 100%;";
var breakfastStyle = "object-position: center 67%; width: 100%;";

var imageContainer = document.querySelector('.recipe-header__image');

var date = new Date();
var currentHour = date.getHours();

function initMealTime(){
  if(currentHour >= 0 && currentHour < 11) {
    timeofday = "breakfast";
    mainImage = breakfastImage;
    styleType = breakfastStyle;
  }
  if(currentHour >= 11 && currentHour < 16) {
    timeofday = "lunch"
    mainImage = lunchImage;
    styleType = lunchStyle;
  }
  if(currentHour >= 16 && currentHour < 23) {
    timeofday = "dinner";
    mainImage = dinnerImage;
    styleType = dinnerStyle;
  }
  var image = document.createElement('img');
  image.setAttribute('class', 'header-image animated fadeIn');
  image.setAttribute('src', mainImage);
  image.setAttribute('style', styleType);
  imageContainer.append(image);
}
initMealTime();
