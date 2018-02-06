console.log('running pp');

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

loadJSON("https://interactive.guim.co.uk/docsdata-test/1Blud0Uw1AvtrgZJCB573H98jfrjHL-ZpglZK_PFLnNY.json", function(data) {
    var  source =  data;
    console.log(source);

    var headline = source.sheets.Sheet1[0].Headline;
    var image = source.sheets.Sheet1[0].ImageUrl;
    var link = source.sheets.Sheet1[0].link;

    var docHead = document.querySelector('.replace__headline');;
    var docImage = document.querySelector('.replace__image');;
    var docLink = document.querySelector('.replace__link');

    docImage.innerHTML = "<img src='" + image + "'>";
    docHead.innerHTML = "<h1>" + headline + "</h1>";
    docLink.setAttribute('href', link);

    console.log(headline);
    console.log(image);
    console.log(link);

});
