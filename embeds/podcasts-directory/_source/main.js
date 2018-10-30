;(function ( global ) {
  //Move the container outside of the standard list element
  let sliceWrapper = document.querySelector('#current-series .fc-slice-wrapper');
  let directoryWrapper = document.querySelector('#current-series .podcasts-directory__wrapper');
  sliceWrapper.appendChild(directoryWrapper);

  sliceWrapper.removeChild(sliceWrapper.querySelector("ul"))

}((typeof window !== 'undefined') ? window : this ));
