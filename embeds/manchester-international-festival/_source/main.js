var cutoutTop = document.getElementsByClassName("cutout__top");
var cutoutBottom = document.getElementsByClassName("cutout__bottom");
var circle = document.getElementsByClassName("circle");
var wave = document.getElementsByClassName("manchester-international-festival__wave");
var dots = document.getElementsByClassName("manchester-international-festival__dots");

function mifMove(e) {
    var y = 0 - (e.clientY - (window.innerHeight / 2)),
        x = 0 - (e.clientX - (window.innerWidth / 2));

    for(var i = 0; i < cutoutTop.length; i++) {
        cutoutTop.item(i).setAttribute("style",
            "-webkit-transform: translateY(" + y / 7 + "px) translateX(" + x / 6.5 + "px);" + 
            "-moz-transform: translateY(" + y / 7 + "px) translateX(" + x / 6.5 + "px);" + 
            "-ms-transform: translateY(" + y / 7 + "px) translateX(" + x / 6.5 + "px);" + 
            "-o-transform: translateY(" + y / 7 + "px) translateX(" + x / 6.5 + "px);" + 
            "transform: translateY(" + y / 7 + "px) translateX(" + x / 6.5 + "px);"
        );
    }

    for(var i = 0; i < cutoutTop.length; i++) {
        cutoutBottom.item(i).setAttribute("style",
            "-webkit-transform: translateY(" + y / 8 + "px) translateX(" + x / 7.5 + "px);" + 
            "-moz-transform: translateY(" + y / 8 + "px) translateX(" + x / 7.5 + "px);" + 
            "-ms-transform: translateY(" + y / 8 + "px) translateX(" + x / 7.5 + "px);" + 
            "-o-transform: translateY(" + y / 8 + "px) translateX(" + x / 7.5 + "px);" + 
            "transform: translateY(" + y / 8 + "px) translateX(" + x / 7.5 + "px);"
        );
    }

    for(var i = 0; i < circle.length; i++) {
        circle.item(i).setAttribute("style",
            "-webkit-transform: translateY(" + y / 12 + "px) translateX(" + x / 12 + "px);" + 
            "-moz-transform: translateY(" + y / 12 + "px) translateX(" + x / 12 + "px);" + 
            "-ms-transform: translateY(" + y / 12 + "px) translateX(" + x / 12 + "px);" + 
            "-o-transform: translateY(" + y / 12 + "px) translateX(" + x / 12 + "px);" + 
            "transform: translateY(" + y / 12 + "px) translateX(" + x / 12 + "px);"
        );
    }

    for(var i = 0; i < wave.length; i++) {
        wave.item(i).setAttribute("style",
            "-webkit-transform: translateY(" + y / 20 + "px) translateX(" + x / 20 + "px);" + 
            "-moz-transform: translateY(" + y / 20 + "px) translateX(" + x / 20 + "px);" + 
            "-ms-transform: translateY(" + y / 20 + "px) translateX(" + x / 20 + "px);" + 
            "-o-transform: translateY(" + y / 20 + "px) translateX(" + x / 20 + "px);" + 
            "transform: translateY(" + y / 20 + "px) translateX(" + x / 20 + "px);"
        );
    }

    for(var i = 0; i < dots.length; i++) {
        dots.item(i).setAttribute("style",
            "-webkit-transform: translateY(" + y / 13 + "px) translateX(" + x / 13 + "px);" + 
            "-moz-transform: translateY(" + y / 13 + "px) translateX(" + x / 13 + "px);" + 
            "-ms-transform: translateY(" + y / 13 + "px) translateX(" + x / 13 + "px);" + 
            "-o-transform: translateY(" + y / 13 + "px) translateX(" + x / 13 + "px);" + 
            "transform: translateY(" + y / 13 + "px) translateX(" + x / 13 + "px);" 
        );
    }
}
