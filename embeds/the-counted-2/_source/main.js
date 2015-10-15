function loadJSON(path, success, error)
{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success)
                    success(JSON.parse(xhr.responseText));
            } else {
                if (error)
                    error(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}

var data = {
    count: 906
}

/*
loadJSON("@@assetPath@@/fake.json", function(data) {
    console.log(data);
*/
    console.log(data['count']);

    document.getElementsByClassName("the-counted__number--one")[0].className += " number--" + String(data.count).charAt(2);
    document.getElementsByClassName("the-counted__number--ten")[0].className += " number--" + String(data.count).charAt(1);
    document.getElementsByClassName("the-counted__number--hundred")[0].className += " number--" + String(data.count).charAt(0);

    document.getElementsByClassName("the-counted-2__wrapper")[0].className += " animate";
// }, function(xhr) {
    console.log("error");
// });
