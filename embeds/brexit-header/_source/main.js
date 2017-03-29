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
loadJSON("https://interactive.guim.co.uk/docsdata-test/1uWTZh-ZIeT6Jv2k-8YqbvyooYHYfq_EyofbVgXZUgIU.json", function(data) {
    var  headline =  data.sheets.Sheet1[0].headline;
    var  standfirst = data.sheets.Sheet1[0].standfirst;
    var link = data.sheets.Sheet1[0].link

    var headlineBrexit = document.querySelector('.headline-brexit');
    var standfirstBrexit = document.querySelector('.standfirst-brexit');
    var brexitLink = document.querySelector('.brexit-link');
    var brexitContainer = document.querySelector('#brexit-header');

    var slice = document.getElementsByClassName('fc-slice-wrapper');
    var id = slice[1].childNodes[1].childNodes[1].childNodes[1].dataset.id;
    var firstItemLink = "https://www.theguardian.com/" + id;

    // console.log(slice[1].childNodes[1].childNodes[1].childNodes[1].dataset.id);

    // var puzzle = document.createElement('div');
    // puzzle.innerHTML = '<img class="brussels-image" src="https://uploads.guim.co.uk/2017/03/28/brussels-optimised.png">';
    // puzzle.setAttribute('class', 'puzzle-piece');
    // brexitContainer.appendChild(puzzle);

    console.log(headline);
    console.log(brexitLink);
    console.log(link);

    // headlineBrexit.innerHTML = headline;
    // standfirstBrexit.innerHTML = standfirst;
    brexitLink.setAttribute('href', firstItemLink);
  });
