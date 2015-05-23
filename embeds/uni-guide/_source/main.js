var peopleAnimEl = document.getElementsByClassName('ug16__anim--people')[0],
    peopleRef = 0,
    interval = 150;

function peopleAnimation() {
    peopleRef = (peopleRef - 288) % 864;
    peopleAnimEl.style.backgroundPosition = `center ${peopleRef}px`;
}

window.setInterval(peopleAnimation, 150);