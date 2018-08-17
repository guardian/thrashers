;(function ( global ) {
  let sliceWrapper = document.querySelector('#guardian-podcasts .fc-slice-wrapper');
  let directoryWrapper = document.querySelector('#guardian-podcasts .podcasts-directory__wrapper');
  sliceWrapper.appendChild(directoryWrapper);

  sliceWrapper.removeChild(sliceWrapper.querySelector("ul"))

}((typeof window !== 'undefined') ? window : this ));
