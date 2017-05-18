// set up date
var today = new Date();
var regDeadline = {day: 22, month: 5};
var regDeadlineDate = new Date(today.getFullYear(), regDeadline.month-1, regDeadline.day);
var regThrasher = document.querySelector('.register-to-vote-thrasher');
var daysBox = regThrasher.querySelector('.headline__days-box');

// set if last day
if (today.getMonth()>=regDeadline.month-1 && today.getDate()>=regDeadline.day) {
    regThrasher.classList.add('last-day')
}

// set days left box
var one_day=1000*60*60*24;
var daysLeft = Math.max(0,Math.ceil((regDeadlineDate.getTime()-today.getTime())/(one_day)));
daysBox.innerHTML = daysLeft;

// dont pluralise with one day to go
if (daysLeft==1) {
    daysBox.classList.add('last-day');
}


// set up to clone thrasher
var regThrasherWrap = document.createElement('div');
regThrasherWrap.appendChild(regThrasher.cloneNode(true));
var regThrasherHTML = regThrasherWrap.innerHTML;

// clone thrasher into new treat
var newTreat = document.createElement('li');
newTreat.classList.add('treats__list-item');
newTreat.innerHTML = regThrasherHTML;

// get treats ul, or create if if target doesnt have one
var targetContainer = document.querySelector('.facia-page section:first-child');
var containerTreats = targetContainer.querySelector('.treats__container');
if (!containerTreats) {
    var newTreatList = document.createElement('ul');
    newTreatList.classList.add('treats__container');
    targetContainer.querySelector('.fc-container__inner').appendChild(newTreatList);
    containerTreats = targetContainer.querySelector('.treats__container');
}

// inject on top if there are treats, at bottom otherwise
var firstTreat = containerTreats.querySelector('li:first-child');
if (firstTreat) {
    containerTreats.insertBefore(newTreat, firstTreat);
} else {
    containerTreats.appendChild(newTreat);
}


window.guardian.ophan.record({
    component: 'thrasher : register to vote today',
    value: daysLeft
});
