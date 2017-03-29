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

loadJSON("https://interactive.guim.co.uk/docsdata-test/1NcSvccw77rHAncarwfeq7RGZF7yez9mP1Icf3oLMA7g.json", function(data) {
    var comingSoonData = data.sheets['coming-soon'][0];

    var replaceContents = document.querySelectorAll('.docs-coming-soon__wrapper [data-sheet-contents]');
    for (var i = 0; replaceContents.length>i; i++) {
        var el = replaceContents[i];
        var text = comingSoonData[el.getAttribute('data-sheet-contents')];
        el.innerHTML = text;
    }

    var replaceBackground = document.querySelectorAll('.docs-coming-soon__wrapper [data-sheet-background]');
    for (var i = 0; replaceBackground.length>i; i++) {
        var el = replaceBackground[i];
        var image = comingSoonData[el.getAttribute('data-sheet-background')];
        var imageStyle = "background-image:url('" + image + "');";
        el.setAttribute('style', imageStyle);
    }

});
