var peopleRef = 0;

function peopleAnimation() {
    peopleRef = (peopleRef - 288) % 864;
    document.getElementsByClassName('ug16__anim--people')[0].style.backgroundPosition = `center ${peopleRef}px`;
}

window.setInterval(peopleAnimation, 150);
