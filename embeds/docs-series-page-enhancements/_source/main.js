(function () {


  hideCards();
  loadCards();


  function hideCards() {
    // if the cards are flashing
    // hiding could be re-implemented in CSS
    // and instead of remving the will-process class later
    // just add a 'processed' card that re-desplays them
    var cards = document.querySelectorAll('section:not(.fc-container--thrasher) .fc-item:not(.done-process)');
    [].forEach.call(cards, function (c) {
      c.classList.add('will-process');
    });
  }

  function loadCards() {

    if (window.location.hostname == 'm.code.dev-theguardian.com') {
      var sheetUrl = 'https://interactive.guim.co.uk/docsdata-test/1jYb4okCk7I42wCoduH-o48DE-EKGajM8w-MTxQYxmck.json';
    } else {
      var sheetUrl = 'https://interactive.guim.co.uk/docsdata/1jYb4okCk7I42wCoduH-o48DE-EKGajM8w-MTxQYxmck.json';
    }

    loadJSON(sheetUrl, function (data) {
      var docs = data.sheets['documentaries'];

      makeDocHeader(docs);

      processCards(docs);

      var obsEl = document.querySelector('.facia-page');
      var obsConfig = { attributes: false, childList: true, subtree: true };

      new MutationObserver(function (mutations, observer) {
        // Need to disconnect
        // before processCards()
        // to avoid infinite loop
        observer.disconnect();
        setTimeout(function () {
          processCards(docs);
          observer.observe(obsEl, obsConfig);
        }, 100);
      }).observe(obsEl, obsConfig);

    });

  }

  function processCards(docs) {
    var cards = document.querySelectorAll('section:not(.fc-container--thrasher) .fc-item:not(.done-process)');

    [].forEach.call(cards, function (c) {
      var linkEl = c.querySelector('a');
      var linkPath = linkEl.href.split(window.location.hostname)[1];
      [].forEach.call(docs, function (d) {
        if (d.fullLink.indexOf(linkPath) > -1) {
          makeDocCard(d, c);
        }
      });
      c.classList.remove('will-process');
      c.classList.add('done-process');
    });

  }

  function makeDocCard(doc, card) {
    var cardHeader = card.querySelector('.fc-item__media-wrapper, .fc-item__header');
    var newImage = document.createElement('img');
    newImage.classList.add('doc-poster');
    newImage.src = doc.posterImage;
    cardHeader.insertBefore(newImage, cardHeader.firstChild)
    card.classList.add('has-poster');

    card.querySelector('.js-headline-text').innerText = doc.logline;
  }

  function makeDocHeader(docs) {
    var doc = false;

    var headerWrapper = document.querySelector('section#latest-release .fc-item');

    var headerLink = headerWrapper.querySelector('a')
      .href.split(window.location.hostname)[1];

    [].forEach.call(docs, function (d) {
      if (d.fullLink.indexOf(headerLink) > -1) {
        doc = d;
      }
    });

    if (doc) {
      headerWrapper.innerHTML = '<div class="doc-header"><div class="still" style="background-image:url(' + doc.headerImage + ')"></div><div class="logo"><svg width="250" height="45" viewBox="0 0 250 45" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path id="a" d="M.032.033h11.453v15.621H.032z"/></defs><g fill="none" fill-rule="evenodd"><path fill="#FFF" d="M1.878.043L0 1.513v41.473l1.878 1.307 50.943-20.9v-2.286z"/><path d="M16.97 8.936C9.664 8.936 3.74 14.86 3.74 22.168c0 7.307 5.924 13.231 13.232 13.231 7.307 0 13.231-5.924 13.231-13.231 0-7.308-5.924-13.232-13.231-13.232" fill="#000"/><path d="M19.24 12.205c1.859.273 3.895 1.448 4.692 2.282v3.834h-.42L19.24 12.63v-.425zM17.823 12.445h-.05c-3.003 0-4.731 4.157-4.643 9.764v.02c-.088 5.608 1.64 9.765 4.643 9.765h.05v.432c-4.516.31-10.625-3.135-10.536-10.197v-.02c-.089-7.062 6.02-10.506 10.536-10.197v.433z" fill="#FFF"/><path d="M25.349 23.09l-1.417.615v6.348c-.797.737-2.745 1.887-4.692 2.282v-8.769l-1.417-.517v-.39h7.526v.43zM67.66 22.86c0-7.905-1.26-9.372-4.082-9.372h-1.206v18.61h1.37c2.795 0 3.918-1.74 3.918-9.237m6.357-.38c0 6.981-4.576 10.106-9.974 10.106h-9.288v-.462l1.836-.38V13.813l-1.836-.353v-.462h9.206c5.645 0 10.056 2.77 10.056 9.481M80.263 25.115c0 5.869.795 7.39 2.33 7.39 1.506 0 2.273-1.548 2.273-7.417 0-5.84-.74-7.253-2.301-7.253-1.507 0-2.302 1.44-2.302 7.28m-5.397-.027c0-4.781 3.068-7.742 7.672-7.742 4.603 0 7.726 2.96 7.726 7.77 0 4.835-3.069 7.878-7.7 7.878-4.575 0-7.698-3.07-7.698-7.906M91.249 25.088c0-4.754 3.069-7.742 7.946-7.742 1.945 0 3.671.163 4.74.489l.082 5.026h-.466l-3.671-4.972c-.11-.027-.192-.027-.302-.027-2.137 0-3.343 2.228-3.343 6.275 0 4.239 1.453 6.385 4.85 6.385 1.26 0 2.192-.217 2.987-.57v.461c-.987 1.331-2.713 2.527-5.508 2.527-4.877 0-7.315-3.206-7.315-7.852M104.754 18.758v-.462l6-.869.658.054V28.73c0 1.657.713 2.119 1.918 2.119.685 0 1.288-.19 1.863-.435V19.41l-1.644-.652v-.462l6-.869.604.054v13.394l1.616.652v.462l-5.918.924-.603-.055v-1.902h-.164c-1.124 1.114-2.63 2.01-4.494 2.01-2.877 0-4.192-1.683-4.192-4.237V19.41l-1.644-.652zM124.097 31.717V19.41l-1.644-.652v-.461l5.946-.87.603.054v1.956h.164c1.288-1.303 2.713-2.091 4.658-2.091 1.726 0 2.795.543 3.37 2.119h.11c1.342-1.359 2.85-2.12 4.795-2.12 2.466 0 3.808 1.25 3.808 3.967v10.405l1.59.408v.462h-7.727v-.462l1.233-.408V21.394c0-1.359-.63-1.902-1.863-1.902-.603 0-1.206.19-1.699.462v11.763l1.233.408v.462h-7.288v-.462l1.26-.408V21.394c0-1.359-.548-1.902-1.836-1.902-.685 0-1.233.217-1.726.489v11.736l1.206.408v.462h-7.754v-.462l1.561-.408zM152.099 24.083l4.247-.19c0-4.673-.63-6.004-1.945-6.004-1.425 0-2.302 1.902-2.302 6.194zm0 .543c.192 3.668 1.37 5.923 5.206 5.923 1.26 0 2.329-.163 3.343-.598v.435c-.85 1.277-2.932 2.608-5.919 2.608-5.069 0-7.672-3.043-7.672-7.906 0-4.754 2.85-7.715 7.453-7.715 4.63 0 6.576 2.445 6.576 6.873v.38h-8.987z" fill="#FFF"/><path d="M162.651 31.69V19.41l-1.644-.652v-.462l5.973-.869.603.054v1.902h.164c1.288-1.304 3.206-2.037 5.097-2.037 2.603 0 3.753 1.222 3.753 3.939V31.69l1.562.435v.462h-7.946v-.462l1.398-.354V21.557c0-1.468-.658-2.12-1.946-2.12-.794 0-1.424.19-2 .49V31.77l1.37.354v.462h-7.946v-.462l1.562-.435zM177.056 18.731v-.489l2.137-.543v-2.663l4.987-.787v3.45h3.315v1.032h-3.315v9.89c0 1.52.466 2.145 2.11 2.145.52 0 1.041-.054 1.37-.136v.462c-.877.924-2.384 1.793-4.165 1.793-2.85 0-4.302-1.304-4.302-4.51v-9.644h-2.137zM196.288 30.522v-5.977l-1.014.081c-1.59.136-2.165 1.142-2.165 3.37 0 2.417.795 3.042 1.918 3.042.63 0 .987-.19 1.26-.516zm0-6.683v-1.984c0-3.015-.658-3.993-2.33-3.993-.19 0-.355.027-.547.054l-3.7 4.972h-.465l.11-4.619c1.425-.434 3.206-.923 5.562-.923 4.055 0 6.411 1.113 6.411 4.482V31.5l1.453.38v.38c-.576.354-1.727.68-2.987.68-2 0-2.96-.652-3.397-1.739h-.138c-.849 1.141-2.055 1.793-3.945 1.793-2.411 0-4.055-1.494-4.055-4.075 0-2.5 1.562-3.858 4.74-4.455l3.288-.625zM209.384 17.427l.493.054v4.239h.137c.768-3.233 2.028-4.456 3.727-4.456.274 0 .575.027.74.109v4.482c-.275-.081-.768-.108-1.233-.108-1.37 0-2.384.136-3.261.489v9.481l2.028.408v.462h-8.604v-.462l1.562-.408V19.41l-1.644-.652v-.461l6.055-.87zM222.23 13.895c0 1.44-1.234 2.527-2.658 2.527-1.48 0-2.63-1.087-2.63-2.527 0-1.44 1.15-2.553 2.63-2.553 1.424 0 2.657 1.113 2.657 2.553zm-.713 3.532l.685.054V31.69l1.534.435v.462h-8.11v-.462l1.562-.435V19.41l-1.672-.652v-.461l6.001-.87zM228.58 24.083l4.247-.19c0-4.673-.63-6.004-1.945-6.004-1.425 0-2.302 1.902-2.302 6.194zm0 .543c.192 3.668 1.37 5.923 5.206 5.923 1.26 0 2.33-.163 3.343-.598v.435c-.85 1.277-2.932 2.608-5.918 2.608-5.07 0-7.672-3.043-7.672-7.906 0-4.754 2.85-7.715 7.452-7.715 4.631 0 6.576 2.445 6.576 6.873v.38h-8.987z" fill="#FFF"/><g transform="translate(238.5 17.285)"><path d="M11.485 10.737c0 3.07-2.165 4.917-6.165 4.917-1.809 0-3.672-.217-5.124-.76l-.164-4.402h.465l3.919 4.537c.273.082.575.136.821.136 1.672 0 2.439-.896 2.439-2.282 0-1.222-.658-1.684-2.384-2.5l-.904-.407C1.648 8.7.058 7.368.058 4.87c0-3.043 2.138-4.836 5.81-4.836 1.507 0 3.15.136 4.411.489l.137 4.102H9.95L6.964.658a3.091 3.091 0 00-.96-.163c-1.479 0-2.137.842-2.137 2.065 0 1.33.63 1.765 2.466 2.608l.986.38c2.822 1.304 4.166 2.472 4.166 5.189" fill="#FFF" mask="url(#b)"/></g></g></svg></div><div class="meta"><div class="meta__title">' + doc.title + '</div><div class="meta__synopsis">' + doc.logline + '</div><a href="' + doc.fullLink + '" class="meta__play">Watch now</a></div></div>';
    }

  }


  // ------ -------- -----
  // Helper funcions below
  // ------ -------- -----

  function loadJSON(path, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
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



})();
