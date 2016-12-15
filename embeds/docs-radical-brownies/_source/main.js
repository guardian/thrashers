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

loadJSON("https://interactive.guim.co.uk/docsdata-test/1tZ4zY1P3k5jOtVR7a-e0DY_C7ND2_0zNvLjiff7-Rgw.json", function(data) {
    var backgroundImage = data.sheets.Sheet1[0].backgroundImage;
    var featuredPoster = data.sheets.Sheet1[0].featuredPoster;
    var featuredCopy = data.sheets.Sheet1[0].featuredCopy;
    var featuredLink = data.sheets.Sheet1[0].featuredLink;
    var secondPoster = data.sheets.Sheet1[0].secondPoster;
    var secondTitle = data.sheets.Sheet1[0].secondTitle;
    var secondCopy = data.sheets.Sheet1[0].secondCopy;
    var secondLink = data.sheets.Sheet1[0].secondLink;
    var thirdPoster = data.sheets.Sheet1[0].thirdPoster;
    var thirdTitle = data.sheets.Sheet1[0].thirdTitle;
    var thirdCopy = data.sheets.Sheet1[0].thirdCopy;
    var thirdLink = data.sheets.Sheet1[0].thirdLink;

    document.getElementsByClassName("background-image")[0].style.backgroundImage = "url('" + backgroundImage + "')";
    document.getElementsByClassName("featured-doc-poster-source")[0].setAttribute("src", featuredPoster);
    document.getElementsByClassName("featured-doc-quote")[0].innerHTML = featuredCopy;
    document.getElementsByClassName("featured-doc-cta")[0].setAttribute("href", featuredLink);
    document.getElementsByClassName("second-doc-poster-source")[0].setAttribute("src", secondPoster);
    document.getElementsByClassName("second-title")[0].innerHTML = secondTitle;
    document.getElementsByClassName("second-doc-quote")[0].innerHTML = secondCopy;
    document.getElementsByClassName("second-doc-cta")[0].setAttribute("href", secondLink);
    document.getElementsByClassName("third-doc-poster-source")[0].setAttribute("src", thirdPoster);
    document.getElementsByClassName("third-title")[0].innerHTML = thirdTitle;
    document.getElementsByClassName("third-doc-quote")[0].innerHTML = thirdCopy;
    document.getElementsByClassName("third-doc-cta")[0].setAttribute("href", thirdLink);
});

function showhide() {
    console.log ('working');
    var expand = document.getElementById("expand");
    var buttonMore = document.getElementById('buttonMore');
    var buttonLess = document.getElementById('buttonLess');

    if (!expand.style.display || expand.style.display == "none") {
        expand.style.display = "block";
        buttonMore.style.visibility = "hidden";
        buttonLess.style.visibility = "visible";

    } else {
        expand.style.display = "none";
        buttonMore.style.visibility = "visible";
        buttonLess.style.visibility = "hidden";
    }
}

  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-79365231-6', 'auto');
  ga('send', 'pageview');
