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

loadJSON("https://interactive.guim.co.uk/docsdata-test/1rCOvGZJZzUxIQ3CqQXypMxAAJXoX4ddm_iEv325T1BY.json", function(data) {
    var  source =  data;

    function getItems(){
        var a = [];
        var s;
        for(i=0; i < data.constituencies.length; i++) {
            var name = data.constituencies[i].name;
            var headline = data.constituencies[i].headline;
            var image = data.constituencies[i].image;
            var link = data.constituencies[i].link;
            var party = data.constituencies[i].party;

            html = '<div class="voices-and-votes__story-content '+ party +'" style="background-image:url('+ image +')"><a href="'+ link +'"></a><h1 class="voices-and-votes__headline-container"><span class="voices-and-votes__kicker"> '+ name +' </span><span class="voices-and-votes__headline"> ' + headline + ' </div></h1></div>'
            a.push(html)
            s = a.join('');
        }
        return s;
    }

    function insertHTML(){
        var vv = document.getElementsByClassName('voices-and-votes__container-stories');
        vv[0].innerHTML = getItems();
    }

    function init(){
        insertHTML();
    }

    init();
});
