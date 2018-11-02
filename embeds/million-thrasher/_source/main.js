try {
  // Checks if a contriubtor or not
  const isCont = document.cookie.split(';').map(a => a.trim()).map(a => a.split('=', 2)).filter(a => ['gu_paying_member', 'gu_digital_subscriber', 'gu_recurring_contributor', 'gu.contributions.contrib-timestamp'].includes(a[0])).filter(a => a[1] != 'false').length != 0

  // Checks if in UK
  const isUK = ["GB"].includes(JSON.parse(localStorage.getItem('gu.geolocation')).value);

  const thanks = document.getElementById("million-wrap-thanks");
  const sell = document.getElementById("million-wrap-sell");
  const ukOnly = document.getElementById("uk-only");

  // If a contributor, show appropriate thrahser
  if (isCont == true) {
    thanks.classList.add("show");
    sell.classList.add("hide");
    console.log('Is a contributor');

  } else {
    thanks.classList.add("hide");
    sell.classList.add("show");
    console.log('Is not a contributor');
  }

  // If in UK, if so hide the subscibe button
  if (isUK == false) {
    ukOnly.classList.add("hide");
    console.log('Is outside the UK');
  }

  // Wait for the thrasher to be in view to start animations
  function playThrasher() {
    const thrasher = document.querySelector('.million-thrasher__wrapper');

    window.addEventListener('scroll', function() {
      const thrasherY = thrasher.getBoundingClientRect().y;
            const peekSize = 200;

      const windowHeight = window.innerHeight;
            if ((thrasherY - windowHeight + peekSize) < 0) {
                thrasher.classList.add('playing');
            }
    });
  }
  playThrasher();


} catch (error) {
  console.error(error);
}
