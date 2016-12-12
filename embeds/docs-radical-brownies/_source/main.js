var buttonDown = document.querySelector('.toggle-button');
var buttonUp = document.querySelector('.toggle-button-close');

buttonDown.addEventListener('click', function (event) {
    var expand = document.getElementById('expand');
    var buttonMore = document.getElementById('buttonMore');

    if (expand.style.display == "none") {
        // buttonMore.style.display = "none";
        expand.style.display = "block";

    } else {
        // buttonMore.style.display = "block";
        expand.style.display = "none";
    }
});




