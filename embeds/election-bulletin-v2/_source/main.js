///BULLETIN START
function loadJSON(path, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success)
                    success(JSON.parse(xhr.responseText));
            } else {
                if (error) {
                    error(xhr);
                }
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}


loadJSON("https://interactive.guim.co.uk/docsdata-test/1DxXq4oAWOPZBANB2avkhGhl1_RsrbW2xaLBZ-0-fpb4.json", function(data) {
    console.log(data);
    console.log('run');
    var button = document.querySelector('.bulletin--button');
    var c = document.querySelector('.bulletin--counter');
    var cEnd = document.querySelector('.bulletin--counter');
    var feedback = document.querySelector('.reactions');
    var notification = document.querySelector('.notification');
    var endSlide = document.querySelector('.bulletin--onward');
    var story = document.getElementsByClassName('story');
    var clicker;
    var l = story.length - 1;
    var counter = document.querySelector('.bulletin--counter');
    var counterSpan = document.getElementsByClassName('counter');
	var countStart = 7;
    var count = 7;
    var slide = 0;
    var w = 0;
    var indicatorContainer = document.querySelector('.bulletin--slides');
    var Showindicator = document.querySelector('.bulletin--slides__wrapper');
    var ojContainer = document.querySelector('.bulletin-oj');
	var showEnd = false;
    var secondsTimer,
        storyTimer;

    console.log('yes');

    function initStories(){
        var storiesString = '';
        var storiesArray = [];
        for(var j = 0; j < data.sheets.bulletin.length; j++){

            var headlineOne = data.sheets.bulletin[j].slide_1_text;
            var imageOne = data.sheets.bulletin[j].slide_1_image;
            var headlineTwo = data.sheets.bulletin[j].slide_2_text;
            var imageTwo = data.sheets.bulletin[j].slide_2_image;
            var headlineThree = data.sheets.bulletin[j].slide_3_text;
            var imageThree = data.sheets.bulletin[j].slide_3_image;
            var kicker = data.sheets.bulletin[j].story_kicker;
            var item;

            if(imageOne && !imageTwo && !imageThree){
                item = '<li class="story" style="background-image:url(' + imageOne + ')"><div data-link-name="thrasher : bulletin : next" class="clicker"></div><div class="story--copy"><span class="bulletin--kicker">' + kicker + '</span><br /><h1>' + headlineOne + '</h1></div></li>';
            } else if(imageOne && imageTwo && !imageThree) {
                item = '<li class="story" style="background-image:url(' + imageOne + ')"><div data-link-name="thrasher : bulletin : next" class="clicker"></div><div class="story--copy"><span class="bulletin--kicker">' + kicker + '</span><br /><h1>' + headlineOne + '</h1></div></li> <li class="story" style="background-image:url(' + imageTwo + ')"><div data-link-name="thrasher : bulletin : next" class="clicker"></div><div class="story--copy"><span class="bulletin--kicker">' + kicker + '</span><br /><h1>' + headlineTwo + '</h1></div></li>';
            } else if (imageOne && imageTwo && imageThree){
                item = '<li class="story" style="background-image:url(' + imageOne + ')"><div data-link-name="thrasher : bulletin : next" class="clicker"></div><div class="story--copy"><span class="bulletin--kicker">' + kicker + '</span><br /><h1>' + headlineOne + '</h1></div></li> <li class="story" style="background-image:url(' + imageTwo + ')"><div data-link-name="thrasher : bulletin : next" class="clicker"></div><div class="story--copy"><span class="bulletin--kicker">' + kicker + '</span><br /><h1>' + headlineTwo + '</h1></div></li> <li class="story" style="background-image:url(' + imageThree + ')"><div data-link-name="thrasher : bulletin : next" class="clicker"></div><div class="story--copy"><span class="bulletin--kicker">' + kicker + '</span><br /><h1>' + headlineThree + '</h1></div></li>';
            } else {
                item = "";
            }

            storiesArray.push(item);
            storiesString = storiesArray.join('');
        }
        document.querySelector('.bulletin--template').innerHTML = storiesString;
    }

    function initOJ(){
        ojString = '';
        ojArray = [];

        for(var on = 0; on < data.sheets.bulletin.length; on ++){
            var ojLink = data.sheets.bulletin[on].link;
            var ojText = data.sheets.bulletin[on].linkText;
            var ojKicker = data.sheets.bulletin[on].story_kicker;

            if(ojLink){
                ojItem = '<a data-link-name="thrasher : bulletin : oj" class="bulletin-oj-link" href="' + ojLink + '"><span class="bulletin-oj-link__kicker">' + ojKicker + '</span> <span class="bulletin-oj-link__dash">/ </span>' + ojText + '</a>';
            }else {
                ojItem = "";
            }
            ojArray.push(ojItem);
            ojString = ojArray.join('');
        }

        ojContainer.innerHTML = ojString;
    }

    function getStories(){
        var ul = '';
        var ar = [];
        for(var m = 0; m < story.length; m++) {
            var li = '<li class="blankIndicator indicator-' + m +'"></li>'
            ar.push(li);
            ul = ar.join('');
        }
        return ul;
    }

    function getLength(){
        var l = 0;
        for(var k = 0; k < story.length; k++) {
            l ++;
        }
        return l;
    }

    function totalTime(){
        var total = getLength() * countStart;
        var totalTime = 100 / total;
        return totalTime;
    }

    //percentage 100 / totalTime() = 1%

    function clickPercentage(){
        var clickWidth = (100 / getLength()) - (countStart - count);
        console.log(clickWidth);
        w = w + clickWidth;
        indicatorContainer.style.width = w + '%';
    }

    function progress(){
        console.log('progress', totalTime());
        w = w + totalTime();
        indicatorContainer.style.width = w + '%';
    }

    //used for development of the last screen
	if(showEnd === true) {
		endSlide.style.display = "block"; //css("display", "block");
		// story[0].style.display = "none"; //css("display", "none");
		button.style.display = "none"; //css("display", "none");
	}

    function initIndicator(){
        indicatorContainer.innerHTML = getStories();
    }

    function ClearAllIntervals() {
		console.log('cleared');
        for (var i = 1; i < 99999; i++)
            window.clearInterval(i);
    }

    function secondsTimerF(){
      var secondsTimer = setInterval(function(){
        count --;
        counterSpan[0].innerHTML = '<span class="counter">' + count + '</span>';
        progress()
      }, 1000);
    }

    function storyTimerF(){
      var storyTimer = setInterval(function(){
        slide ++;
        count = countStart;
        var a = document.querySelector('li.active');
        var n = document.querySelector('li.active + li.story');
        var oj = document.querySelector('ul.bulletin--onward');
        // console.log(n);
        if(n === null) {
          count = countStart;
          slide = 0;
		  ClearAllIntervals();
          oj.classList.add('active');
          button.style.display = "none"; //css("display", "none");
          story[0].style.display = "none"; //css("display", "none");
          c.classList.add('end');
        }
          a.classList.remove('active');
          n.classList.add('active');
      }, 7000);
    }
    function init(){
      console.log('runnning');
      initStories();
      initOJ();
      clicker = document.getElementsByClassName('clicker');
      button.addEventListener('click', function(){ //.click(function(){
        this.classList.add('active'); //.addClass('active');
        story[0].classList.add('active'); //.addClass('active');
        counter.classList.add('active'); //.addClass('active');
        Showindicator.classList.add('active'); //.addClass('active');
        secondsTimerF();
        storyTimerF();
        for(var b = 0; b < clicker.length; b++){
            clicker[b].addEventListener('click', function(){ //.click(function(){
              slide ++;
              clickPercentage();
              var oj = document.querySelector('ul.bulletin--onward');
              var a = document.querySelector('li.active');
              var n = document.querySelector('li.active + li.story');
              if(n === null){
                count = countStart;
                slide = 0;
    			ClearAllIntervals();
                oj.classList.add('active');
                button.style.display = "none"; //css("display", "none");
                story[0].style.display = "none"; //css("display", "none");
                c.classList.add('end');
              }
              a.classList.remove('active');
              n.classList.add('active');
              ClearAllIntervals();
              count = countStart;
              counterSpan[0].innerHTML = count;
              secondsTimerF();
              storyTimerF();
            });
        }
      })
      console.log(feedback);
      feedback.addEventListener('click', function(){ //.click(function(){
          console.log('feedback clicked');
          feedback.style.display = "none"; //("display", "none");
          notification.style.display = "block"; //.css("display", "block");
      });
      cEnd.addEventListener('click', function(){  //.click(function(){
		count = countStart;
        w = 0;
		secondsTimerF();
        story[0].classList.add('active'); //.addClass('active');
        story[0].style.display = "block"; //.css("display", "block");
        counter.classList.add('active'); //.addClass('active');
		Showindicator.classList.add('active'); //.addClass('active');
        counter.classList.remove('end'); //.removeClass('end');
        endSlide.classList.remove('active'); //.removeClass('active');
        storyTimerF();
      });
    }

    init();

   window.guardian.ophan.record({
   component: 'thrasher : the wrap'
   // value:
});
});
