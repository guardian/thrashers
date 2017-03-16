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

loadJSON("https://interactive.guim.co.uk/docsdata-test/1VJQBTaxNaP-OPAs6jg0Au_2osv1fhgehTqSyL_topAU.json", function(data) {

    var count = data.header.count;
    var countArray = [count - 3, count - 2, count - 1, count].map((num) => {
        return (num < 10) ? "0" + num : num;
    });

    var number = document.getElementsByClassName("int-header__count__number")[0];
    for (var i = 0; i < countArray.length; i++) {
        var h5 = document.createElement("h5");
        h5.innerHTML = countArray[i];
        number.appendChild(h5);
    }

});
