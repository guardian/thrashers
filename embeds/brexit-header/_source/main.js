loadJSON("https://interactive.guim.co.uk/docsdata-test/1uWTZh-ZIeT6Jv2k-8YqbvyooYHYfq_EyofbVgXZUgIU.json", function(data) {
    var  headline =  data.sheets.Sheet1[0].headline;
    var  standfirst = data.sheets.Sheet1[0].standfirst;
    var link = data.sheets.Sheet1[0].link

    var headlineBrexit = document.querySelector('.headline-brexit');
    var standfirstBrexit = document.querySelector('.standfirst-brexit');
    var brexitLink = document.querySelector('.link-brexit');
    console.log(headline);
    console.log(standfirst);
    console.log(link);

    headlineBrexit.innerHTML = headline;
    standfirstBrexit.innerHTML = standfirst;
    link.setAttribute('href', link);
});
