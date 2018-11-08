try {
  // Checks if a contriubtor or not
  const isCont = document.cookie.split(';').map(a => a.trim()).map(a => a.split('=', 2)).filter(a => ['gu_paying_member', 'gu_digital_subscriber', 'gu_recurring_contributor', 'gu.contributions.contrib-timestamp'].includes(a[0])).filter(a => a[1] != 'false').length != 0

  // Checks if in UK
  const isUK = ["GB"].includes(JSON.parse(localStorage.getItem('gu.geolocation')).value);
  const isAU = ["AU"].includes(JSON.parse(localStorage.getItem('gu.geolocation')).value);

  const thanks = document.getElementById("million-wrap-thanks");
  const sell = document.getElementById("million-wrap-sell");
  const subcribeButtonSell = document.getElementById("uk-only-sell");
  const subcribeButtonThanks = document.getElementById("uk-only-thanks");
  const dots = document.getElementById("dots-one");
  const dotsTwo = document.getElementById("dots-two");

  const allSell = document.getElementById("all-sell");
  const allThanks = document.getElementById("all-thanks");
  const ausOnlySell = document.getElementById("aus-only-sell");
  const ausOnlyThanks = document.getElementById("aus-only-thanks");

  // If a contributor, show appropriate thrahser
  if (isCont == true) {
    thanks.classList.add("show");
    console.log('Is a contributor');

  } else {
    sell.classList.add("show");
    console.log('Is not a contributor');
  }

  // If not in UK hide the subscibe button
  if (isUK == false) {
    subcribeButtonSell.classList.add("hide");
    subcribeButtonThanks.classList.add("hide");
    console.log('Is outside the UK');
  }

  // just for debugging
  else if (isUK == true) {
    console.log('Is in the UK');
  }

  // If in AU hide the subscibe button and show the correct copy
  if (isAU == true) {
    subcribeButtonSell.classList.add("hide");
    subcribeButtonThanks.classList.add("hide");

    // hide the rest of the world copy
    allSell.classList.add("hide");
    allThanks.classList.add("hide");

    // show the aus specific copy
    ausOnlySell.classList.add("show");
    ausOnlyThanks.classList.add("show");

    console.log('Is in AUS');

  } else {
    // hide the world copy
    allSell.classList.add("show");
    allThanks.classList.add("show");

    // show the aus copy
    ausOnlySell.classList.add("hide");
    ausOnlyThanks.classList.add("hide");
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
                dots.classList.add('show');
                dotsTwo.classList.add('show');
            }
    });
  }
  playThrasher();

} catch (error) {
  console.error(error);
}
